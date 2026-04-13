'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useMusicStore } from '@/stores/musicStore';

// Section → audio track mapping
const SECTION_TRACKS: Record<string, string> = {
  hero: '/audio/hero-ambient.mp3',
  about: '/audio/hero-ambient.mp3',
  projects: '/audio/projects-electronic.mp3',
  'case-studies': '/audio/casestudy-cinematic.mp3',
  media: '/audio/casestudy-cinematic.mp3',
  library: '/audio/books-lofi.mp3',
  quotes: '/audio/quotes-ambient.mp3',
  contact: '/audio/quotes-ambient.mp3',
};

type HowlInstance = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  fade: (from: number, to: number, duration: number) => void;
  volume: (v?: number) => number;
  playing: () => boolean;
  unload: () => void;
  on: (event: string, fn: () => void) => void;
};

let Howl: new (opts: Record<string, unknown>) => HowlInstance;
let howlsLoaded = false;

async function loadHowler(): Promise<void> {
  if (howlsLoaded) return;
  const mod = await import('howler');
  Howl = mod.Howl as unknown as new (opts: Record<string, unknown>) => HowlInstance;
  howlsLoaded = true;
}

export function useMusicPlayer() {
  const { isPlaying, hasUserConsented, volume, activeSection, setPlaying, setConsent } =
    useMusicStore();

  const currentHowlRef = useRef<HowlInstance | null>(null);
  const currentSectionRef = useRef<string>('');

  const fadeOut = useCallback((howl: HowlInstance, onDone?: () => void) => {
    if (!howl.playing()) {
      onDone?.();
      return;
    }
    howl.fade(howl.volume(), 0, 600);
    setTimeout(() => {
      howl.stop();
      onDone?.();
    }, 650);
  }, []);

  const playSectionTrack = useCallback(
    async (section: string) => {
      await loadHowler();
      const src = SECTION_TRACKS[section] ?? SECTION_TRACKS.hero;

      // Same section already playing — do nothing
      if (currentSectionRef.current === section && currentHowlRef.current?.playing()) return;

      const prev = currentHowlRef.current;

      const startNew = () => {
        const howl = new Howl({
          src: [src],
          loop: true,
          volume: 0,
          html5: true,
          onloaderror: () => {
            // Gracefully handle missing audio files
          },
        });
        howl.play();
        howl.fade(0, volume, 800);
        currentHowlRef.current = howl;
        currentSectionRef.current = section;
      };

      if (prev && prev.playing()) {
        fadeOut(prev, startNew);
      } else {
        startNew();
      }
    },
    [volume, fadeOut]
  );

  const stopAll = useCallback(() => {
    if (currentHowlRef.current) {
      fadeOut(currentHowlRef.current, () => {
        currentHowlRef.current?.unload();
        currentHowlRef.current = null;
        currentSectionRef.current = '';
      });
    }
  }, [fadeOut]);

  // React to play state changes
  useEffect(() => {
    if (!hasUserConsented) return;
    if (isPlaying) {
      playSectionTrack(activeSection);
    } else {
      stopAll();
    }
  }, [isPlaying, hasUserConsented, activeSection, playSectionTrack, stopAll]);

  // React to volume changes
  useEffect(() => {
    if (currentHowlRef.current?.playing()) {
      currentHowlRef.current.volume(volume);
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      currentHowlRef.current?.unload();
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!hasUserConsented) {
      setConsent(true);
      setPlaying(true);
      return;
    }
    setPlaying(!isPlaying);
  }, [hasUserConsented, isPlaying, setConsent, setPlaying]);

  return { togglePlay, isPlaying, hasUserConsented };
}
