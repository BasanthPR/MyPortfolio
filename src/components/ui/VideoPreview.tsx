'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface VideoPreviewProps {
  src: string;
  className?: string;
  poster?: string;
}

export default function VideoPreview({ src, className = '', poster }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setVisible(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  if (!src) return null;

  return (
    <div
      className={`absolute inset-0 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element — lazy loaded */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: visible && loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onLoadedData={() => setLoaded(true)}
          className="w-full h-full object-cover"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
