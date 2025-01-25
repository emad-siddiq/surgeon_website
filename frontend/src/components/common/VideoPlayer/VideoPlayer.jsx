import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ videoSrc, className, onVideoEnd, controls = false, loop = false }) => {
  const videoRef = useRef(null);
  const [showControls, setShowControls] = useState(controls);
  const touchTimeoutRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const playVideo = () => {
      videoElement.muted = true;
      videoElement.play().catch(error => {
        console.warn('Autoplay prevented:', error);
      });
    };

    // Attempt autoplay on mount and when source changes
    playVideo();

    // Add event listeners for user interaction
    const handleUserInteraction = () => {
      playVideo();
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [videoSrc]);

  const handleTouchInteraction = useCallback((e) => {
    e.preventDefault();
    
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }

    touchTimeoutRef.current = setTimeout(() => {
      setShowControls(!showControls);
    }, 100);
  }, [showControls]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (loop) {
        videoRef.current.play().catch(console.warn);
      }
    }
  };

  return (
    <div 
      className={`video-player-wrapper ${className}`}
      onClick={handleTouchInteraction}
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden' 
      }}
    >
      <video
        ref={videoRef}
        controls={showControls}
        muted
        playsInline
        webkit-playsinline="true"
        onEnded={handleVideoEnd}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          cursor: 'pointer', 
          outline: 'none' 
        }}
        src={videoSrc}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  className: PropTypes.string,
  onVideoEnd: PropTypes.func,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
};

export default VideoPlayer;