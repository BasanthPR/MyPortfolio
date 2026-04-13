'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  className = '',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-15% 0px' });

  return (
    <div ref={ref} className={className}>
      {label && (
        <motion.p
          className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h2
          className="font-normal text-white leading-[1.05]"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2rem, 5vw, 5rem)',
          }}
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
