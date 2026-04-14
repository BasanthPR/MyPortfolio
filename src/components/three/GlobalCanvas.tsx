'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

const PhysicsScene = dynamic(() => import('./PhysicsScene'), { ssr: false });

function ErrorFallback() {
  return null;
}

class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 3]} intensity={0.8} color="#F2EDE8" />
      <pointLight position={[-4, 2, -2]} intensity={1.2} color="#C1121F" />
      <pointLight position={[4, -2, 2]} intensity={0.6} color="#00D4FF" />
    </>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <CanvasErrorBoundary fallback={<ErrorFallback />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={[1, 1.5]}
        >
          {/* Base camera (controlled by PhysicsScene) */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
          <SceneLighting />
          <Suspense fallback={null}>
            <PhysicsScene />
          </Suspense>
          <EffectComposer>
            <ChromaticAberration
              offset={new THREE.Vector2(0.003, 0.003)}
              blendFunction={BlendFunction.NORMAL}
              radialModulation={false}
              modulationOffset={0}
            />
            <Noise opacity={0.06} premultiplied={false} />
            <Vignette eskil={false} offset={0.1} darkness={0.85} />
          </EffectComposer>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
