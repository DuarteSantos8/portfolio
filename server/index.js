// Portfolio server: serves the built SPA and proxies Spotify so that the
// Client Secret / Refresh Token stay server-side and never reach the browser.
require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST; // undefined → listen on all interfaces (container default)
const DIST_DIR = path.join(__dirname, '..', 'dist');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

const spotifyConfigured = Boolean(
  SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN
);

// ---------------------------------------------------------------------------
// Spotify helpers (token is cached in memory and reused until ~1 min before expiry)
// ---------------------------------------------------------------------------
let tokenCache = { accessToken: null, expiresAt: 0 };

async function getAccessToken() {
  if (tokenCache.accessToken && Date.now() < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(SPOTIFY_REFRESH_TOKEN)}`,
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  if (!data?.access_token) return null;
  const ttl = data.expires_in ? (data.expires_in - 60) * 1000 : 3000 * 1000;
  tokenCache = { accessToken: data.access_token, expiresAt: Date.now() + ttl };
  return tokenCache.accessToken;
}

const spotifyGet = (url, token) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } });

const mapTrack = (item) => ({
  name: item.name,
  artist: item.artists.map((a) => a.name).join(', '),
  albumArt: item.album.images[1]?.url ?? item.album.images[0]?.url ?? null,
  url: item.external_urls.spotify,
});

// Top tracks/artist change slowly — cache the response for 24 h.
let topCache = { data: null, cachedAt: 0 };
const TOP_TTL = 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// Middleware & routes
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.get('/healthz', (req, res) => res.type('text').send('OK'));

app.get('/api/spotify/now-playing', async (req, res) => {
  if (!spotifyConfigured) return res.status(204).end();
  try {
    const token = await getAccessToken();
    if (!token) return res.status(502).json({ nowPlaying: null });

    let np = null;
    const cur = await spotifyGet(
      'https://api.spotify.com/v1/me/player/currently-playing',
      token
    );
    if (cur.status === 200) {
      const data = await cur.json().catch(() => null);
      if (data?.item) np = { ...mapTrack(data.item), isPlaying: data.is_playing };
    }
    if (!np) {
      const recent = await spotifyGet(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        token
      );
      if (recent.status === 200) {
        const data = await recent.json().catch(() => null);
        if (data?.items?.length) np = { ...mapTrack(data.items[0].track), isPlaying: false };
      }
    }
    res.json({ nowPlaying: np });
  } catch {
    res.status(502).json({ nowPlaying: null });
  }
});

app.get('/api/spotify/top', async (req, res) => {
  if (!spotifyConfigured) return res.status(204).end();
  if (topCache.data && Date.now() - topCache.cachedAt < TOP_TTL) {
    return res.json(topCache.data);
  }
  try {
    const token = await getAccessToken();
    if (!token) return res.status(502).json({ topTrack: null, topArtist: null });

    const [tracksRes, artistsRes] = await Promise.all([
      spotifyGet('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50', token),
      spotifyGet('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1', token),
    ]);
    const tracksData = tracksRes.status === 200 ? await tracksRes.json().catch(() => null) : null;
    const artistsData = artistsRes.status === 200 ? await artistsRes.json().catch(() => null) : null;

    let topTrack = null;
    let topArtist = null;
    if (tracksData?.items?.length) topTrack = mapTrack(tracksData.items[0]);
    if (artistsData?.items?.length) {
      const a = artistsData.items[0];
      const artistTopTrack =
        tracksData?.items?.find((tr) => tr.artists.some((ar) => ar.id === a.id))?.name ?? null;
      topArtist = {
        name: a.name,
        image: a.images[1]?.url ?? a.images[0]?.url ?? null,
        url: a.external_urls.spotify,
        topTrack: artistTopTrack,
      };
    }

    const payload = { topTrack, topArtist };
    topCache = { data: payload, cachedAt: Date.now() };
    res.json(payload);
  } catch {
    res.status(502).json({ topTrack: null, topArtist: null });
  }
});

// Unknown API routes → 404 (don't fall through to the SPA shell).
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// Static assets (hashed → cache hard). index.html is served by the SPA fallback
// below so it is never long-cached.
app.use(express.static(DIST_DIR, { maxAge: '1y', index: false }));

// SPA fallback for client-side routing (works on Express 4 and 5).
app.use((req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));

app.listen(PORT, HOST, () => {
  console.log(`Portfolio server listening on ${HOST || '0.0.0.0'}:${PORT}`);
  if (!spotifyConfigured) {
    console.warn('Spotify env vars missing — /api/spotify/* will return 204 and the music section stays hidden.');
  }
});
