'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

const PARTICLE_COUNT = 700;

// Vertex + Fragment shaders with full mouse repulsion
const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aSpeed;
  varying float vOpacity;

  void main() {
    vec3 pos = position;

    // Base drift animation
    pos.x += sin(uTime * aSpeed * 0.3 + position.y * 0.5) * 0.3;
    pos.y += cos(uTime * aSpeed * 0.2 + position.x * 0.5) * 0.2;

    // Mouse repulsion in world space
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec2 mouseWorld = uMouse * vec2(5.0, 3.0); // map NDC to approx world range
    vec2 diff = worldPos.xy - mouseWorld;
    float dist = length(diff);
    float repulseRadius = 1.8;
    if (dist < repulseRadius) {
      float strength = (1.0 - dist / repulseRadius) * 1.2;
      pos.xy += normalize(diff) * strength;
    }

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    float depth = -viewPosition.z;
    gl_PointSize = (aSize * uPixelRatio * 400.0) / depth;
    vOpacity = 0.25 + sin(uTime * aSpeed + position.x * 2.0) * 0.2;
  }
`;

const fragmentShader = `
  varying float vOpacity;
  uniform vec3 uColor;

  void main() {
    float distToCenter = length(gl_PointCoord - vec2(0.5));
    float strength = 1.0 - smoothstep(0.35, 0.5, distToCenter);
    float glow = 1.0 - smoothstep(0.0, 0.5, distToCenter);
    strength = max(strength, glow * 0.5);
    if (strength < 0.01) discard;
    gl_FragColor = vec4(uColor, strength * vOpacity);
  }
`;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  const [positions, sizes, speeds] = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sizes[i] = Math.random() * 0.005 + 0.002;
      speeds[i] = Math.random() * 1.5 + 0.5;
    }

    return [positions, sizes, speeds];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: {
        value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
      },
      uColor: { value: new THREE.Color('#E8593C') },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const material = pointsRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = clock.elapsedTime;
    // Pass normalized mouse coords directly
    material.uniforms.uMouse.value.set(mouse.normalizedX, -mouse.normalizedY);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
