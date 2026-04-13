'use client';

import { useEffect } from 'react';
import { useMusicStore } from '@/stores/musicStore';

const SECTION_IDS = [
  'hero',
  'about',
  'projects',
  'case-studies',
  'media',
  'library',
  'quotes',
  'contact',
];

/**
 * Invisible component that tracks which section is in the viewport
 * and updates the music store so Howler can crossfade to the right track.
 */
export default function SectionMusicSync() {
  const { setActiveSection } = useMusicStore();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [setActiveSection]);

  return null;
}
