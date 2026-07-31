import React, { useState, useEffect, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import Lottie from 'lottie-react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import './ProjectImageCarousel.css';

const Lightbox = ({ images, index, onClose, onPrev, onNext }) => {
  const portal = document.body;

  return ReactDOM.createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">×</button>

      {images.length > 1 && (
        <>
          <button className="lightbox-btn lightbox-prev" onClick={onPrev} aria-label="Previous">‹</button>
          <button className="lightbox-btn lightbox-next" onClick={onNext} aria-label="Next">›</button>
        </>
      )}

      <img
        src={images[index]}
        alt={`Project screenshot ${index + 1}`}
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <div className="lightbox-counter">{index + 1} / {images.length}</div>
      )}
    </div>,
    portal
  );
};

const ProjectImageCarousel = ({ images }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const lottieFile = isDarkMode
    ? '/assets/animations/loading-dark.json'
    : '/assets/animations/loading-light.json';
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const lightboxNext = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex(i => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  useEffect(() => {
    setIsLoaded(false);
  }, [current]);

  if (!images || images.length === 0) return null;

  const prev = (e) => {
    e.stopPropagation();
    setCurrent(c => (c - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent(c => (c + 1) % images.length);
  };

  return (
    <>
      <div className={`carousel-container${images.length === 1 ? ' single' : ''}`}>
        {!isLoaded && (
          <div className="carousel-spinner">
            <Lottie path={lottieFile} loop autoplay style={{ width: 64, height: 64 }} />
          </div>
        )}
        <img
          src={images[current]}
          alt={`Project screenshot ${current + 1}`}
          className="carousel-image"
          style={{ opacity: isLoaded ? 1 : 0 }}
          onLoad={() => setIsLoaded(true)}
          onClick={() => openLightbox(current)}
        />
        {images.length > 1 && (
          <>
            <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous image">‹</button>
            <button className="carousel-btn carousel-next" onClick={next} aria-label="Next image">›</button>
            <div className="carousel-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <div className="carousel-counter">{current + 1} / {images.length}</div>
          </>
        )}
        <div className="carousel-expand-hint">🔍</div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      )}
    </>
  );
};

export default ProjectImageCarousel;
