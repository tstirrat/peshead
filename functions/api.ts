// tslint:disable:no-console
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { createClient, search, suggest } from './search';

const app = express();

const CORS_HEADERS_DEV: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['X-Requested-With']
};

// Allow cross-origin requests in dev only
app.use(cors(process.env.NODE_ENV === 'production' ? {} : CORS_HEADERS_DEV));

/** Api root, mounted at /api/v1/... */
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
      console.log('updated with cors');
      return res.send(response);
    } catch (e) {
      console.warn('[suggest] suggest failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[suggest] suggest with empty query');
  return res.status(400).send(new Error('Must supply query params'));
});
