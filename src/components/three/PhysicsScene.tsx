'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, useRapier } from '@react-three/rapier';
import { useMousePosition } from '@/hooks/useMousePosition';
import * as THREE from 'three';

// ── Geometry types for data nodes ────────────────────────────────────────────

const GEOMETRIES = ['icosahedron', 'dodecahedron', 'octahedron', 'tetrahedron', 'torus'] as const;
type GeoType = typeof GEOMETRIES[number];

interface NodeConfig {
  position: [number, number, number];
  geo: GeoType;
  scale: number;
  rotSpeed: [number, number, number];
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function DataNode({ cfg }: { cfg: NodeConfig; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rigidRef = useRef<any>(null);
  const mouse = useMousePosition();
  const { viewport, camera } = useThree();

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.x += cfg.rotSpeed[0];
    mesh.rotation.y += cfg.rotSpeed[1];
    mesh.rotation.z += cfg.rotSpeed[2];

    // Cursor attractor force (gentle drift toward mouse relative to camera)
    if (rigidRef.current) {
      const rb = rigidRef.current;
      const pos = rb.translation();
      const targetX = camera.position.x + mouse.normalizedX * (viewport.width / 2);
      const targetY = camera.position.y - mouse.normalizedY * (viewport.height / 2);
      
      const dist = Math.sqrt((targetX - pos.x)**2 + (targetY - pos.y)**2);
      if (dist < 15) { // Magnetic attraction radius
        const dx = (targetX - pos.x) * 0.0005;
        const dy = (targetY - pos.y) * 0.0005;
        rb.applyImpulse({ x: dx, y: dy, z: 0 }, true);
      }
    }
  });

  const geo = useMemo(() => {
    switch (cfg.geo) {
      case 'icosahedron': return <icosahedronGeometry args={[cfg.scale * 0.6, 0]} />;
      case 'dodecahedron':return <dodecahedronGeometry args={[cfg.scale * 0.5, 0]} />;
      case 'torus':       return <torusGeometry args={[cfg.scale * 0.5, cfg.scale * 0.15, 6, 12]} />;
      case 'octahedron':  return <octahedronGeometry args={[cfg.scale * 0.6]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[cfg.scale * 0.7]} />;
    }
  }, [cfg]);

  return (
    <RigidBody
      ref={rigidRef}
      position={cfg.position}
      restitution={1.1} // Bouncy collisions
      friction={0.1}
      linearDamping={0.1} // Smooth drift in zero g
      angularDamping={0.1}
      colliders="hull"
    >
      <mesh ref={meshRef}>
        {geo}
        {/* DNEG-style heavy lighting material */}
        <meshStandardMaterial
          color="#FF4655"
          emissive="#7A0A12"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={Math.random() > 0.7} // Some solid, some wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
    </RigidBody>
  );
}

// ── Shared Explosion / Scroll Physics System ───────────────────────────────────

function PhysicsSystem({ nodes }: { nodes: NodeConfig[] }) {
  const { gl, camera } = useThree();
  const { world } = useRapier();

  // 1. Scroll-bound Camera Mapping
  useFrame(() => {
    const scrollY = window.scrollY || 0;
    const targetY = -(scrollY * 0.015);
    const targetZ = 8 - (scrollY * 0.001); // Slowly dive forward
    
    // Smooth cinematic interpolation
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  // 2. Click Explosion
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleClick = () => {
      if (!world) return;
      
      // Send physical shockwave
      world.bodies.forEach((body: any) => {
        const force = 0.5 + Math.random() * 1.5;
        const angle = Math.random() * Math.PI * 2;
        body.applyImpulse({
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force + (Math.random() - 0.5) * force,
          z: (Math.random() - 0.5) * force,
        }, true);
        
        // Add random spinning torque
        body.applyTorqueImpulse({
          x: (Math.random() - 0.5) * force * 2,
          y: (Math.random() - 0.5) * force * 2,
          z: (Math.random() - 0.5) * force * 2,
        }, true);
      });
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [gl, world]);

  return null;
}

// ── Physics World ────────────────────────────────────────────────────────────

export default function PhysicsScene() {
  // Spawn nodes across the entire scroll envelope
  const nodes = useMemo<NodeConfig[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      position: [
        randomBetween(-25, 25), // Wide X
        randomBetween(20, -120), // Deep Y axis to cover scrolling
        randomBetween(6, -15), // Parallax depth
      ],
      geo: GEOMETRIES[i % GEOMETRIES.length],
      scale: randomBetween(1.0, 4.5), // Massive architectural scales
      rotSpeed: [
        randomBetween(-0.01, 0.01),
        randomBetween(-0.01, 0.01),
        randomBetween(-0.01, 0.01),
      ],
    }));
  }, []);

  return (
    <Physics gravity={[0, 0, 0]}>
      {/* Remove the invisible floor constraints so they float endlessly */}
      {nodes.map((cfg, i) => (
        <DataNode key={i} cfg={cfg} index={i} />
      ))}
      <PhysicsSystem nodes={nodes} />
    </Physics>
  );
}
