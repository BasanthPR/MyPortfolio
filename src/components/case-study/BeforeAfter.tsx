'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <Image src={after} alt={afterLabel} fill className="object-cover" />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={before} alt={beforeLabel} fill className="object-cover" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <span className="text-[#0a0a0b] text-xs">↔</span>
        </div>
      </div>
      <div
        className="absolute top-4 left-4 text-[10px] text-white/60 tracking-wider uppercase"
        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        {beforeLabel}
      </div>
      <div
        className="absolute top-4 right-4 text-[10px] text-white/60 tracking-wider uppercase"
        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        {afterLabel}
      </div>
    </div>
  );
}
