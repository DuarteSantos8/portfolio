import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiHeadphones } from 'react-icons/fi';
import useInView from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import './SpotifyMusicSection.css';

// Data comes from the server-side proxy (/api/spotify/*) so no Spotify
// credentials are ever exposed to the browser.
const SpotifyMusicSection = () => {
  const { t } = useLanguage();
  const [topTrack, setTopTrack] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sectionRef, inView] = useInView(0.1);
  const cancelledRef = useRef(false);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch('/api/spotify/now-playing');
      if (!res.ok) return;
      const data = await res.json();
      if (data?.nowPlaying && !cancelledRef.current) setNowPlaying(data.nowPlaying);
    } catch { /* ignore poll errors */ }
  }, []);

  useEffect(() => {
    cancelledRef.current = false;

    const init = async () => {
      try {
        const res = await fetch('/api/spotify/top');
        if (res.ok && !cancelledRef.current) {
          const data = await res.json();
          if (data?.topTrack) setTopTrack(data.topTrack);
          if (data?.topArtist) setTopArtist(data.topArtist);
        }
        await fetchNowPlaying();
      } catch { /* section stays hidden on failure */ }
      finally {
        if (!cancelledRef.current) setLoading(false);
      }
    };

    init();
    return () => { cancelledRef.current = true; };
  }, [fetchNowPlaying]);

  // Poll now-playing every 30s, but pause while the tab is hidden.
  useEffect(() => {
    let interval = null;
    const start = () => { if (!interval) interval = setInterval(fetchNowPlaying, 30000); };
    const stop = () => { if (interval) { clearInterval(interval); interval = null; } };
    const onVisibility = () => {
      if (document.hidden) { stop(); }
      else { fetchNowPlaying(); start(); }
    };
    if (!document.hidden) start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => { stop(); document.removeEventListener('visibilitychange', onVisibility); };
  }, [fetchNowPlaying]);

  const hasData = !loading && (topTrack || topArtist || nowPlaying);

  return (
    <div ref={sectionRef} className={`music-section${(inView && hasData) || loading ? ' is-visible' : ''}${!hasData && !loading ? ' music-section--hidden' : ''}`}>
      {loading ? (
        <div className="music-layout">
          <div className="music-left">
            <div className="music-title-row">
              <FiHeadphones className="music-headphones-icon" />
              <h3 className="music-heading">{t.music.heading}</h3>
            </div>
            <p className="music-intro">{t.music.intro1}</p>
            <p className="music-intro">{t.music.intro2}</p>
          </div>
          <div className="music-right">
            {[0, 1, 2].map(i => (
              <div key={i} className="music-pill music-pill--skeleton">
                <div className="music-skeleton music-skeleton--img" />
                <div className="music-pill-info">
                  <div className="music-pill-top-row">
                    <div className="music-skeleton music-skeleton--artist" />
                    <div className="music-skeleton music-skeleton--label" />
                  </div>
                  <div className="music-skeleton music-skeleton--name" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : hasData && (
        <div className="music-layout">

          <div className="music-left">
            <div className="music-title-row">
              <FiHeadphones className="music-headphones-icon" />
              <h3 className="music-heading">{t.music.heading}</h3>
            </div>
            <p className="music-intro">{t.music.intro1}</p>
            <p className="music-intro">{t.music.intro2}</p>
          </div>

          <div className="music-right">
            {topTrack && (
              <a href={topTrack.url} target="_blank" rel="noopener noreferrer" className="music-pill">
                {topTrack.albumArt && (
                  <img src={topTrack.albumArt} alt={topTrack.name} className="music-pill-img music-pill-img--round" />
                )}
                <div className="music-pill-info">
                  <div className="music-pill-top-row">
                    <span className="music-pill-artist">{topTrack.artist}</span>
                    <span className="music-pill-label">{t.music.favSong}</span>
                  </div>
                  <span className="music-pill-name">{topTrack.name}</span>
                </div>
              </a>
            )}

            {topArtist && (
              <a href={topArtist.url} target="_blank" rel="noopener noreferrer" className="music-pill">
                {topArtist.image && (
                  <img src={topArtist.image} alt={topArtist.name} className="music-pill-img music-pill-img--round" />
                )}
                <div className="music-pill-info">
                  <div className="music-pill-top-row">
                    <span className="music-pill-artist">{topArtist.name}</span>
                    <span className="music-pill-label">{t.music.favArtist}</span>
                  </div>
                  {topArtist.topTrack && (
                    <span className="music-pill-name">{t.music.mostPlayedSong(topArtist.topTrack)}</span>
                  )}
                </div>
              </a>
            )}

            {nowPlaying && (
              <a href={nowPlaying.url} target="_blank" rel="noopener noreferrer" className="music-pill">
                {nowPlaying.albumArt && (
                  <img src={nowPlaying.albumArt} alt={nowPlaying.name} className="music-pill-img music-pill-img--round" />
                )}
                <div className="music-pill-info">
                  <div className="music-pill-top-row">
                    <span className="music-pill-artist">{nowPlaying.artist}</span>
                    <span className="music-pill-label">
                      {nowPlaying.isPlaying ? t.music.currentlyPlaying : t.music.lastPlayed}
                    </span>
                    {nowPlaying.isPlaying && <span className="music-live-dot" />}
                  </div>
                  <span className="music-pill-name">{nowPlaying.name}</span>
                </div>
              </a>
            )}
          </div>

        </div>
      )}
    </div>
  );
};


export default SpotifyMusicSection;
