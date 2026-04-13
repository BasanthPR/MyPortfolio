'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'chars' | 'words' | 'lines';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  mode = 'words',
  tag: Tag = 'p',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });

  const items = mode === 'chars' ? text.split('') : text.split(' ');

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <span className="flex flex-wrap gap-[0.25em]">
        {items.map((item, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + i * (mode === 'chars' ? 0.03 : 0.06),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {item}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
