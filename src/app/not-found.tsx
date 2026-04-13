'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="text-[10px] text-[#E8593C]/60 tracking-[0.4em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          404 — Not Found
        </p>
        <h1
          className="font-normal text-white/10 leading-none"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(4rem, 15vw, 12rem)',
          }}
        >
          Lost
        </h1>
        <p
          className="text-white/40 mt-6 mb-10 max-w-sm mx-auto"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          This page doesn&apos;t exist. Let&apos;s get you back somewhere familiar.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm font-medium text-[#E8593C] hover:text-white transition-colors duration-300"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          <span>←</span>
          <span>Back to home</span>
        </Link>
      </motion.div>
    </div>
  );
}
