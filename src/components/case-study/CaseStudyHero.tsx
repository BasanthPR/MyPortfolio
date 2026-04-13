'use client';

import { motion } from 'framer-motion';
import { CaseStudyMeta } from '@/lib/mdx';

export default function CaseStudyHero({ meta }: { meta: CaseStudyMeta }) {
  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-end pb-16 px-6 md:px-12 overflow-hidden bg-[#0a0a0b]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/20 to-[#0a0a0b]" />
      <div className="relative z-10 max-w-4xl">
        <motion.div className="flex flex-wrap gap-2 mb-6">
          {meta.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-[#E8593C]/60 tracking-wider uppercase border border-[#E8593C]/20 px-3 py-1 rounded-full"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
        <motion.h1
          className="font-normal text-white leading-[0.95]"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
          }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {meta.title}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-white/50"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {meta.description}
        </motion.p>
      </div>
    </div>
  );
}
