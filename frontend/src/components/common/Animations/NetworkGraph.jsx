import React, { useRef, useEffect, useState } from 'react';

const NetworkGraph = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);
  const resizeTimeoutRef = useRef(null);
  
  // Add controls with state
  const [settings, setSettings] = useState({
    minDistance: 70,
    maxDistance: 150,
    lineOpacity: 0.2,
    dotOpacity: 0.3,
  });
  
  const NODE_COUNT = 1000;
  const PARTICLE_RADIUS = 2;
  const SPEED = 0.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let isComponentMounted = true;

    function initializeCanvas() {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }

    function createParticles() {
      return Array(NODE_COUNT).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * SPEED,
        dy: (Math.random() - 0.5) * SPEED
      }));
    }

    function handleResize() {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (!isComponentMounted) return;
        
        initializeCanvas();
        particlesRef.current = createParticles();
      }, 250);
    }

    function animate() {
      if (!isComponentMounted) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.dx = -particle.dx;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.dy = -particle.dy;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle with configurable opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${settings.dotOpacity})`;
        ctx.fill();
      });

      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 102, 255, ${settings.lineOpacity})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particleA = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particleB = particlesRef.current[j];
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only draw connections between min and max distance
          if (distance >= settings.minDistance && distance < settings.maxDistance) {
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
          }
        }
      }
      ctx.stroke();

      animationFrameId.current = requestAnimationFrame(animate);
    }

    initializeCanvas();
    particlesRef.current = createParticles();

    const resizeObserver = new ResizeObserver(() => {
      if (isComponentMounted) {
        handleResize();
      }
    });

    resizeObserver.observe(canvas.parentElement);
    animate();

    return () => {
      isComponentMounted = false;
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [settings]); // Add settings to dependencies

  return (
    <div className="line-grid w-full h-full bg-white flex flex-col">
     
        <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default NetworkGraph;