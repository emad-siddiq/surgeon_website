import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BackgroundAnimation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const width = 160; // Increased width for more particles
        const length = 320; // Increased length for more particles
        const pointSize = 0.04; // Smaller point size for denser appearance
        let renderer, scene, camera, pointcloud, clock;

        // Scene setup
        scene = new THREE.Scene();
        clock = new THREE.Clock();

        // Camera setup for a horizontal 3D view
        const frustumSize = 20;
        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            10,
            1000
        );
        camera.position.set(-30, 0, 18);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Renderer with transparent background
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Generate point cloud geometry
        const generatePointCloudGeometry = (width, length) => {
            const geometry = new THREE.BufferGeometry();
            const numPoints = width * length;
            const positions = new Float32Array(numPoints * 3);
            const colors = new Float32Array(numPoints * 3);
            let k = 0;

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < length; j++) {
                    const x = (i / width - 0.5) * 20;
                    const z = (j / length - 0.5) * 20;
                    const y = (Math.cos(i * Math.PI * 4 / width) + Math.sin(j * Math.PI * 8 / length)) / 50 * 10; // Wave function
            
                    // Set positions and colors
                    positions[3 * k] = x;
                    positions[3 * k + 1] = y;
                    positions[3 * k + 2] = z;
            
                    colors[3 * k] = 1;
                    colors[3 * k + 1] = 1;
                    colors[3 * k + 2] = 1;
            
                    k++;
                }
            }
            

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.computeBoundingBox();

            return geometry;
        };

        // Create point cloud
        const geometry = generatePointCloudGeometry(width, length);
        const material = new THREE.PointsMaterial({
            size: pointSize,
            vertexColors: true,
            sizeAttenuation: false
        });
        pointcloud = new THREE.Points(geometry, material);
        scene.add(pointcloud);

        // Update sizes
        const updateSize = () => {
            const container = mountRef.current;
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            const aspect = width / height;
            
            camera.left = frustumSize * aspect / -2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = frustumSize / -2;
            camera.updateProjectionMatrix();
            
            renderer.setSize(width, height);
        };

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            const positions = pointcloud.geometry.attributes.position.array;
            const colors = pointcloud.geometry.attributes.color.array;

            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const z = positions[i + 2];

                // Calculate wave effect based on position and time
                const wave = Math.sin(x * 0.2 + z * 0.2 + time * 2) / 5; // Reduce wave height to 1/3

                // Update particle color based on the wave
                colors[i] = 0.8 + 0.5 * wave; // Red
                colors[i + 1] = 0.3 - 0.5 * wave; // Green
                colors[i + 2] = 0.8 + 1 * Math.cos(wave); // Blue

                // Optional: Subtle vertical motion (toned down)
                const originalY = positions[i + 1];
                positions[i + 1] = originalY + wave * 0.1; // Very slight vertical motion
            }

            pointcloud.geometry.attributes.color.needsUpdate = true;
            pointcloud.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        // Initial setup
        updateSize();
        animate();

        // Handle resize
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(mountRef.current);

        return () => {
            resizeObserver.disconnect();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                top: 300,
                left: -200,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden' // Ensure no overflow
            }}
        />
    );
};

export default BackgroundAnimation;