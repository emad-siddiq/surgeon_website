import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ initialCount, speed = 50 }) => {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const counterRef = React.useRef(null);
  
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
  
      if (counterRef.current) {
        observer.observe(counterRef.current);
      }
  
      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, [isVisible]);
  
    React.useEffect(() => {
      let interval;
      if (isVisible) {
        interval = setInterval(() => {
          setCount(prevCount => {
            const nextCount = prevCount + Math.ceil(initialCount / speed);
            if (nextCount >= initialCount) {
              clearInterval(interval);
              return initialCount;
            }
            return nextCount;
          });
        }, 50);
      }
  
      return () => clearInterval(interval);
    }, [isVisible, initialCount, speed]);
  
    return (
      <span 
        ref={counterRef} 
        className="animated-counter"
      >
        {count}+
      </span>
    );
  };
  
export default AnimatedCounter;