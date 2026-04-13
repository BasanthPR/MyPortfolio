'use client';

import { motion } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import siteData from '@/data/site.json';
import socialData from '@/data/social.json';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: socialData.github },
  { label: 'LinkedIn', href: socialData.linkedin },
  { label: 'Twitter', href: socialData.twitter },
];

const NAV_SECTIONS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Media', href: '#media' },
  { label: 'Library', href: '#library' },
  { label: 'Quotes', href: '#quotes' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { setType } = useCursorStore();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.05] overflow-hidden" aria-label="Footer">
      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none blur-[80px] opacity-[0.06]"
        style={{ background: '#E8593C' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top row: monogram + nav links */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
          {/* Left — brand */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="block group"
              onMouseEnter={() => setType('hover')}
              onMouseLeave={() => setType('default')}
              aria-label="Back to top"
            >
              <motion.span
                className="text-[80px] leading-none font-normal text-white/80 group-hover:text-white transition-colors duration-500"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
                whileHover={{ letterSpacing: '0.05em' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {siteData.initials}
              </motion.span>
            </a>
            <p
              className="text-white/25 text-xs mt-3 max-w-[180px] leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {siteData.shortBio}
            </p>
          </div>

          {/* Right — two-column nav */}
          <div className="flex gap-16 md:gap-24">
            {/* Site sections */}
            <nav aria-label="Footer navigation">
              <p
                className="text-[9px] text-white/20 tracking-[0.4em] uppercase mb-5"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                Sections
              </p>
              <ul className="space-y-3">
                {NAV_SECTIONS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '13px',
                      }}
                      onMouseEnter={() => setType('hover')}
                      onMouseLeave={() => setType('default')}
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#E8593C] transition-all duration-300 inline-block" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <nav aria-label="Social links">
              <p
                className="text-[9px] text-white/20 tracking-[0.4em] uppercase mb-5"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                Online
              </p>
              <ul className="space-y-3">
                {SOCIAL_LINKS.filter((l) => l.href).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '13px',
                      }}
                      onMouseEnter={() => setType('hover')}
                      onMouseLeave={() => setType('default')}
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#E8593C] transition-all duration-300 inline-block" />
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-white/30">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-white/20"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            © {year}{' '}
            <span className="text-white/35">{siteData.name}</span>.
            {' '}Crafted with obsessive attention to detail.
          </p>

          <div className="flex items-center gap-6">
            <p
              className="text-[10px] text-white/15 tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {siteData.location}
            </p>
            <div className="w-px h-4 bg-white/10" />
            <a
              href={`mailto:${socialData.email}`}
              className="text-[10px] text-white/20 hover:text-white/40 transition-colors duration-300 tracking-wide"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {socialData.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
