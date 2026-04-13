'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogBGM } from '@/hooks/useBlogBGM';

export default function BlogBGMPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const { currentTrackInfo } = useBlogBGM(isMuted);

  return (
    <div className="fixed top-24 right-6 md:top-32 md:right-12 z-50 pointer-events-none">
      <AnimatePresence>
        {!isMuted && currentTrackInfo && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 bg-[#0a0a0b]/60 backdrop-blur-md border border-white/5 rounded-full px-4 py-2 pointer-events-auto shadow-2xl"
          >
            {/* Minimal equalizers animation */}
            <div className="flex items-end gap-[2px] h-3">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-[#C1121F]/80 rounded-t-full"
                  animate={{ height: ['40%', '100%', '30%', '80%', '40%'] }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                Now Playing
              </span>
              <span className="text-[10px] text-white/70" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {currentTrackInfo.category} Ambient
              </span>
            </div>

            <button
              onClick={() => setIsMuted(true)}
              className="ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group"
              aria-label="Mute audio"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/80">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </motion.div>
        )}

        {isMuted && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => setIsMuted(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0a0a0b]/60 backdrop-blur-md border border-white/5 hover:bg-white/10 transition-colors group shadow-2xl"
              aria-label="Unmute audio"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/80">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
