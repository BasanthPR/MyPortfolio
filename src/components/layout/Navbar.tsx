'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import siteData from '@/data/site.json';

const NAV_LINKS = [
  { label: 'Work', href: '#projects', section: 'projects' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Library', href: '#library', section: 'library' },
  { label: 'Media', href: '#media', section: 'media' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setType } = useCursorStore();
  const { scrollY } = useScroll();

  // Show/hide nav on scroll direction
  useMotionValueEvent(scrollY, 'change', (current) => {
    const direction = current < lastScrollY ? 'up' : 'down';
    if (current < 80) {
      setIsVisible(false);
    } else if (direction === 'up') {
      setIsVisible(true);
    } else if (direction === 'down' && current > lastScrollY + 8) {
      setIsVisible(false);
    }
    setLastScrollY(current);
  });

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = ['hero', 'about', 'projects', 'case-studies', 'media', 'library', 'quotes', 'contact'];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -80, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-xl bg-[#0a0a0b]/70 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Monogram */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 transition-colors duration-300"
          onMouseEnter={() => setType('hover')}
          onMouseLeave={() => setType('default')}
          aria-label="Back to top"
        >
          <span
            className="text-sm text-white/80 font-normal tracking-wider"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            {siteData.initials}
          </span>
        </a>

        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* Nav links */}
        <ul className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 rounded-full text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 flex items-center"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={() => setType('hover')}
                  onMouseLeave={() => setType('default')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          className="flex sm:hidden items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 transition-colors duration-300 ml-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <motion.div
            className="flex flex-col gap-1.5 w-4"
            animate={mobileOpen ? 'open' : 'closed'}
          >
            <motion.span
              className="block h-px bg-white/60"
              variants={{
                open: { rotate: 45, y: 4, width: '100%' },
                closed: { rotate: 0, y: 0, width: '100%' },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px bg-white/60"
              variants={{
                open: { opacity: 0 },
                closed: { opacity: 1 },
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-white/60 w-3/4"
              variants={{
                open: { rotate: -45, y: -4, width: '100%' },
                closed: { rotate: 0, y: 0, width: '75%' },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl border border-white/[0.08] bg-[#0a0a0b]/95 backdrop-blur-xl p-4 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:hidden"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                    style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px' }}
                  >
                    {link.label}
                    <span className="text-xs">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
