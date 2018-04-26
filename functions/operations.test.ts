import * as firebaseFunctionsTest from 'firebase-functions-test';

const mockClient = {
  bulk: jest.fn()
};
const mockDb = {
  collection: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  get: jest.fn()
};

jest.mock('./elasticsearch', () => ({
  createClient: jest.fn(() => mockClient)
}));

jest.mock('./init', () => ({ db: mockDb }));

const { operations } = require('./operations');

const test = firebaseFunctionsTest(); // offline mode

describe('functions/operations', () => {
  const writeDoc = test.wrap(operations);
  let mockRef;

  const ID = '1234';

  const makeOperation = (statusString: string) => {
    return test.firestore.makeDocumentSnapshot(
      { type: 'FULL_INDEX', status: statusString },
      `operations/${ID}`
    );
  };

  const unknownOperation = test.firestore.makeDocumentSnapshot(
    { type: 'LOL' },
    `operations/${ID}`
  );

  const emptyOperation = makeOperation('');
  const runningOperation = makeOperation('RUNNING');
  const completeOperation = makeOperation('COMPLETE');
  const failedOperation = makeOperation('ERROR');

  beforeEach(() => {
    mockRef = { update: jest.fn().mockResolvedValue(null) };
  });

  it('errors on unknown operations', async () => {
    const change = test.makeChange(unknownOperation, unknownOperation);
    change.after._ref = mockRef;

    await writeDoc(change, { params: { id: ID } });

    expect(mockRef.update).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ERROR',
        errorMessage: 'Unknown operation type 0 for op 1234'
      })
    );
  });

  it('does nothing when already running', async () => {
    const change = test.makeChange(emptyOperation, runningOperation);
    change.after._ref = mockRef;

    await writeDoc(change, { params: { id: ID } });

    expect(mockRef.update).not.toHaveBeenCalled();
  });

  it('does nothing when already complete', async () => {
    const change = test.makeChange(emptyOperation, completeOperation);
    change.after._ref = mockRef;

    await writeDoc(change, { params: { id: ID } });

    expect(mockRef.update).not.toHaveBeenCalled();
  });

  it('does nothing when already failed', async () => {
    const change = test.makeChange(emptyOperation, failedOperation);
    change.after._ref = mockRef;

    await writeDoc(change, { params: { id: ID } });

    expect(mockRef.update).not.toHaveBeenCalled();
  });
});
