'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useCursorStore } from '@/stores/cursorStore';

interface MetricCardProps {
  label: string;
  value: string;
  accent: string;
}

export function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <div
      className="p-6 rounded-2xl border"
      style={{ background: `${accent}08`, borderColor: `${accent}20` }}
    >
      <p
        className="text-[9px] tracking-[0.4em] uppercase mb-3"
        style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${accent}80` }}
      >
        {label}
      </p>
      <p
        className="font-normal leading-none"
        style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          color: accent,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export function SectionHeading({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2
      className="font-normal leading-tight mb-8"
      style={{
        fontFamily: 'var(--font-instrument-serif)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#F2EDE8',
      }}
    >
      {children}
    </h2>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-normal leading-tight mb-4 text-white/80"
      style={{
        fontFamily: 'var(--font-instrument-serif)',
        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
      }}
    >
      {children}
    </h3>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-white/50 leading-relaxed mb-6"
      style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px' }}
    >
      {children}
    </p>
  );
}

export function PullQuote({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <blockquote
      className="my-12 pl-8 border-l-2"
      style={{ borderColor: accent }}
    >
      <p
        className="font-normal italic leading-relaxed"
        style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
          color: `${accent}CC`,
        }}
      >
        {children}
      </p>
    </blockquote>
  );
}

export function DataTable({
  headers,
  rows,
  caption,
  accent,
}: {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
  accent: string;
}) {
  return (
    <div className="my-10 overflow-x-auto">
      {caption && (
        <p
          className="text-[9px] tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(255,255,255,0.25)' }}
        >
          {caption}
        </p>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ borderBottom: `1px solid ${accent}20` }}>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-3 pr-6 text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${accent}80` }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="py-3 pr-6 text-sm text-white/50"
                  style={{ fontFamily: j === 0 ? 'var(--font-jetbrains-mono)' : 'var(--font-dm-sans)' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DiagramBox({
  label,
  sublabel,
  accent,
  size = 'md',
  highlight = false,
}: {
  label: string;
  sublabel?: string;
  accent: string;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
}) {
  const padding = size === 'sm' ? 'px-3 py-2' : size === 'lg' ? 'px-6 py-4' : 'px-4 py-3';
  return (
    <div
      className={`${padding} rounded-xl border text-center`}
      style={{
        background: highlight ? `${accent}15` : `${accent}06`,
        borderColor: highlight ? `${accent}50` : `${accent}20`,
      }}
    >
      <p
        className="text-xs leading-tight font-medium"
        style={{ fontFamily: 'var(--font-jetbrains-mono)', color: highlight ? accent : `${accent}CC` }}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className="text-[9px] mt-1 opacity-60"
          style={{ fontFamily: 'var(--font-dm-sans)', color: `${accent}90` }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}

export function Arrow({ vertical = false, accent }: { vertical?: boolean; accent: string }) {
  if (vertical) {
    return (
      <div className="flex justify-center my-1">
        <svg width="2" height="20" viewBox="0 0 2 20">
          <line x1="1" y1="0" x2="1" y2="16" stroke={`${accent}50`} strokeWidth="1.5" />
          <polygon points="1,20 -2,14 4,14" fill={`${accent}50`} />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center mx-1">
      <svg width="20" height="2" viewBox="0 0 20 2">
        <line x1="0" y1="1" x2="16" y2="1" stroke={`${accent}50`} strokeWidth="1.5" />
        <polygon points="20,1 14,-2 14,4" fill={`${accent}50`} />
      </svg>
    </div>
  );
}

export function SectionDivider({ accent }: { accent: string }) {
  return (
    <div className="my-20 flex items-center gap-6">
      <div className="h-px flex-1 bg-white/[0.05]" />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${accent}50` }} />
      <div className="h-px flex-1 bg-white/[0.05]" />
    </div>
  );
}

interface PublicationLayoutProps {
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  year: number;
  tag: string;
  accent: string;
  pdfUrl?: string | null;
  externalUrl?: string | null;
  doi?: string | null;
  children: React.ReactNode;
}

export default function PublicationLayout({
  title,
  authors,
  venue,
  venueShort,
  year,
  tag,
  accent,
  pdfUrl,
  externalUrl,
  doi,
  children,
}: PublicationLayoutProps) {
  const { setType } = useCursorStore();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrollPct(Math.round(v * 100)));
    return unsub;
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen" style={{ background: '#05050A' }}>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ scaleX, background: accent }}
      />

      {/* Back nav */}
      <div className="fixed top-6 left-6 z-40">
        <Link
          href="/#publications"
          className="flex items-center gap-2 group"
          onMouseEnter={() => setType('hover')}
          onMouseLeave={() => setType('default')}
        >
          <span className="text-white/20 group-hover:text-white/60 transition-colors text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            ← Research
          </span>
        </Link>
      </div>

      {/* Hero */}
      <div className="relative pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none blur-[120px] opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tag + venue */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span
              className="text-[8px] tracking-[0.35em] uppercase px-4 py-2 rounded-full border"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                background: `${accent}10`,
                color: `${accent}CC`,
                borderColor: `${accent}25`,
              }}
            >
              {tag}
            </span>
            <span
              className="text-[8px] tracking-[0.3em] uppercase text-white/20"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {venueShort} · {year}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-normal leading-[1.05] mb-8"
            style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              color: '#F2EDE8',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>

          {/* Authors */}
          <p
            className="text-white/30 text-sm leading-relaxed mb-3"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {authors}
          </p>
          <p
            className="text-white/15 text-xs tracking-wide"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {venue}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-10 border-t border-white/[0.05]">
            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-3 group/pdf"
                onMouseEnter={() => setType('hover')}
                onMouseLeave={() => setType('default')}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover/pdf:opacity-100 transition-opacity">
                  <path d="M7 9.5L7 1.5M7 9.5L10 6.5M7 9.5L4 6.5M1.5 12.5L12.5 12.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 group-hover/pdf:text-white transition-colors" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                  Download PDF
                </span>
              </a>
            )}
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group/ext"
                onMouseEnter={() => setType('hover')}
                onMouseLeave={() => setType('default')}
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 group-hover/ext:text-white transition-colors" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                  View on MDPI ↗
                </span>
              </a>
            )}
            {doi && (
              <span className="text-[10px] tracking-[0.15em] text-white/15" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                DOI: {doi}
              </span>
            )}
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/15" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              {scrollPct}% read
            </span>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.04] max-w-5xl mx-auto" />

      {/* Content */}
      <div className="px-6 md:px-12 max-w-5xl mx-auto py-20">
        {children}
      </div>

      {/* Footer nav */}
      <div className="px-6 md:px-12 max-w-5xl mx-auto pb-32 pt-10 border-t border-white/[0.04]">
        <Link
          href="/#publications"
          className="flex items-center gap-3 group w-fit"
          onMouseEnter={() => setType('hover')}
          onMouseLeave={() => setType('default')}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/25 group-hover:text-white/60 transition-colors" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            ← Back to all research
          </span>
        </Link>
      </div>
    </div>
  );
}
