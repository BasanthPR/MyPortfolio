'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-white/40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="text-[10px] tracking-[0.3em] uppercase"
        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        Scroll
      </span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
