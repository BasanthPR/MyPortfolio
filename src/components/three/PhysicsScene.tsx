'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
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

// ── Standard Data Node ───────────────────────────────────────────────────────

function DataNode({ cfg, index }: { cfg: NodeConfig; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rigidRef = useRef<any>(null);
  const mouse = useMousePosition();
  const { viewport, camera } = useThree();
  
  // Dynamic geometry state
  const [geoIdx, setGeoIdx] = useState(() => GEOMETRIES.indexOf(cfg.geo));

  // Swap geometry occasionally on clicks to keep visuals engaging
  useEffect(() => {
    const handleSwap = () => {
      // 30% chance to swap shape on click
      if (Math.random() > 0.7) {
        setGeoIdx((prev) => (prev + 1) % GEOMETRIES.length);
      }
    };
    window.addEventListener('click', handleSwap);
    return () => window.removeEventListener('click', handleSwap);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.x += cfg.rotSpeed[0];
    mesh.rotation.y += cfg.rotSpeed[1];
    mesh.rotation.z += cfg.rotSpeed[2];

    // Gentle cursor attractor
    if (rigidRef.current) {
      const rb = rigidRef.current;
      const pos = rb.translation();
      const targetX = camera.position.x + mouse.normalizedX * (viewport.width / 2);
      const targetY = camera.position.y - mouse.normalizedY * (viewport.height / 2);
      
      const dist = Math.sqrt((targetX - pos.x)**2 + (targetY - pos.y)**2);
      if (dist < 15) {
        const dx = (targetX - pos.x) * 0.0005;
        const dy = (targetY - pos.y) * 0.0005;
        rb.applyImpulse({ x: dx, y: dy, z: 0 }, true);
      }
      
      // Wrap-around logic to ensure nodes don't drift away fully out of bounds
      // We keep them somewhat anchored relative to the camera's Y descent
      if (pos.y > camera.position.y + 40) rb.setTranslation({ x: pos.x, y: camera.position.y - 120, z: pos.z }, true);
      if (pos.y < camera.position.y - 140) rb.setTranslation({ x: pos.x, y: camera.position.y + 20, z: pos.z }, true);
      if (pos.x > 30) rb.setTranslation({ x: -30, y: pos.y, z: pos.z }, true);
      if (pos.x < -30) rb.setTranslation({ x: 30, y: pos.y, z: pos.z }, true);
    }
  });

  const geoType = GEOMETRIES[geoIdx];
  const geo = useMemo(() => {
    switch (geoType) {
      case 'icosahedron': return <icosahedronGeometry args={[cfg.scale * 0.6, 0]} />;
      case 'dodecahedron':return <dodecahedronGeometry args={[cfg.scale * 0.5, 0]} />;
      case 'torus':       return <torusGeometry args={[cfg.scale * 0.5, cfg.scale * 0.15, 6, 12]} />;
      case 'octahedron':  return <octahedronGeometry args={[cfg.scale * 0.6]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[cfg.scale * 0.7]} />;
    }
  }, [geoType, cfg.scale]);

  return (
    <RigidBody
      ref={rigidRef}
      position={cfg.position}
      restitution={1.1} // Bouncy
      friction={0.1}
      linearDamping={0.1}
      angularDamping={0.1}
      colliders="hull"
    >
      <mesh ref={meshRef}>
        {geo}
        <meshStandardMaterial
          color="#FF4655" // Blood / Valorant Red
          emissive="#7A0A12"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={Math.random() > 0.7}
          transparent
          opacity={0.8}
        />
      </mesh>
    </RigidBody>
  );
}

// ── The Seeker (Funny Graphic) ───────────────────────────────────────────────

function SeekerNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const rigidRef = useRef<any>(null);
  const mouse = useMousePosition();
  const { viewport, camera } = useThree();

  const [emotion, setEmotion] = useState<'calm' | 'excited'>('calm');

  useFrame((state) => {
    if (!rigidRef.current || !meshRef.current) return;
    const rb = rigidRef.current;
    const mesh = meshRef.current;
    
    const pos = rb.translation();
    const targetX = camera.position.x + mouse.normalizedX * (viewport.width / 2);
    const targetY = camera.position.y - mouse.normalizedY * (viewport.height / 2);
    
    // Calculate distance to cursor
    const dx = targetX - pos.x;
    const dy = targetY - pos.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    // Seeker behavior: Aggressively flies to cursor, spazzes out when close
    if (dist > 2.0) {
      if (emotion !== 'calm') setEmotion('calm');
      // Fly towards cursor tracking aggressively
      rb.applyImpulse({ x: dx * 0.005, y: dy * 0.005, z: 0 }, true);
      // Spin normally
      mesh.rotation.x += 0.02;
      mesh.rotation.y += 0.03;
    } else {
      if (emotion !== 'excited') setEmotion('excited');
      // Spazz out / seek attention constantly around cursor
      rb.applyImpulse({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.3
      }, true);
      mesh.rotation.x += 0.15;
      mesh.rotation.y += 0.2;
    }
  });

  return (
    <RigidBody
      ref={rigidRef}
      position={[0, 0, 0]}
      restitution={1.5} // Extremely bouncy
      friction={0}
      linearDamping={1.5} // Drag to stop it flying into infinity easily
      angularDamping={0.5}
      colliders="hull"
    >
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.4, 64, 16]} />
        <meshStandardMaterial
          color={emotion === 'excited' ? "#ffffff" : "#00D4FF"} // Data Blue
          emissive="#00D4FF"
          emissiveIntensity={emotion === 'excited' ? 1.5 : 0.8}
          roughness={0.1}
          metalness={0.9}
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
    const handleClick = () => {
      if (!world) return;
      
      // Send physical shockwave
      world.bodies.forEach((body: any) => {
        const force = 0.5 + Math.random() * 2.5; // Stronger punch
        const angle = Math.random() * Math.PI * 2;
        body.applyImpulse({
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force + (Math.random() - 0.5) * force,
          z: (Math.random() - 0.5) * force,
        }, true);
        
        // Add random spinning torque
        body.applyTorqueImpulse({
          x: (Math.random() - 0.5) * force * 3,
          y: (Math.random() - 0.5) * force * 3,
          z: (Math.random() - 0.5) * force * 3,
        }, true);
      });
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [world]);

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
      {/* Our funny attention seeker graphic */}
      <SeekerNode />
      <PhysicsSystem nodes={nodes} />
    </Physics>
  );
}
