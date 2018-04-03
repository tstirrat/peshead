// tslint:disable:no-console
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { db } from './init';
import { createClient, search, suggest } from './search';

const app = express();

const CORS_HEADERS_DEV: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['X-Requested-With']
};

// Allow cross-origin requests in dev only
app.use(cors(process.env.NODE_ENV === 'production' ? {} : CORS_HEADERS_DEV));

/** Api root, mounted at /api/... */
export const api = functions.https.onRequest(app);

/** Perform a search */
app.get('/search', async (req, res) => {
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[search] searching:', query);
      const client = createClient(functions.config().es);
      const response = await search(client, query);
      console.log('[search] search complete', response);
      return res.send(response);
    } catch (e) {
      console.warn('[search] search failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[search] search with empty query');
  return res.status(400).send(new Error('Must supply query params'));
});

/** Autocomplete suggest based on name or kitName, returns minimal fields. */
app.get('/suggest', async (req, res) => {
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[suggest] suggesting:', query);
      const client = createClient(functions.config().es);
      const response = await suggest(client, query);
      console.log('[suggest] suggest complete', response);
      return res.send(response);
    } catch (e) {
      console.warn('[suggest] suggest failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[suggest] suggest with empty query');
  return res.status(400).send(new Error('Must supply query params'));
});

const HOURS = 3600;
const STORE_6_HOURS = `public, max-age=${6 * HOURS}, s-maxage=${6 * HOURS}`;

/** Get a single player */
app.get('/players/:id', async (req, res) => {
  const playerId: string = req.params.id;
  if (playerId) {
    try {
      console.log('[getPlayer] fetching:', playerId);
      const client = createClient(functions.config().es);
      const snapshot = await db.doc(`players/${playerId}`).get();
      console.log('[getPlayer] getPlayer complete', snapshot);

      if (!snapshot.exists) {
        return res.sendStatus(404);
      }

      return res.set('Cache-Control', STORE_6_HOURS).send(snapshot.data());
    } catch (e) {
      console.warn('[getPlayer] getPlayer failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[getPlayer] getPlayer with empty query');
  return res.status(400).send(new Error('Must supply query params'));
});
