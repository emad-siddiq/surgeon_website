import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * The WebGL variant of the aurora — a pair of slow-drifting blob fields that
 * sit on top of the CSS fallback. Intentionally restrained ("breathing, not
 * performing" per DESIGN_SPEC §4).
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_warm;
  uniform vec3 u_warm2;
  uniform vec3 u_cool;
  uniform vec3 u_cool2;
  uniform vec3 u_cream;

  float blob(vec2 uv, vec2 center, float radius) {
    float d = distance(uv, center);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2 uv = vUv;
    float t = u_time * 0.05;

    vec2 warmCenter = vec2(0.20 + sin(t) * 0.03, 0.25 + cos(t * 0.7) * 0.02);
    vec2 coolCenter = vec2(0.80 + cos(t * 0.8) * 0.03, 0.45 + sin(t * 0.5) * 0.02);

    float warm = blob(uv, warmCenter, 0.55);
    float cool = blob(uv, coolCenter, 0.50);

    vec3 base = u_cream;
    vec3 col = mix(base, u_warm,  pow(warm, 1.2) * 0.55);
    col = mix(col, u_warm2, pow(warm, 2.4) * 0.35);
    col = mix(col, u_cool,  pow(cool, 1.2) * 0.45);
    col = mix(col, u_cool2, pow(cool, 2.4) * 0.30);

    gl_FragColor = vec4(col, 0.55);
  }
`;

function AuroraMesh() {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_warm: { value: new THREE.Color('#F3D4C1') },
      u_warm2: { value: new THREE.Color('#F9E7DA') },
      u_cool: { value: new THREE.Color('#DAD5EA') },
      u_cool2: { value: new THREE.Color('#ECEAF5') },
      u_cream: { value: new THREE.Color('#FBF6F1') },
    }),
    [],
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function AuroraCanvas() {
  const [visible, setVisible] = useState(true);
  const holderRef = useRef<HTMLDivElement>(null);

  // Pause rendering when off-screen.
  useEffect(() => {
    const el = holderRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when tab is hidden.
  useEffect(() => {
    const onVis = () =>
      setVisible((v) => (document.visibilityState === 'visible' ? v : false));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <div
      ref={holderRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <AuroraMesh />
      </Canvas>
    </div>
  );
}
