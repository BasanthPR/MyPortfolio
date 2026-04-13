'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import projectsData from '@/data/projects.json';

type Project = (typeof projectsData)[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setType } = useCursorStore();

  const handleEnter = () => {
    setType('view');
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setType('default');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className="project-card relative flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[55vw] h-full rounded-lg overflow-hidden border bg-[var(--carbon)] cursor-pointer select-none carbon-texture"
      style={{ borderColor: 'rgba(242,237,232,0.05)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: `radial-gradient(ellipse at 40% 60%, ${project.accent} 0%, transparent 70%)`,
        }}
      />

      {project.video && (
        <motion.div
          className="absolute inset-0 z-10 filter grayscale mix-blend-luminosity opacity-40 hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
        >
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] via-transparent to-transparent pointer-events-none" />
        </motion.div>
      )}

      {/* Telemetry Overlay — replaced with minimal project tag */}
      <div 
        className="absolute top-6 left-6 z-20 flex flex-col gap-1 px-3 py-2 border pointer-events-none"
        style={{ 
          fontFamily: 'var(--font-jetbrains-mono)', 
          background: 'rgba(5,5,10,0.75)', 
          borderColor: 'rgba(242,237,232,0.08)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="flex gap-3 items-center">
          <span className="text-[9px] tracking-[0.2em] text-white/20">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-[9px] tracking-[0.15em] uppercase truncate max-w-[140px]" style={{ color: 'rgba(242,237,232,0.5)' }}>◆ {project.title}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-[8px] text-white/20">Stack ·</span>
          <span className="text-[8px] tracking-wide" style={{ color: 'rgba(0,212,255,0.6)' }}>{project.tech.slice(0, 3).join(' / ')}</span>
        </div>
      </div>

      <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-12 pointer-events-none">
        
        <h3
          className="font-normal leading-none mb-4 tracking-tight"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            color: 'var(--ivory)',
          }}
        >
          {project.title}
        </h3>
        
        <p
          className="text-sm leading-relaxed mb-8 max-w-md"
          style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(242,237,232,0.5)' }}
        >
          {project.description}
        </p>

        <div className="flex gap-4 pointer-events-auto">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 rounded border text-[10px] transition-all duration-300 hover:bg-white/5"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                letterSpacing: '0.15em',
                borderColor: `${project.accent}40`,
                color: project.accent,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              LIVE DEPLOY
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded border text-[10px] transition-all duration-300 hover:bg-white/5"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                letterSpacing: '0.15em',
                borderColor: 'rgba(242,237,232,0.15)',
                color: 'rgba(242,237,232,0.4)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              REPO ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  useEffect(() => {
    let ctx: { revert?: () => void } = {};

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const cardCount = projectsData.length;
      const cardWidth = window.innerWidth <= 768 ? 0.85 : 0.55;
      const totalScroll = cardCount * cardWidth * window.innerWidth - window.innerWidth + 120;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    };

    initGSAP();

    return () => {
      ctx.revert?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-[var(--void)]"
      style={{ height: '100vh' }}
      aria-label="Projects"
    >
      <div ref={headerRef} className="absolute top-10 left-8 md:left-16 z-30 pointer-events-none">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.25)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Work
        </motion.p>
        <motion.h2
          className="font-normal leading-none"
          style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ivory)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Shipped
        </motion.h2>
      </div>

      <motion.div
        className="absolute bottom-10 right-8 md:right-16 z-30 flex items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'var(--fog)' }}>
          Scroll track
        </span>
        <motion.span style={{ color: 'var(--blood)' }} animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          →
        </motion.span>
      </motion.div>

      <div ref={trackRef} className="absolute top-0 left-0 flex items-center h-full gap-6 px-16 md:px-24" style={{ willChange: 'transform' }}>
        <div className="flex-shrink-0 w-4 md:w-8" />
        {projectsData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        <div className="flex-shrink-0 w-4 md:w-8" />
      </div>
    </section>
  );
}
