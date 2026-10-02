import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const CACHE_TTL = 60 * 60 * 1000; // 1 hour — avoids hammering the unauthenticated rate limits

// Beide APIs sind anonym lesbar und schicken CORS-Header.
const HOSTS = {
  github: {
    api: repo => `https://api.github.com/repos/${repo}`,
    stars: data => data.stargazers_count,
    web: repo => `https://github.com/${repo}`,
  },
  gitlab: {
    api: repo => `https://gitlab.com/api/v4/projects/${encodeURIComponent(repo)}`,
    stars: data => data.star_count,
    web: repo => `https://gitlab.com/${repo}`,
  },
};

const readCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { count, ts } = JSON.parse(raw);
    return Date.now() - ts > CACHE_TTL ? null : count;
  } catch {
    return null;
  }
};

const RepoStars = ({ repo, host = 'github', href, label = 'stars' }) => {
  const [stars, setStars] = useState(null);
  const provider = HOSTS[host];

  useEffect(() => {
    if (!repo || !provider) return undefined;

    const cacheKey = `repo-stars:${host}:${repo}`;
    const cached = readCache(cacheKey);
    if (cached != null) {
      setStars(cached);
      return undefined;
    }

    let cancelled = false;
    fetch(provider.api(repo))
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(data => {
        if (cancelled) return;
        const count = provider.stars(data) ?? 0;
        setStars(count);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ count, ts: Date.now() }));
        } catch {
          /* private mode / quota — non-fatal, we simply won't cache */
        }
      })
      .catch(() => {
        /* rate-limited or offline — leave stars null so the badge stays hidden */
      });

    return () => { cancelled = true; };
  }, [repo, host, provider]);

  if (stars == null) return null;

  const count = stars.toLocaleString();

  return (
    <a
      href={href || provider.web(repo)}
      target="_blank"
      rel="noopener noreferrer"
      className="project-stars"
      title={`${count} ${label}`}
      aria-label={`${count} ${label}`}
    >
      <FaStar className="project-stars-icon" />
      {count}
    </a>
  );
};

export default RepoStars;
