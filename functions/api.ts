// tslint:disable:no-console
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as morgan from 'morgan';

import { db } from './init';
import { createClient, search, suggest } from './search';

const app = express();

const CORS_HEADERS_DEV: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['X-Requested-With']
};

app.use(
  // tslint:disable-next-line:no-any
  (morgan as any)('tiny', {
    stream: {
      write: (m: string) => console.log(m)
    }
  })
);
export const api = functions.https.onRequest(app);

// Allow cross-origin requests in dev only
app.use(cors(process.env.NODE_ENV === 'production' ? {} : CORS_HEADERS_DEV));

/** Api root, mounted at /api/... */
const router = express.Router();
app.use('/api', router);

/** Perform a search */
router.get('/search', async (req, res) => {
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[search] searching:', query);
      const client = createClient(functions.config().es);
      const response = await search(client, query);
      console.log('[search] search complete', response);
      const cache = `public, max-age=${2 * HOURS}, s-maxage=${2 * HOURS}`;
      return res.set('Cache-Control', cache).send(response);
    } catch (e) {
      console.warn('[search] search failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[search] search with empty query');
  return res.status(400).send(new Error('Must supply `query` param'));
});

/** Autocomplete suggest based on name or kitName, returns minimal fields. */
router.get('/suggest', async (req, res) => {
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[suggest] suggesting:', query);
      const client = createClient(functions.config().es);
      const response = await suggest(client, query);
      console.log('[suggest] suggest complete', response);
      const cache = `public, max-age=${2 * HOURS}, s-maxage=${2 * HOURS}`;
      return res.set('Cache-Control', cache).send(response);
    } catch (e) {
      console.warn('[suggest] suggest failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[suggest] suggest with empty query');
  return res.status(400).send(new Error('Must supply `query` param'));
});

const HOURS = 3600;

/** Get a single player */
router.get('/players/:id', async (req, res) => {
  const playerId: string = req.params.id;
  if (playerId) {
    try {
      console.log('[getPlayer] fetching:', playerId);
      const client = createClient(functions.config().es);
      const snapshot = await db.doc(`players/${playerId}`).get();
      console.log('[getPlayer] getPlayer complete', snapshot.id);

      if (!snapshot.exists) {
        return res.sendStatus(404);
      }

      const cache = `public, max-age=${2 * HOURS}, s-maxage=${2 * HOURS}`;
      return res.set('Cache-Control', cache).send(snapshot.data());
    } catch (e) {
      console.warn('[getPlayer] getPlayer failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[getPlayer] getPlayer with empty query');
  return res.status(400).send(new Error('Must supply query params'));
});
