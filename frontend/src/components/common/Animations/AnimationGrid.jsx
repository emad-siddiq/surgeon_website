import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const BackgroundAnimation2 = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null; // Make background transparent

        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(0, 0, 4.5);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const uniforms = {
            u_time: { value: 0.0 },
            u_pointsize: { value: 3.0 }, // Larger points to make the grid more visible
            u_noise_freq_1: { value: 2.0 }, // Increase frequency for more detailed waves
            u_noise_amp_1: { value: 0.5 }, // Increase amplitude for larger waves
            u_spd_modifier_1: { value: 1.0 },
            u_noise_freq_2: { value: 5.0 }, // Increase frequency for the second noise
            u_noise_amp_2: { value: 0.8 }, // Increase amplitude for more noticeable waves
            u_spd_modifier_2: { value: 0.8 },
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
                gl_FragColor = vec4(vec3(0.0, st), 1.0);
            }
        `;

        // Mesh
        const geometry = new THREE.PlaneGeometry(4, 4, 128, 128);
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = false; // Disable auto-rotation

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            uniforms.u_time.value = elapsedTime;
            renderer.render(scene, camera);
        };

        // Handle resize
        const onWindowResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            uniforms.u_resolution.value.set(width, height);
        };
        window.addEventListener('resize', onWindowResize);

        // Initial setup
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', onWindowResize);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                top: 0,
                left: -400,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        />
    );
};

export default BackgroundAnimation2;
