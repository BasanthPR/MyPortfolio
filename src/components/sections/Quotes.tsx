'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import quotesData from '@/data/quotes.json';

type Quote = (typeof quotesData)[0];

const ACCENT_COLORS = ['#1D9E75', '#3B8BD4', '#E8593C', '#BA7517', '#8B5CF6'];

function QuoteSlide({ quote, index }: { quote: Quote; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: false,
    margin: '-20% 0px -20% 0px',
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  // Split text into words for stagger
  const words = quote.text.split(' ');

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-24 overflow-hidden"
      aria-label={`Quote by ${quote.author}`}
    >
      {/* Background large quotation mark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y }}
        aria-hidden
      >
        <span
          className="text-[30vw] leading-none font-normal"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            color: `${accent}06`,
            lineHeight: 0.8,
          }}
        >
          &ldquo;
        </span>
      </motion.div>

      {/* Category badge */}
      <motion.div
        className="mb-12 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-8 h-px" style={{ background: accent }} />
        <span
          className="text-[9px] tracking-[0.5em] uppercase"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${accent}80` }}
        >
          {quote.category}
        </span>
        <div className="w-8 h-px" style={{ background: accent }} />
      </motion.div>

      {/* Quote text — word-by-word stagger */}
      <blockquote className="relative z-10 max-w-4xl text-center mb-12">
        <p
          className="font-normal text-white leading-tight flex flex-wrap justify-center gap-[0.25em]"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2rem, 5vw, 5.5rem)',
          }}
        >
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={
                  isInView
                    ? { y: 0, opacity: 1 }
                    : { y: '110%', opacity: 0 }
                }
                transition={{
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </blockquote>

      {/* Attribution */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: words.length * 0.04 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-12 h-px mb-4" style={{ background: `${accent}40` }} />
        <p
          className="text-white/50 text-sm"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          {quote.author}
        </p>
        {quote.source && (
          <p
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${accent}50` }}
          >
            {quote.source}
          </p>
        )}
      </motion.div>

      {/* Bottom fade gradient to next quote */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, #0a0a0b)`,
        }}
        aria-hidden
      />

      {/* Slide number */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-16"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <span
          className="text-[9px] tracking-[0.3em]"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${accent}40` }}
        >
          {String(index + 1).padStart(2, '0')} / {String(quotesData.length).padStart(2, '0')}
        </span>
      </motion.div>
    </div>
  );
}

export default function Quotes() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef as React.RefObject<Element>, {
    once: true,
    margin: '-10% 0px',
  });

  return (
    <section id="quotes" className="relative bg-[#0a0a0b]/30 backdrop-blur-md" aria-label="Quotes to live by">
      {/* Minimal header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-0">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.22)' }}
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Quotes
        </motion.p>
        <motion.h2
          className="font-normal text-white mt-2"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2rem, 4vw, 4rem)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Words I live by
        </motion.h2>
      </div>

      {/* Quote slides */}
      {quotesData.map((quote, i) => (
        <QuoteSlide key={quote.id} quote={quote} index={i} />
      ))}
    </section>
  );
}
