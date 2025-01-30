import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const AnimationGrid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(0, 0, 4.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    mountRef.current.appendChild(renderer.domElement);


   

        const uniforms = {
            u_time: { value: 0.0 },
            u_pointsize: { value: 2.5 }, // Larger points to make the grid more visible
            u_noise_freq_1: { value: 2.0 }, // Increase frequency for more detailed waves
            u_noise_amp_1: { value: 0.5 }, // Increase amplitude for larger waves
            u_spd_modifier_1: { value: 0.15 },
            u_noise_freq_2: { value: 5.0 }, // Increase frequency for the second noise
            u_noise_amp_2: { value: 0.8 }, // Increase amplitude for more noticeable waves
            u_spd_modifier_2: { value: 0.2 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        // Shaders
        const vertexShader = `
            #define PI 3.14159265359

            uniform float u_time;
            uniform float u_pointsize;
            uniform float u_noise_amp_1;
            uniform float u_noise_freq_1;
            uniform float u_spd_modifier_1;
            uniform float u_noise_amp_2;
            uniform float u_noise_freq_2;
            uniform float u_spd_modifier_2;

            float random (in vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            float noise (in vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));
                vec2 u = f*f*(3.0-2.0*f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            mat2 rotate2d(float angle){
                return mat2(cos(angle),-sin(angle), sin(angle),cos(angle));
            }

            void main() {
                gl_PointSize = u_pointsize;
                vec3 pos = position;
                pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;
                pos.z += noise(rotate2d(PI / 4.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;
                vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * mvm;
            }
        `;

        const fragmentShader = `
            #ifdef GL_ES
            precision mediump float;
            #endif

            #define PI 3.14159265359
            #define TWO_PI 6.28318530718

            uniform vec2 u_resolution;

            void main() {
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                gl_FragColor = vec4(vec3(st.x * 0.9, 0.0, 1.0 - st.x * 0.2), 1.0);


            }
        `;
 const geometry = new THREE.PlaneGeometry(4, 4, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    // Handle resize
    const onResize = () => {
      const width = mountRef.current.offsetWidth;
      const height = mountRef.current.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener('resize', onResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scene.clear();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 150,
        left: 100,
        width: '90%',
        height: '80%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimationGrid;
