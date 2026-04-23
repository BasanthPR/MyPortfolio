'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import clsx from 'clsx';
import publicationsData from '@/data/publications.json';

interface PublicationEntry {
  id: string;
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  year: number;
  abstract: string;
  metrics: { label: string; value: string }[];
  tag: string;
  subtag: string;
  pdfUrl?: string | null;
  externalUrl?: string | null;
  doi?: string | null;
  accent: string;
  index: number;
}

const PUBLICATIONS = publicationsData as PublicationEntry[];

function PublicationCard({ pub, isEven }: { pub: PublicationEntry; isEven: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });
  const { setType } = useCursorStore();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'w-full flex mb-24 md:mb-40',
        isEven ? 'justify-start' : 'justify-end'
      )}
    >
      <div className="w-full md:max-w-4xl group">
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.04] bg-[#0A0A0B]/40 backdrop-blur-3xl hover:border-white/10 transition-all duration-700">
          <div className="grid md:grid-cols-[1.5fr_2fr] min-h-[360px]">

            {/* Visual Panel */}
            <div
              className="relative hidden md:flex flex-col items-start justify-between p-10 overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${pub.accent}12 0%, transparent 60%)` }}
            >
              {/* Large index number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
                <span
                  className="text-[11rem] font-normal leading-none opacity-[0.05] transition-transform duration-1000 group-hover:scale-105"
                  style={{ fontFamily: 'var(--font-instrument-serif)', color: pub.accent }}
                >
                  {String(pub.index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Venue badge */}
              <div className="relative z-10">
                <span
                  className="text-[8px] tracking-[0.45em] uppercase"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${pub.accent}80` }}
                >
                  {pub.venueShort}
                </span>
              </div>

              {/* Metrics */}
              <div className="relative z-10 w-full space-y-4">
                {pub.metrics.map((m) => (
                  <div key={m.label} className="border-t border-white/[0.06] pt-4">
                    <p
                      className="text-[8px] tracking-[0.3em] uppercase mb-1"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(255,255,255,0.25)' }}
                    >
                      {m.label}
                    </p>
                    <p
                      className="text-base font-normal"
                      style={{ fontFamily: 'var(--font-instrument-serif)', color: `${pub.accent}CC` }}
                    >
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Light streak on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 45%, ${pub.accent}06 50%, transparent 55%)`,
                  backgroundSize: '200% 200%',
                }}
              />
            </div>

            {/* Content Panel */}
            <div className="flex flex-col justify-between p-10 md:p-14">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span
                    className="text-[8px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      background: `${pub.accent}08`,
                      color: `${pub.accent}CC`,
                      borderColor: `${pub.accent}20`,
                    }}
                  >
                    {pub.tag}
                  </span>
                  <span
                    className="text-[8px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border border-white/[0.06]"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      color: 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {pub.subtag}
                  </span>
                  <span
                    className="text-[8px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(255,255,255,0.18)' }}
                  >
                    {pub.year}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-white font-normal leading-[1.1] mb-5"
                  style={{
                    fontFamily: 'var(--font-instrument-serif)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  }}
                >
                  {pub.title}
                </h3>

                {/* Authors */}
                <p
                  className="text-white/25 text-[11px] tracking-[0.08em] uppercase mb-6 leading-relaxed"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {pub.authors}
                </p>

                {/* Abstract */}
                <p
                  className="text-white/30 text-sm leading-relaxed max-w-xl"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {pub.abstract}
                </p>

                {/* Mobile metrics */}
                <div className="flex md:hidden gap-6 mt-6 flex-wrap">
                  {pub.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[8px] tracking-[0.3em] uppercase text-white/20 mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                        {m.label}
                      </p>
                      <p className="text-sm font-normal" style={{ fontFamily: 'var(--font-instrument-serif)', color: `${pub.accent}CC` }}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-12 flex flex-wrap items-center gap-8">
                {pub.pdfUrl && (
                  <a
                    href={pub.pdfUrl}
                    download
                    className="flex items-center gap-3 py-2 border-b border-transparent hover:border-white/20 transition-all group/pdf"
                    onMouseEnter={() => setType('hover')}
                    onMouseLeave={() => setType('default')}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover/pdf:opacity-100 transition-opacity">
                      <path d="M7 9.5L7 1.5M7 9.5L10 6.5M7 9.5L4 6.5M1.5 12.5L12.5 12.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      className="text-[11px] tracking-[0.2em] uppercase text-white/40 group-hover/pdf:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      Download Paper
                    </span>
                  </a>
                )}

                {pub.externalUrl && (
                  <a
                    href={pub.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2 border-b border-transparent hover:border-white/20 transition-all group/ext"
                    onMouseEnter={() => setType('hover')}
                    onMouseLeave={() => setType('default')}
                  >
                    <span
                      className="text-[11px] tracking-[0.2em] uppercase text-white/40 group-hover/ext:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      View Publication ↗
                    </span>
                  </a>
                )}

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2 border-b border-transparent hover:border-white/20 transition-all group/doi"
                    onMouseEnter={() => setType('hover')}
                    onMouseLeave={() => setType('default')}
                  >
                    <span
                      className="text-[11px] tracking-[0.2em] uppercase text-white/20 group-hover/doi:text-white/50 transition-colors"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      DOI: {pub.doi}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Publications() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  return (
    <section
      ref={ref}
      id="publications"
      className="relative py-32 md:py-56 px-6 md:px-12 max-w-7xl mx-auto z-10"
      aria-label="Publications"
    >
      {/* Section header */}
      <div className="mb-24 md:mb-40">
        <motion.p
          className="text-[10px] tracking-[0.5em] uppercase mb-8"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#F2EDE840' }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Academic Work
        </motion.p>
        <motion.h2
          className="font-normal text-white leading-[0.9] overflow-hidden"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(4rem, 10vw, 11rem)',
            letterSpacing: '-0.03em',
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Research &amp;{' '}
            <em className="text-white/20 italic">Papers</em>
          </motion.span>
        </motion.h2>
      </div>

      <div className="flex flex-col">
        {PUBLICATIONS.map((pub, idx) => (
          <PublicationCard key={pub.id} pub={pub} isEven={idx % 2 === 0} />
        ))}
      </div>

      {/* Atmospheric accents */}
      <div
        className="absolute -left-1/4 top-1/3 w-px h-[70vh] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full pointer-events-none blur-[200px] opacity-[0.025]"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
        aria-hidden
      />
    </section>
  );
}
