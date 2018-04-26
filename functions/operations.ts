import { Client } from 'elasticsearch';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

import { addPlayers, createClient } from './elasticsearch';
import { db } from './init';
import { IOperation, IPlayer, Operation, OperationStatus, OperationType } from './shared/service/api';

/** Checks and runs long running operations (e.g. full re-index) */
export const operations = functions.firestore
  .document('/operations/{id}')
  .onWrite(async (change, context) => {
    const client = createClient(functions.config().es);

    const opId: string = context!.params.id;
    const opRef = change.after.ref;

    // prevent running when op is deleted
    if (!change.after.exists) {
      console.info(`[operation] ignored. operation doc was deleted`, opId);
      return;
    }

    const op = Operation.fromObject(change.after.data()!);
    console.info(
      `[operation] ${opId}: status`,
      op.status,
      OperationStatus.COMPLETE
    );

    // prevent infinite loop
    if (
      op.status === OperationStatus.RUNNING ||
      op.status === OperationStatus.ERROR ||
      op.status === OperationStatus.COMPLETE
    ) {
      console.info(`[operation] ignoring. already running/failed`, opId);
      return;
    }

    if (op.type !== OperationType.UNKNOWN) {
      console.log(`[operation] ${opId}: running [${op.type}]`);
      await writeOperation(opRef, op, { status: OperationStatus.RUNNING });
    }

    try {
      let status = OperationStatus.COMPLETE;
      switch (op.type) {
        case OperationType.FULL_INDEX:
          status = await doFullIndex(opId, op, client, db);
          break;

        default:
          throw new Error(`Unknown operation type ${op.type} for op ${opId}`);
      }
      await writeOperation(opRef, op, { status });
      console.log('[operation] going back to idle', opId);
    } catch (e) {
      console.error('[operation] error', e);
      return await writeOperation(opRef, op, {
        status: OperationStatus.ERROR,
        errorMessage: e.message
      });
    }
    return;
  });

/** Clone the operation and write json with updated timestamps. */
async function writeOperation(
  opRef: firestore.DocumentReference,
  op: Operation,
  data: Partial<IOperation>
) {
  const json = Operation.fromObject({
    ...(op.toJSON() as IOperation),
    ...data
  }).toJSON();
  // We intentionally lose typing here so we can write Server Timestamps :/
  json.lastUpdated = firestore.FieldValue.serverTimestamp();
  if (!json.started) {
    json.started = firestore.FieldValue.serverTimestamp();
  }
  if (json.status === 'COMPLETE') {
    json.completed = firestore.FieldValue.serverTimestamp();
  }
  if (json.status !== 'ERROR') {
    json.error = firestore.FieldValue.delete();
  }

  console.log(`[operation] setting status: ${json.status}`);
  return await opRef.update(json);
}

const MAX_FIRESTORE_BATCH_WRITES = 500;

export async function doFullIndex(
  opId: string,
  op: Operation,
  client: Client,
  dbRef: firestore.Firestore
): Promise<OperationStatus> {
  const snap = await dbRef
    .collection('players')
    .where('indexState', '<', opId)
    .limit(MAX_FIRESTORE_BATCH_WRITES)
    .get();
  const players: IPlayer[] = snap.docs.map(d => d.data() as IPlayer);

  if (players.length) {
    console.log(`[operation] ${opId}: indexing ${players.length} players`);
    const previewIds = players
      .slice(0, 3)
      .map(p => p.id)
      .join(', ');
    console.log(`[operation] ${opId}:   [${previewIds}, ...]`);
    await addPlayers(client, players);
    console.log(
      `[operation] ${opId}: set ${players.length} doc index watermark`
    );
    await updateDocIndexStatus(players, opId, dbRef);
  } else {
    console.log(`[operation] ${opId}: no players to write, complete!`);
  }

  return players.length < MAX_FIRESTORE_BATCH_WRITES
    ? OperationStatus.COMPLETE
    : OperationStatus.IDLE;
}

export async function updateDocIndexStatus(
  players: IPlayer[],
  opId: string,
  dbRef: firestore.Firestore
) {
  const batch = dbRef.batch();
  players.forEach(player => {
    batch.update(dbRef.doc(`players/${player.id}`), {
      indexState: opId,
      indexError: firestore.FieldValue.delete()
    });
  });
  return await batch.commit();
}
