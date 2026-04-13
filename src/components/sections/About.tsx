'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import siteData from '@/data/site.json';
import socialData from '@/data/social.json';

const SKILLS = [
  'Python', 'PyTorch', 'TensorFlow', 'Next.js', 'React',
  'WebGL', 'Framer Motion', 'Design Systems', 'AWS', 'SQL',
  'Figma', 'TypeScript',
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: socialData.github },
  { label: 'LinkedIn', href: socialData.linkedin },
  { label: 'Twitter', href: socialData.twitter },
];

const STATS = [
  { value: '3+', label: 'Years building' },
  { value: '10+', label: 'Projects shipped' },
  { value: '2', label: 'Domains: ML & Design' },
];

function PhotoColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35],
    ['inset(100% 0% 0% 0%)', 'inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
  );

  return (
    <div ref={ref} className="relative">
      {/* Subtle border frame */}
      <motion.div
        className="absolute -inset-4 rounded-2xl border z-0"
        style={{ borderColor: 'rgba(242,237,232,0.06)' }}
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[rgba(242,237,232,0.03)] z-10"
        style={{ clipPath }}
      >
        <motion.div className="absolute inset-0 w-full h-[116%] -top-[8%]" style={{ y }}>
          <Image
            src="/images/about-photo.jpg"
            alt={`${siteData.name} portrait`}
            fill
            className="object-cover object-top filter grayscale contrast-110"
            sizes="(max-width: 768px) 80vw, 420px"
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent opacity-60 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Floating status chip */}
      <motion.div
        className="absolute -bottom-4 -left-4 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-full border bg-[#05050A]/90 backdrop-blur-sm"
        style={{ borderColor: 'rgba(242,237,232,0.1)' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        <p
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.45)' }}
        >
          {siteData.availability}
        </p>
      </motion.div>
    </div>
  );
}

function SocialLink({ label, href, delay }: { label: string; href?: string; delay: number }) {
  const { setType } = useCursorStore();
  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 transition-colors duration-300"
      style={{ color: 'rgba(242,237,232,0.28)' }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setType('hover')}
      onMouseLeave={() => setType('default')}
    >
      <span className="text-xs tracking-[0.2em] uppercase group-hover:text-[var(--ivory)] transition-colors duration-300" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
        {label}
      </span>
      <span className="text-xs opacity-0 group-hover:opacity-100 group-hover:text-[var(--ivory)] -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
        ↗
      </span>
    </motion.a>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef as React.RefObject<Element>, { once: true, margin: '-10% 0px' });

  return (
    <section ref={sectionRef} id="about" className="relative py-36 md:py-48 bg-[var(--void)] overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-[200px] opacity-[0.04]"
        style={{ background: '#F2EDE8' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[5fr_7fr] gap-16 md:gap-28 lg:gap-36 items-start">

          {/* Left: Photo — sticky */}
          <div className="md:sticky md:top-28">
            <PhotoColumn />
          </div>

          {/* Right: Text */}
          <div ref={textRef} className="flex flex-col gap-10 pt-4 md:pt-16">

            {/* Section label */}
            <motion.p
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.25)' }}
              initial={{ opacity: 0, x: -12 }}
              animate={isTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              About
            </motion.p>

            {/* Heading */}
            <div className="overflow-hidden">
              <motion.h2
                className="font-normal leading-[1.0] tracking-tight"
                style={{
                  fontFamily: 'var(--font-instrument-serif)',
                  fontSize: 'clamp(2.6rem, 5vw, 5.5rem)',
                  color: 'var(--ivory)',
                  letterSpacing: '-0.02em',
                }}
                initial={{ y: '105%' }}
                animate={isTextInView ? { y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Who I am
              </motion.h2>
            </div>

            {/* Bio paragraph */}
            <motion.div
              className="pl-5 border-l"
              style={{ borderColor: 'rgba(242,237,232,0.12)' }}
              initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <p
                className="text-base md:text-lg max-w-lg leading-[1.75]"
                style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(242,237,232,0.52)' }}
              >
                I craft digital experiences that merge deep data analysis with high-end aesthetic design.
                The goal is never just to make something work — it&apos;s to make it feel alive, purposeful,
                and uniquely yours.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <span
                    className="text-2xl md:text-3xl font-normal leading-none"
                    style={{ fontFamily: 'var(--font-instrument-serif)', color: 'var(--ivory)' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase leading-tight"
                    style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.3)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Skills marquee */}
            <motion.div
              className="w-full overflow-hidden flex border-y py-3"
              style={{ borderColor: 'rgba(242,237,232,0.06)' }}
              initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="marquee-track gap-4">
                {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-4 border-r"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono)',
                      color: 'rgba(242,237,232,0.22)',
                      borderColor: 'rgba(242,237,232,0.07)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-8 mt-2">
              <motion.p
                className="text-[9px] tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.15)' }}
                initial={{ opacity: 0 }}
                animate={isTextInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Find me on
              </motion.p>
              {SOCIAL_LINKS.map((link, i) => (
                <SocialLink key={link.label} label={link.label} href={link.href} delay={1.1 + i * 0.07} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
