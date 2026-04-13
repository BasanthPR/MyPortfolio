import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MusicStore {
  isPlaying: boolean;
  hasUserConsented: boolean;
  volume: number;
  activeSection: string;
  setPlaying: (playing: boolean) => void;
  setConsent: (consented: boolean) => void;
  setVolume: (volume: number) => void;
  setActiveSection: (section: string) => void;
}

export const useMusicStore = create<MusicStore>()(
  persist(
    (set) => ({
      isPlaying: false,
      hasUserConsented: false,
      volume: 0.4,
      activeSection: 'hero',
      setPlaying: (isPlaying) => set({ isPlaying }),
      setConsent: (hasUserConsented) => set({ hasUserConsented }),
      setVolume: (volume) => set({ volume }),
      setActiveSection: (activeSection) => set({ activeSection }),
    }),
    {
      name: 'music-preferences',
      partialize: (state) => ({
        hasUserConsented: state.hasUserConsented,
        volume: state.volume,
      }),
    }
  )
);
