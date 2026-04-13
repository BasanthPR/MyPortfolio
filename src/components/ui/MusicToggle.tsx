'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicStore } from '@/stores/musicStore';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

const TRACK_NAMES: Record<string, string> = {
  hero: 'Ambient',
  about: 'Ambient',
  projects: 'Electronic',
  'case-studies': 'Cinematic',
  media: 'Cinematic',
  library: 'Lo-fi',
  quotes: 'Ambient',
  contact: 'Ambient',
};

export default function MusicToggle() {
  const { isPlaying, volume, activeSection, setVolume } = useMusicStore();
  const { togglePlay } = useMusicPlayer();
  const [expanded, setExpanded] = useState(false);

  const trackName = TRACK_NAMES[activeSection] ?? 'Ambient';

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    [setVolume]
  );

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="music-panel"
            className="flex flex-col gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-[#0a0a0b]/90 backdrop-blur-xl w-48"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Track info */}
            <div className="flex items-center justify-between">
              <p
                className="text-[9px] text-white/30 tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                Now playing
              </p>
              <p
                className="text-[9px] text-[#E8593C]/70 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                {trackName}
              </p>
            </div>

            {/* Waveform bars */}
            <div className="flex items-center justify-center gap-[3px] h-6">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-[#E8593C]/60 rounded-full"
                  animate={
                    isPlaying
                      ? {
                          height: [4, 14, 6, 18, 8, 14, 4],
                          transition: {
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          },
                        }
                      : { height: 4 }
                  }
                />
              ))}
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2">
              <span className="text-white/20 text-xs">♪</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-px appearance-none bg-white/10 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8593C]"
                aria-label="Music volume"
              />
            </div>

            {/* Note */}
            <p
              className="text-[8px] text-white/20 leading-relaxed"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              Audio files auto-match the current section
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle pill */}
      <div className="flex items-center gap-2">
        {/* Expand/collapse label */}
        <AnimatePresence>
          {!expanded && isPlaying && (
            <motion.button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 bg-[#0a0a0b]/80 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              aria-label="Open music controls"
            >
              <span
                className="text-[9px] text-[#E8593C]/60 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                {trackName}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            if (expanded) {
              setExpanded(false);
            } else {
              togglePlay();
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setExpanded(!expanded);
          }}
          className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-sm bg-[#0a0a0b]/60 flex items-center justify-center gap-px cursor-pointer hover:border-[#E8593C]/30 transition-colors duration-300"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title={
            expanded
              ? 'Close'
              : isPlaying
              ? 'Click to pause • Right-click for controls'
              : 'Play ambient music'
          }
          aria-label={isPlaying ? 'Pause music' : 'Play ambient music'}
        >
          {expanded ? (
            <span className="text-white/40 text-xs">✕</span>
          ) : (
            [0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-white/60 rounded-full"
                animate={
                  isPlaying
                    ? {
                        height: [4, 12, 6, 16, 4],
                        transition: {
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: 'easeInOut',
                        },
                      }
                    : { height: 4 }
                }
              />
            ))
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
