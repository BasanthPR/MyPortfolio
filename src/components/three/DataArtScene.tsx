'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

const COUNT = 500;

export default function DataArtScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouse = useMousePosition();
  const { viewport } = useThree();

  // Create initial shard data spread across massive vertical depth
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 180 - 40, // From +50 to -130 roughly
        (Math.random() - 0.5) * 25
      );
      
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );

      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04
      );

      // Random scale, some big shards, mostly tiny data points for tech aesthetics
      const scaleBase = Math.random() > 0.9 ? Math.random() * 0.6 + 0.2 : Math.random() * 0.15 + 0.02;

      temp.push({ 
        position, 
        basePosition: position.clone(), 
        velocity, 
        rotation, 
        rotSpeed, 
        scaleBase,
        currentScale: scaleBase
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mouseVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Scroll-bound Camera Logic
    // We plunge the camera down and forward as the user scrolls
    const scrollY = window.scrollY || 0;
    const targetY = -(scrollY * 0.015);
    const targetZ = 5 - (scrollY * 0.002);
    
    // Smooth camera interpolation
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, state.camera.position.y - 10, 0);

    // 2. Cursor targeting mapped securely to camera space
    // So the interaction happens around where the camera is currently looking
    mouseVec.set(
      state.camera.position.x + (mouse.normalizedX * viewport.width) / 2,
      state.camera.position.y + (-mouse.normalizedY * viewport.height) / 2,
      state.camera.position.z - 5
    );

    particles.forEach((p, i) => {
      // Natural Drift
      p.position.add(p.velocity);
      
      // Infinite Wrapping bounds based roughly off relative camera Y
      if (p.position.x > 20) p.position.x = -20;
      if (p.position.x < -20) p.position.x = 20;

      // Wrap Y relative to camera so we never run out of particles!
      if (p.position.y > state.camera.position.y + 40) p.position.y -= 140;
      if (p.position.y < state.camera.position.y - 100) p.position.y += 140;

      if (p.position.z > 15) p.position.z = -15;
      if (p.position.z < -15) p.position.z = 15;

      // Cursor Repulsion
      const dist = p.position.distanceTo(mouseVec);
      const pushRadius = 4.0;
      
      if (dist < pushRadius) {
        // Fast evade
        const force = (pushRadius - dist) / pushRadius;
        const pushDir = p.position.clone().sub(mouseVec).normalize();
        p.position.add(pushDir.multiplyScalar(force * 0.4));
        
        // Scale up like glowing interaction node
        p.currentScale = THREE.MathUtils.lerp(p.currentScale, p.scaleBase * 3.5, 0.2);
        
        // Spin fast
        p.rotation.x += p.rotSpeed.x * 8;
        p.rotation.y += p.rotSpeed.y * 8;
      } else {
        // Gentle return to base scale + base rotation
        p.currentScale = THREE.MathUtils.lerp(p.currentScale, p.scaleBase, 0.04);
        p.rotation.x += p.rotSpeed.x;
        p.rotation.y += p.rotSpeed.y;
        p.rotation.z += p.rotSpeed.z;
      }

      // 3. Update Dummy Object for InstancedMesh
      dummy.position.copy(p.position);
      dummy.rotation.copy(p.rotation);
      dummy.scale.setScalar(p.currentScale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#FF4655" // Valorant Red accent
        emissive="#FF4655"
        emissiveIntensity={0.6}
        wireframe
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
}
