'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<unknown>(null);
  const pathname = usePathname();

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      scrollTo: (target: string | number | HTMLElement, opts?: { duration?: number; easing?: (t: number) => number }) => void;
      destroy: () => void;
    } | null = null;

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      const handleAnchorClick = (e: Event) => {
        const target = e.target as HTMLAnchorElement;
        const href = target.closest('a')?.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const id = href.slice(1);
          const element = document.getElementById(id);
          if (element && lenis) {
            lenis.scrollTo(element, { duration: 1.2 });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);

      let rafId: number;
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener('click', handleAnchorClick);
        lenis?.destroy();
      };
    };

    const cleanup = initLenis();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [pathname]);

  return <>{children}</>;
}
