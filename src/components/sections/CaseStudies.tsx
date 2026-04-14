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
  pdfUrl?: string | null;
  accent: string;
  index: number;
  imageLabel: string;
}

const CASE_STUDIES: CaseStudyEntry[] = [
  {
    id: '1',
    title: 'F1 Race Winner Prediction System: The Triple Ensemble Approach',
    description:
      'Modeling the 2026 ground-effect era using XGBoost, Bayesian Inference, and lap-by-lap Monte Carlo simulations—achieving a 38.9% prediction accuracy.',
    tag: 'AI/ML',
    slug: 'f1-predictor',
    linkedinUrl: null,
    pdfUrl: '/docs/2026_Japanese_GP_Prediction_Report.pdf',
    accent: '#C1121F',
    index: 0,
    imageLabel: 'XGBoost',
  },
  {
    id: '2',
    title: 'The Multilingual Deficit: Tokenization Inequality in LLMs',
    description:
      'A quantitative analysis of why non-English scripts pay a 3-5x \'Token Tax\' and how byte-level BPE failures creates structural disadvantage.',
    tag: 'Research',
    slug: 'llm-multilingual',
    linkedinUrl: null,
    pdfUrl: '/docs/How_LLMs_Process_Non_English_Languages.pdf',
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

function CaseStudyCard({ study, isEven }: { study: CaseStudyEntry; isEven: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });
  const { setType } = useCursorStore();

  const isExternal = study.linkedinUrl !== null;
  const href = isExternal ? study.linkedinUrl! : `/case-study/${study.slug}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "w-full flex mb-24 md:mb-40",
        isEven ? "justify-start" : "justify-end"
      )}
    >
      <div className="w-full md:max-w-4xl group">
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.04] bg-[#0A0A0B]/40 backdrop-blur-3xl hover:border-white/10 transition-all duration-700">
          <div className="grid md:grid-cols-[1.5fr_2fr] min-h-[340px]">
            {/* Visual Panel */}
            <div
              className="relative hidden md:flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${study.accent}15 0%, transparent 60%)`,
              }}
            >
              {/* Massive index number */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden
              >
                <span
                  className="text-[12rem] font-normal leading-none opacity-5 transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-instrument-serif)',
                    color: study.accent,
                  }}
                >
                  {String(study.index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Tag overlay */}
              <div className="absolute top-10 left-10">
                <span
                  className="text-[9px] tracking-[0.4em] uppercase"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)', color: `${study.accent}90` }}
                >
                  {study.imageLabel}
                </span>
              </div>
              
              {/* Dynamic light streak */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 45%, ${study.accent}08 50%, transparent 55%)`,
                  backgroundSize: '200% 200%',
                }}
              />
            </div>

            {/* Content Panel */}
            <div className="flex flex-col justify-between p-10 md:p-14">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      background: `${study.accent}08`,
                      color: `${study.accent}CC`,
                      borderColor: `${study.accent}20`,
                    }}
                  >
                    {study.tag}
                  </span>
                </div>

                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => setType(isExternal ? 'hover' : 'view')}
                  onMouseLeave={() => setType('default')}
                  className="block"
                >
                  <h3
                    className="text-white font-normal leading-[1.1] mb-6 group-hover:text-white/90 transition-colors"
                    style={{
                      fontFamily: 'var(--font-instrument-serif)',
                      fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    }}
                  >
                    {study.title}
                  </h3>
                </a>

                <p
                  className="text-white/30 text-base leading-relaxed max-w-xl"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {study.description}
                </p>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                {/* CTA 1: Full Case Study */}
                <a
                  href={href}
                  className="flex items-center gap-3 py-2 border-b border-transparent hover:border-white/20 transition-all group/cta"
                  onMouseEnter={() => setType('view')}
                  onMouseLeave={() => setType('default')}
                >
                  <span
                    className="text-[11px] tracking-[0.2em] uppercase text-white/40 group-hover/cta:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                  >
                    {isExternal ? 'Read on LinkedIn' : 'Read Deep Dive'}
                  </span>
                  <span className="text-white/20 transition-transform group-hover/cta:translate-x-1">→</span>
                </a>

                {/* CTA 2: PDF Report (Conditional) */}
                {study.pdfUrl && (
                  <a
                    href={study.pdfUrl}
                    download
                    className="flex items-center gap-3 py-2 border-b border-transparent hover:border-white/20 transition-all group/pdf"
                    onMouseEnter={() => setType('hover')}
                    onMouseLeave={() => setType('default')}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover/pdf:opacity-100 transition-opacity">
                      <path d="M7 9.5L7 1.5M7 9.5L10 6.5M7 9.5L4 6.5M1.5 12.5L12.5 12.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span
                      className="text-[11px] tracking-[0.2em] uppercase text-white/40 group-hover/pdf:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      Technical Report
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

import clsx from 'clsx';

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  return (
    <section
      ref={ref}
      id="case-studies"
      className="relative py-32 md:py-56 px-6 md:px-12 max-w-7xl mx-auto z-10"
      aria-label="Case Studies"
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
          Research & Engineering
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
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Deep{' '}
            <em className="text-white/20 italic">dives</em>
          </motion.span>
        </motion.h2>
      </div>

      <div className="flex flex-col">
        {CASE_STUDIES.map((study, idx) => (
          <CaseStudyCard 
            key={study.id} 
            study={study} 
            isEven={idx % 2 === 0}
          />
        ))}
      </div>

      {/* Atmospheric Background Accents */}
      <div
        className="absolute -right-1/4 top-1/4 w-px h-[80vh] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none blur-[180px] opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #E8593C 0%, transparent 70%)' }}
        aria-hidden
      />
    </section>
  );
}
