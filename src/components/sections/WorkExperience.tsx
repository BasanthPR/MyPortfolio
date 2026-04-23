'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import Image from 'next/image';
import experienceData from '@/data/experience.json';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  impact: string;
  description: string;
  tech: string[];
  accent: string;
  type: string;
  logo: string;
}

const experiences = experienceData as Experience[];

function ExperienceNode({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-20% 0px' });
  const { setType } = useCursorStore();

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col md:flex-row items-stretch gap-8 md:gap-16 w-full group py-8 md:py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Editorial Background Watermark ── */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-1000"
        style={{ fontFamily: 'var(--font-instrument-serif)' }}
      >
        <span className="text-[20vw] font-black leading-none whitespace-nowrap">
          {exp.period.split('–').pop()?.trim() || exp.company}
        </span>
      </div>

      {/* ── Left Side: Connected Anchor ── */}
      <div className="relative shrink-0 w-full md:w-48 flex md:flex-col items-center md:items-end md:text-right gap-4 md:gap-8 z-10">
        
        {/* Optic connecting line (Vertical desktop, horizontal mobile) */}
        <div className="hidden md:block absolute top-[4.5rem] bottom-[-4rem] right-7 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
        
        <div className="flex md:flex-col items-center md:items-end w-full gap-4 md:gap-0">
          <div className="flex-1 md:flex-none">
            <span className="block text-sm tracking-[0.2em] uppercase text-white/40 mb-1 font-mono">
              {exp.period}
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#F2EDE8]/80 font-mono">
              {exp.duration}
            </span>
          </div>

          {/* DNEG Anchor Node */}
          <div 
            className="w-14 h-14 rounded-full border border-white/10 bg-[#05050A]/80 backdrop-blur-md flex items-center justify-center relative overflow-hidden group-hover:border-white/30 transition-all duration-700 md:mt-4 shadow-[0_0_30px_rgba(255,255,255,0)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            onMouseEnter={() => setType('view')}
            onMouseLeave={() => setType('default')}
          >
            {exp.logo && exp.logo.includes('placeholder') ? (
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors duration-500" />
            ) : (
              <Image 
                src={exp.logo} 
                alt={`${exp.company} logo`} 
                width={28} 
                height={28} 
                className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Right Side: Editorial Chronicle Frame ── */}
      <div className="relative flex-1 bg-transparent z-10 md:pt-4">
        <h3 className="text-3xl md:text-5xl font-normal tracking-tight text-[#F2EDE8] mb-2" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          {exp.company}
        </h3>
        
        <p className="text-sm md:text-md uppercase tracking-widest text-white/50 font-sans mb-8">
          {exp.role} <span className="mx-2 text-white/20">|</span> <span style={{ color: exp.accent }}>{exp.type}</span>
        </p>

        {/* Cinematography split layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12">
          <div className="xl:col-span-8">
            <p className="text-base md:text-lg leading-relaxed text-white/70 font-sans font-light">
              {exp.description}
            </p>
            
            {exp.impact && (
              <div className="mt-8 pl-6 border-l pointer-events-none transition-colors duration-500" style={{ borderColor: `${exp.accent}40` }}>
                <p className="text-sm md:text-base italic text-white/80 font-serif leading-relaxed">
                  "{exp.impact}"
                </p>
              </div>
            )}
          </div>

          <div className="xl:col-span-4 flex flex-wrap xl:flex-col gap-2 xl:gap-3 justify-start xl:items-start content-start">
            {exp.tech.map(t => (
              <span key={t} className="text-[11px] tracking-widest uppercase px-3 py-1.5 border border-white/10 text-white/40 group-hover:text-white/70 group-hover:border-white/20 transition-all duration-500 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkExperience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="experience" className="relative w-full py-24 md:py-40 bg-transparent overflow-hidden">
      
      {/* Massive Vertical Chronicle Text (Parallax) */}
      <motion.div 
        className="absolute top-0 right-0 h-full w-full pointer-events-none overflow-hidden opacity-[0.03] select-none flex items-center justify-end"
        style={{ y, fontFamily: 'var(--font-instrument-serif)' }}
      >
        <div style={{ writingMode: 'vertical-rl' }} className="text-[15vw] font-black uppercase tracking-tighter whitespace-nowrap">
          Film Chronicle
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-24 md:mb-40 flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
          <motion.p
            className="text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.55)' }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Chronicle
          </motion.p>
          <motion.h2 
            className="font-normal leading-[1.0] tracking-tight"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              color: '#F2EDE8', 
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(2.6rem, 5vw, 5.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
             Selected <i className="text-white/50">Experience</i>
          </motion.h2>
          <motion.div 
            className="w-px h-16 md:h-24 bg-gradient-to-b from-white/20 to-transparent mt-8"
            initial={{ height: 0 }}
            whileInView={{ height: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Dynamic Timeline Layout */}
        <div className="relative">
          {experiences.map((exp, i) => (
            <ExperienceNode key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
