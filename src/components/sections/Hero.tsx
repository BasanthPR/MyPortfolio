'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import siteData from '@/data/site.json';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [interacted, setInteracted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent"
      aria-label="Hero"
      onPointerDown={() => setInteracted(true)}
    >

      {/* Mobile fallback — subtle grid */}
      {isMobile && (
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      )}

      {/* Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, #05050A 100%)',
        }}
      />

      {/* Cinematic Ticker Strip (Background) */}
      <div className="absolute top-[8%] left-0 right-0 z-0 opacity-10 pointer-events-none select-none flex overflow-hidden">
        <div className="ticker-strip">
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="px-8 font-normal"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(5rem, 15vw, 15rem)',
                color: 'var(--ivory)',
                whiteSpace: 'nowrap'
              }}
            >
              DATA SCIENCE • DESIGN • MOTION •
            </span>
          ))}
        </div>
      </div>

      {/* Hero Text */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto select-none"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow label */}
        <motion.p
          className="mb-8 tracking-[0.3em] uppercase text-[10px] md:text-[11px]"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            color: 'rgba(242, 237, 232, 0.62)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Data Scientist &nbsp;·&nbsp; Designer &nbsp;·&nbsp; Builder
        </motion.p>

        {/* Name — refined scale */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-normal leading-[0.9] tracking-tight"
            style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(4rem, 12vw, 14rem)',
              color: '#F2EDE8',
              letterSpacing: '-0.03em',
            }}
            initial={{ y: '108%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {siteData.name}
          </motion.h1>
        </div>

        {/* Editorial subline */}
        <motion.p
          className="mb-8 max-w-md mx-auto text-base md:text-lg leading-relaxed"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            color: 'rgba(242, 237, 232, 0.65)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Building things that live at the intersection of
          <br className="hidden md:block" /> data, design, and human experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border text-sm font-medium transition-all duration-500 hover:bg-white/5"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              color: '#F2EDE8',
              borderColor: 'rgba(242,237,232,0.2)',
              letterSpacing: '0.02em',
            }}
          >
            View work
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>
          <a
            href="#contact"
            className="text-sm transition-colors duration-300 hover:text-white/70"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              color: 'rgba(242,237,232,0.55)',
              letterSpacing: '0.02em',
            }}
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Availability badge — top right, minimal */}
      <motion.div
        className="absolute top-6 right-6 z-10 hidden md:flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.2)' }}
        >
          {siteData.availability}
        </span>
      </motion.div>
    </section>
  );
}
