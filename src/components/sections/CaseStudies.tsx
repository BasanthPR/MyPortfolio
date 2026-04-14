'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';

interface CaseStudyEntry {
  id: string;
  title: string;
  description: string;
  tag: string;
  slug: string | null;
  linkedinUrl: string | null;
  accent: string;
  index: number;
  imageLabel: string;
}

const CASE_STUDIES: CaseStudyEntry[] = [
  {
    id: '1',
    title: 'F1 Race Winner Prediction System: The Triple Ensemble Approach',
    description:
      'Modeling the 2026 ground-effect era using XGBoost, Bayesian Inference, and lap-by-lap Monte Carlo simulations—achieving a 38.9% prediction accuracy for the Australian GP.',
    tag: 'AI/ML',
    slug: 'f1-predictor',
    linkedinUrl: null,
    accent: '#C1121F',
    index: 0,
    imageLabel: 'XGBoost',
  },
  {
    id: '2',
    title: 'The Multilingual Deficit: Tokenization Inequality in LLMs',
    description:
      'A deep dive into why non-English scripts pay a 3-5x \'Token Tax\' and how byte-level BPE failures creates structural disadvantage for world languages.',
    tag: 'Research',
    slug: 'llm-multilingual',
    linkedinUrl: null,
    accent: '#00D4FF',
    index: 1,
    imageLabel: 'NLP',
  },
  {
    id: '3',
    title: 'Designing for Emotion: The Luminary System',
    description:
      'How a mood-adaptive music player transformed engagement by 340% through real-time facial micro-expression analysis via TensorFlow.js.',
    tag: 'UX Design',
    slug: 'luminary',
    linkedinUrl: null,
    accent: '#E8593C',
    index: 2,
    imageLabel: 'AI/UX',
  },
  {
    id: '4',
    title: 'Data as Art: Cartograph Visuals',
    description:
      'Turning raw CSV datasets into cinematic 3D narratives. Applying Three.js and D3 to make data not just functional, but beautiful.',
    tag: 'Visual',
    slug: 'cartograph',
    linkedinUrl: null,
    accent: '#3B8BD4',
    index: 3,
    imageLabel: '3D/GL',
  },
];

function CaseStudyCard({ study }: { study: CaseStudyEntry }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8% 0px' });
  const { setType } = useCursorStore();

  const isExternal = study.linkedinUrl !== null;
  const href = isExternal ? study.linkedinUrl! : `/case-study/${study.slug}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group grid md:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/12 transition-all duration-500 min-h-[280px] md:min-h-[320px]"
        onMouseEnter={() => setType(isExternal ? 'hover' : 'view')}
        onMouseLeave={() => setType('default')}
        aria-label={study.title}
      >
        {/* Left — visual panel */}
        <div
          className="relative hidden md:flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${study.accent}20 0%, ${study.accent}08 60%, #111113 100%)`,
          }}
        >
          {/* Large index number */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden
          >
            <span
              className="text-[7rem] font-normal leading-none transition-transform duration-700 group-hover:scale-110"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                color: `${study.accent}15`,
              }}
            >
              {String(study.index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Color wash hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `${study.accent}10` }}
          />

          {/* Image label badge */}
          <div className="absolute bottom-5 left-5 z-10">
            <span
              className="text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                borderColor: `${study.accent}30`,
                color: `${study.accent}70`,
                background: `${study.accent}10`,
              }}
            >
              {study.imageLabel}
            </span>
          </div>
        </div>

        {/* Right — content panel */}
        <div className="relative flex flex-col justify-between p-8 md:p-10 bg-[#0e0e10]/60 backdrop-blur-md">
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                background: isExternal ? '#0A66C220' : `${study.accent}15`,
                color: isExternal ? '#0A66C2' : `${study.accent}80`,
                border: `1px solid ${isExternal ? '#0A66C230' : `${study.accent}25`}`,
              }}
            >
              {study.tag}
            </span>
            <motion.span
              className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              style={{ color: `${study.accent}60` }}
            >
              {isExternal ? '↗' : '→'}
            </motion.span>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h3
              className="text-white font-normal leading-tight mb-4"
              style={{
                fontFamily: 'var(--font-instrument-serif)',
                fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
              }}
            >
              {study.title}
            </h3>
            <p
              className="text-white/35 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {study.description}
            </p>
          </div>

          {/* Bottom — CTA */}
          <div className="mt-8 flex items-center gap-2">
            <div className="w-6 h-px" style={{ background: `${study.accent}40` }} />
            <span
              className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                color: `${study.accent}50`,
              }}
            >
              {isExternal ? 'Read on LinkedIn' : 'Read case study'}
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  return (
    <section
      ref={ref}
      id="case-studies"
      className="relative py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto"
      aria-label="Case Studies"
    >
      {/* Section header */}
      <div className="mb-16">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.25)' }}
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Case Studies
        </motion.p>
        <motion.h2
          className="font-normal text-white leading-none"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.6rem, 5vw, 5.5rem)',
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Deep{' '}
          <em className="text-white/40">dives</em>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
        {CASE_STUDIES.map((study, i) => (
          <CaseStudyCard 
            key={study.id} 
            study={study} 
            index={i} 
            total={CASE_STUDIES.length}
          />
        ))}
      </div>

      {/* Background accent */}
      <div
        className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-[0.04]"
        style={{ background: '#3B8BD4' }}
        aria-hidden
      />
    </section>
  );
}
