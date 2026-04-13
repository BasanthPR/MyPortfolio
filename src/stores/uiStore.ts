import { create } from 'zustand';

interface UIStore {
  isLoading: boolean;
  activeSection: string;
  isNavVisible: boolean;
  setLoading: (loading: boolean) => void;
  setActiveSection: (section: string) => void;
  setNavVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: true,
  activeSection: 'hero',
  isNavVisible: false,
  setLoading: (isLoading) => set({ isLoading }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setNavVisible: (isNavVisible) => set({ isNavVisible }),
}));
