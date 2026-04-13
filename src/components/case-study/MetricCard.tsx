'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface MetricCardProps {
  value: number;
  unit?: string;
  label: string;
  prefix?: string;
}

export default function MetricCard({ value, unit = '', label, prefix = '' }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="p-8 border border-white/10 rounded-xl">
      <div
        className="text-5xl text-white font-normal"
        style={{ fontFamily: 'var(--font-instrument-serif)' }}
      >
        {prefix}{count}{unit}
      </div>
      <p
        className="text-sm text-white/40 mt-2 tracking-wider"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {label}
      </p>
    </div>
  );
}
