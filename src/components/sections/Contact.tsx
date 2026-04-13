'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import socialData from '@/data/social.json';
import siteData from '@/data/site.json';
import { useCursorStore } from '@/stores/cursorStore';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: socialData.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    accent: '#ffffff',
  },
  {
    label: 'LinkedIn',
    href: socialData.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    accent: '#0A66C2',
  },
  {
    label: 'Twitter',
    href: socialData.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
    accent: '#ffffff',
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });
  const { setType } = useCursorStore();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  const headingWords = ["Let's", 'make', 'something'];

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(socialData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
      aria-label="Contact"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(193,18,31,0.05) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: bgY }}
        aria-hidden
      >
        <span
          className="text-[20vw] leading-none font-normal"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            color: 'rgba(242,237,232,0.018)',
            whiteSpace: 'nowrap',
          }}
        >
          Contact
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Section label */}
        <motion.p
          className="text-[10px] text-white/20 tracking-[0.5em] uppercase mb-12"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Get in touch
        </motion.p>

        {/* Headline */}
        <h2
          className="font-normal text-white leading-[0.9] tracking-tight mb-6"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(3.5rem, 10vw, 10rem)',
          }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block mr-[0.2em]">
              <motion.span
                className={`inline-block ${i === headingWords.length - 1 ? 'italic text-white/40' : ''}`}
                initial={{ y: '110%' }}
                animate={isInView ? { y: 0 } : { y: '110%' }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Subline */}
        <motion.p
          className="text-white/30 mb-16 max-w-md mx-auto leading-relaxed"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Have a project in mind? A collaboration idea? Or just want to say hi?
          <br />
          My inbox is always open.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton>
            <a
              href={`mailto:${socialData.email}`}
              className="group inline-flex items-center gap-4 px-10 py-5 border border-white/20 text-white/80 rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-500"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.875rem',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={() => setType('hover')}
              onMouseLeave={() => setType('default')}
            >
              <span>{socialData.email}</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
          </MagneticButton>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/[0.08] text-white/25 hover:border-white/15 hover:text-white/40 transition-all duration-300"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
            aria-label="Copy email address"
          >
            <motion.span
              key={copied ? 'copied' : 'copy'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? '✓ Copied' : 'Copy email'}
            </motion.span>
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="h-px flex-1 max-w-24 bg-white/[0.06]" />
          <span
            className="text-[9px] text-white/15 tracking-[0.4em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            Or find me on
          </span>
          <div className="h-px flex-1 max-w-24 bg-white/[0.06]" />
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.93 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              onMouseEnter={() => setType('hover')}
              onMouseLeave={() => setType('default')}
              aria-label={link.label}
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <motion.span
                className="transition-colors duration-300"
                whileHover={{ color: link.accent }}
              >
                {link.icon}
              </motion.span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase group-hover:text-white/55 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                {link.label}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
                ↗
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Availability badge */}
        <motion.div
          className="mt-16 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08]"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span
            className="text-[10px] text-emerald-400/70 tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {siteData.availability}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
