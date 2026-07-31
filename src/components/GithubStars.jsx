import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const CACHE_TTL = 60 * 60 * 1000; // 1 hour — avoids hammering GitHub's unauthenticated rate limit

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

const GithubStars = ({ repo, label = 'GitHub stars' }) => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    if (!repo) return undefined;

    const cacheKey = `gh-stars:${repo}`;
    const cached = readCache(cacheKey);
    if (cached != null) {
      setStars(cached);
      return undefined;
    }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(data => {
        if (cancelled) return;
        const count = data.stargazers_count ?? 0;
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
  }, [repo]);

  if (stars == null) return null;

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="project-stars"
      title={label}
      aria-label={`${stars} ${label}`}
    >
      <FaStar className="project-stars-icon" />
      {stars.toLocaleString()}
    </a>
  );
};

export default GithubStars;
