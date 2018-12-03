import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as morgan from 'morgan';

import { createClient, search, suggest } from './elasticsearch';
import { fetchLiveUpdate, Platform } from './konami';
import { players } from './test/offline';

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
  const { query, sortDirection, sortField } = req.query;
  try {
    console.log(
      `[search] searching: '${query}'`,
      `sort: ${sortField || 'ovr'} ${sortDirection || 'desc'}`
    );
    const client = createClient(functions.config().es);
    const response = await search(client, query, {
      sortField,
      sortDirection
    });
    console.log(
      '[search] search complete: ',
      `${response.hits.hits.length}/${response.hits.total} total`
    );
    const cache = `public, max-age=${2 * HOURS}, s-maxage=${2 * HOURS}`;
    return res.set('Cache-Control', cache).send(response);
  } catch (e) {
    console.warn('[search] search failed with', e);
    return res.status(400).send(e);
  }
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
      // const snapshot = await db.doc(`players/${playerId}`).get();
      const snapshot = await Promise.resolve(players[playerId]);

      if (!snapshot) {
        return res.sendStatus(404);
      }
      console.log('[getPlayer] getPlayer complete', snapshot.id);

      const cache = `public, max-age=${2 * HOURS}, s-maxage=${2 * HOURS}`;
      return res.set('Cache-Control', cache).send(snapshot);
    } catch (e) {
      console.warn('[getPlayer] getPlayer failed with', e);
      return res.status(400).send(e);
    }
  }
  console.warn('[getPlayer] getPlayer with empty query');
  return res.status(400).send(new Error('Must supply query params'));
});

/** Fetch latest live update .cpk file and store in cloud storage. */
router.get('/import/liveupdate/:platform', async (req, res) => {
  const platform: string = req.params.platform;
  try {
    if (platform !== Platform.PC) {
      throw new Error('Invalid platform');
    }

    console.log('[liveupdate] fetching:', platform);

    const files = await fetchLiveUpdate(platform);
    return res.send({ files });
  } catch (e) {
    console.warn('[liveupdate] failed with', e);
    return res.status(400).send(e.message);
  }
});
