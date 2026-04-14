import { useEffect, useRef, useCallback } from 'react';
import { useCursorStore } from '@/stores/cursorStore';

/**
 * Utility to generate soothing synthesized audio natively in the browser.
 * Inspired by competitive FPS (like Valorant) UX sounds: hollow, exact, synthetic.
 */
class Synthesizer {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.15; // Set volume slightly lower for ambiance
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  // Soft, rising sine wave for hover
  playHover() {
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Deep, resonant "pop" / click
  playClick() {
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Granular scrolling air noise
  playScroll() {
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const bufferSize = this.ctx.sampleRate * 0.1; // 100ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }
}

const synth = new Synthesizer();

export function useInteractionSounds() {
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const clickProcessed = useRef(false);

  // Initialize synth directly on first user interaction
  useEffect(() => {
    const initAudio = () => {
        synth.init();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('scroll', initAudio);
    };
    
    // We only attach briefly, then remove
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true, passive: true });

    return () => {
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
    }
  }, []);

  const playHover = useCallback(() => {
      synth.playHover();
  }, []);

  const playClick = useCallback(() => {
      if (!clickProcessed.current) {
          synth.playClick();
          clickProcessed.current = true;
          setTimeout(() => { clickProcessed.current = false; }, 50);
      }
  }, []);

  const playScroll = useCallback(() => {
      if (scrollTimeout.current) return;
      synth.playScroll();
      scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
      }, 150); // Ratelimit scroll noise to avoid overlapping chaos
  }, []);

  return {
      playHover,
      playClick,
      playScroll,
  };
}
