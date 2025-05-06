import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdClose } from "react-icons/md";
import { ThemeContext } from '../context/ThemeContext';

const ProjectImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  
  const autoRotateInterval = 5000; // 5 seconds between slides
  const progressIntervalRef = useRef(null);
  const autoRotateTimeoutRef = useRef(null);
  
  // Reset timer when navigating manually or changing images
  const resetTimer = () => {
    clearInterval(progressIntervalRef.current);
    clearTimeout(autoRotateTimeoutRef.current);
    setProgress(0);
    
    if (!isPaused) {
      startTimer();
    }
  };
  
  const startTimer = () => {
    // Update progress bar every 50ms
    const progressStep = 50 / autoRotateInterval * 100;
    setProgress(0);
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + progressStep;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);
    
    // Set timeout for actual image change
    autoRotateTimeoutRef.current = setTimeout(() => {
      goToNextImage();
    }, autoRotateInterval);
  };
  
  // Initialize auto-rotation
  useEffect(() => {
    // Don't auto-rotate if there's only one image
    if (images.length <= 1) return;
    
    startTimer();
    
    // Cleanup on unmount
    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(autoRotateTimeoutRef.current);
    };
  }, [images.length]);
  
  // Stop autorotate when component is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(progressIntervalRef.current);
        clearTimeout(autoRotateTimeoutRef.current);
      } else if (!isPaused) {
        startTimer();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // When in fullscreen, prevent body scrolling
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer();
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetTimer();
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
    resetTimer();
  };
  
  const handleMouseEnter = () => {
    setIsPaused(true);
    clearInterval(progressIntervalRef.current);
    clearTimeout(autoRotateTimeoutRef.current);
  };
  
  const handleMouseLeave = () => {
    if (!isFullscreen) {
      setIsPaused(false);
      startTimer();
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
    setIsPaused(true);
    clearInterval(progressIntervalRef.current);
    clearTimeout(autoRotateTimeoutRef.current);
  };
  
  // Don't render anything if no images
  if (!images || images.length === 0) return null;
  
  // If only one image, render without controls or timer
  if (images.length === 1) {
    return (
      <div className="project-image-container" onClick={toggleFullscreen}>
        <img
          src={images[0]}
          alt="Project screenshot"
          className="project-image"
        />
        {isFullscreen && (
          <div className="fullscreen-overlay">
            <button 
              className="fullscreen-close-button"
              onClick={toggleFullscreen}
              aria-label="Close fullscreen"
            >
              <MdClose />
            </button>
            <div className="fullscreen-image-container">
              <img
                src={images[0]}
                alt="Project screenshot fullscreen"
                className="fullscreen-image"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div 
      className={`project-carousel ${isFullscreen ? 'fullscreen' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="project-image-container" 
        onClick={isFullscreen ? null : toggleFullscreen}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Project screenshot ${currentImageIndex + 1}`}
          className="project-image"
        />
        
        <button 
          className="carousel-arrow prev-arrow"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevImage();
          }}
          aria-label="Previous image"
        >
          <MdArrowBackIos />
        </button>
        
        <button 
          className="carousel-arrow next-arrow"
          onClick={(e) => {
            e.stopPropagation();
            goToNextImage();
          }}
          aria-label="Next image"
        >
          <MdArrowForwardIos />
        </button>
        
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Progress bar indicator */}
        <div className="carousel-progress-container">
          <div 
            className="carousel-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fullscreen-overlay">
          <button 
            className="fullscreen-close-button"
            onClick={toggleFullscreen}
            aria-label="Close fullscreen"
          >
            <MdClose />
          </button>
          <div className="fullscreen-image-container">
            <img
              src={images[currentImageIndex]}
              alt={`Project screenshot ${currentImageIndex + 1} fullscreen`}
              className="fullscreen-image"
            />
            
            <button 
              className="carousel-arrow fullscreen-prev-arrow"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <MdArrowBackIos />
            </button>
            
            <button 
              className="carousel-arrow fullscreen-next-arrow"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <MdArrowForwardIos />
            </button>
            
            <div className="carousel-dots fullscreen-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;