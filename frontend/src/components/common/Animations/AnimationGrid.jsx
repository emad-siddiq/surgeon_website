import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const AnimationGrid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 100);
    camera.position.set(0, 0, 4.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const container = mountRef.current;
    const { width, height } = container.getBoundingClientRect();
    renderer.setSize(width, height);
    
    // Clear existing canvases before appending a new one
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0.0 },
      u_pointsize: { value: 10 }, // Increased point size to compensate for fewer particles
      u_noise_freq_1: { value: 5.0 },
      u_noise_amp_1: { value: 0.5 },
      u_spd_modifier_1: { value: 0.15 },
      u_noise_freq_2: { value: 5.0 },
      u_noise_amp_2: { value: 0.8 },
      u_spd_modifier_2: { value: 0.1 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_opacity: { value: 0.05 }, // Opacity uniform
    };

    const vertexShader = `
      uniform float u_time;
      uniform float u_pointsize;
      uniform float u_noise_amp_1;
      uniform float u_noise_freq_1;
      uniform float u_spd_modifier_1;
      uniform float u_noise_amp_2;
      uniform float u_noise_freq_2;
      uniform float u_spd_modifier_2;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        gl_PointSize = u_pointsize;
        vec3 pos = position;
        pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;
        pos.z += noise(pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_opacity;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        vec3 color = vec3(st.x * 1.5, 0.0, 4.0 - st.x * 0.2);
        gl_FragColor = vec4(color, u_opacity);
      }
    `;

    // Reduce geometry complexity (fewer particles)
    const geometry = new THREE.PlaneGeometry(4, 4, 32, 32); // Reduced segments (32x32 instead of 64x64)
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.u_time.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
    };

    // Throttle resize events
    let resizeTimeout;
    const onResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const { width, height } = container.getBoundingClientRect();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        uniforms.u_resolution.value.set(width, height);
      }, 100);
    };

    window.addEventListener("resize", onResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.clear();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="animation-grid"
      style={{
        position: "absolute",
        width: "100vw",
        height: "700vh",
        zIndex: -2,
        pointerEvents: "none",
        top: "100vh",
        left: '-40px',
      }}
    />
  );
};

export default AnimationGrid;