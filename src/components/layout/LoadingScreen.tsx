'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import siteData from '@/data/site.json';

const LOADING_MESSAGES = [
  'Loading experience',
  'Warming up physics',
  'Tuning the vibes',
  'Almost there',
];

export default function LoadingScreen() {
  const { setLoading } = useUIStore();
  const [phase, setPhase] = useState<'init' | 'progress' | 'reveal' | 'done'>('init');
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 120);

    // Cycle loading messages
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 500);

    // Phase transitions
    const t1 = setTimeout(() => setPhase('progress'), 200);
    const t2 = setTimeout(() => setPhase('reveal'), 1600);
    const t3 = setTimeout(() => {
      setPhase('done');
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [setLoading]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0b] overflow-hidden"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Coral wipe curtain */}
          <motion.div
            className="absolute inset-0 origin-bottom"
            style={{ background: '#E8593C' }}
            initial={{ scaleY: 0 }}
            animate={phase === 'reveal' ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Grid lines — aesthetic */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(250,250,249,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,249,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
            aria-hidden
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Monogram */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block text-[clamp(5rem,15vw,10rem)] leading-none text-white font-normal tracking-tight"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
              >
                {siteData.initials}
              </span>
              {/* Glow */}
              <div
                className="absolute inset-0 blur-[40px] opacity-20 pointer-events-none"
                style={{ background: '#E8593C' }}
                aria-hidden
              />
            </motion.div>

            {/* Expanding line */}
            <motion.div
              className="h-px bg-white/20 mt-4 mb-6"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            />

            {/* Progress bar */}
            <motion.div
              className="w-32 h-px bg-white/10 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'progress' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#E8593C]"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Loading message */}
            <motion.p
              className="mt-4 text-[9px] text-white/25 tracking-[0.4em] uppercase h-4 overflow-hidden"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIndex}
                  className="block"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {LOADING_MESSAGES[msgIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.p>
          </div>

          {/* Corner decorations */}
          <div
            className="absolute top-6 left-8 text-[9px] text-white/15 tracking-[0.4em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            aria-hidden
          >
            {siteData.name}
          </div>
          <div
            className="absolute bottom-6 right-8 text-[9px] text-white/15 tracking-[0.4em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            aria-hidden
          >
            Portfolio {new Date().getFullYear()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
