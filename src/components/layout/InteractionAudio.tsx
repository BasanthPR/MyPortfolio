'use client';

import { useEffect, useRef } from 'react';
import { useInteractionSounds } from '@/hooks/useInteractionSounds';
import { useCursorStore } from '@/stores/cursorStore';
import { useIsTouch } from '@/hooks/useMediaQuery';

export default function InteractionAudio() {
  const { playHover, playClick, playScroll } = useInteractionSounds();
  const { type } = useCursorStore();
  const isTouch = useIsTouch();
  const prevType = useRef(type);

  // Hover sound logic based on cursor store changes
  useEffect(() => {
    if (isTouch) return;
    if (type !== 'default' && prevType.current === 'default') {
      playHover();
    }
    prevType.current = type;
  }, [type, playHover, isTouch]);

  // Click & Scroll event delegation
  useEffect(() => {
    if (isTouch) return;

    const handleClickWrapper = (e: MouseEvent) => {
      // Small optimization: only play click if the user is clicking on an interactive element
      // or we can play it generically everywhere for that tech feel.
      playClick();
    };

    const handleScroll = () => {
      playScroll();
    };

    window.addEventListener('click', handleClickWrapper, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('click', handleClickWrapper);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [playClick, playScroll, isTouch]);

  return null;
}
