import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

const LineGrid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 200;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const group = new THREE.Group();
    scene.add(group);

    // Particle setup
    const maxParticleCount = 1000;

    const r = 1000;
    const rHalf = r / 2;
    const particlesData = [];
    const particlePositions = new Float32Array(maxParticleCount * 3);
    const particles = new THREE.BufferGeometry();

    // ANIMATION SPEED: Adjust the velocity multiplier to change animation speed
    // Lower values = slower animation, Higher values = faster animation
    const velocityMultiplier = 0.01; // Reduced for slower animation

    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          (-1 + Math.random() * 2) * velocityMultiplier,
          (-1 + Math.random() * 2) * velocityMultiplier,
          (-1 + Math.random() * 2) * velocityMultiplier
        ),
        numConnections: 0,
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const pMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.2,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false,
    });

    const pointCloud = new THREE.Points(particles, pMaterial);
    group.add(pointCloud);

    // LINE SETUP using LineSegments2
    const lineGeometry = new LineGeometry();
    const positions = [];
    const colors = [];

    // LINE COLOR AND WIDTH: Adjust these values to change line appearance
    const lineMaterial = new LineMaterial({
      color: 0x0066ff,         // Bright blue color
      linewidth: 4,            // Adjust this value for thicker/thinner lines
      vertexColors: false,     // Using uniform color instead of vertex colors
      dashed: false,
      alphaToCoverage: true,   // Improves line appearance
      transparent: true,
      opacity: 0.2,
      antialias: true,
    });

    // Important: Set resolution for proper line width scaling
    lineMaterial.resolution.set(container.clientWidth, container.clientHeight);

    const linesMesh = new LineSegments2(lineGeometry, lineMaterial);
    group.add(linesMesh);

    const effectController = {
      showDots: true,
      showLines: true,
      maxDistance: 1000,
      limitConnections: false,
      maxConnections: 5,
      particleCount: 50,
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      let particleCount = effectController.particleCount;

      let numConnected = 0;
      positions.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particlesData[i].numConnections = 0;
      }

      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];

        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf) {
          particleData.velocity.y = -particleData.velocity.y;
        }
        if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) {
          particleData.velocity.x = -particleData.velocity.x;
        }
        if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf) {
          particleData.velocity.z = -particleData.velocity.z;
        }

        if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections) {
          continue;
        }

        for (let j = i + 1; j < particleCount; j++) {
          const particleDataB = particlesData[j];

          if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections) {
            continue;
          }

          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist > effectController.maxDistance) {
            particleData.numConnections++;
            particleDataB.numConnections++;

            positions.push(
              particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2],
              particlePositions[j * 3], particlePositions[j * 3 + 1], particlePositions[j * 3 + 2]
            );

            numConnected++;
          }
        }
      }

      // Update line positions
      lineGeometry.setPositions(positions);
      
      pointCloud.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      lineMaterial.resolution.set(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    animate();

    return () => {
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="line-grid h-full w-full" ref={mountRef} />;
};

export default LineGrid;