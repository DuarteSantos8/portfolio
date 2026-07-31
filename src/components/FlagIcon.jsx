import React from 'react';

const FlagIcon = ({ lang, size = 22 }) => {
  const w = size;
  const h = Math.round(size * 0.67);
  const style = { display: 'block', borderRadius: '2px', overflow: 'hidden' };

  if (lang === 'en') {
    return (
      <svg width={w} height={h} viewBox="0 0 30 20" style={style} xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="20" fill="#012169"/>
        {/* St Andrew's white diagonals */}
        <polygon points="0,0 4,0 30,18 30,20 26,20 0,2" fill="white"/>
        <polygon points="26,0 30,0 30,2 4,20 0,20 0,18" fill="white"/>
        {/* St Patrick's red diagonals (offset) */}
        <polygon points="0,0 2,0 30,19.3 30,20 28,20 0,0.7" fill="#C8102E"/>
        <polygon points="28,0 30,0 30,0.7 2,20 0,20 0,19.3" fill="#C8102E"/>
        {/* St George's white cross */}
        <rect x="0" y="7.5" width="30" height="5" fill="white"/>
        <rect x="11.5" y="0" width="7" height="20" fill="white"/>
        {/* St George's red cross */}
        <rect x="0" y="8.5" width="30" height="3" fill="#C8102E"/>
        <rect x="12.5" y="0" width="5" height="20" fill="#C8102E"/>
      </svg>
    );
  }

  if (lang === 'pt') {
    return (
      <svg width={w} height={h} viewBox="0 0 30 20" style={style} xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="20" fill="#DA291C"/>
        {/* Green left band */}
        <rect width="12" height="20" fill="#006600"/>
        {/* Simplified coat of arms: yellow circle */}
        <circle cx="12" cy="10" r="4.2" fill="none" stroke="#FFCC00" strokeWidth="1.4"/>
        <circle cx="12" cy="10" r="1.6" fill="#FFCC00"/>
      </svg>
    );
  }

  if (lang === 'de') {
    return (
      <svg width={w} height={h} viewBox="0 0 30 21" style={style} xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="7" fill="#1A1A1A"/>
        <rect y="7" width="30" height="7" fill="#DD0000"/>
        <rect y="14" width="30" height="7" fill="#FFCE00"/>
      </svg>
    );
  }

  return null;
};

export default FlagIcon;
