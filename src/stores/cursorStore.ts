import { create } from 'zustand';
import { CursorType } from '@/types';

interface CursorStore {
  type: CursorType;
  x: number;
  y: number;
  isVisible: boolean;
  setType: (type: CursorType) => void;
  setPosition: (x: number, y: number) => void;
  setVisible: (visible: boolean) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  type: 'default',
  x: 0,
  y: 0,
  isVisible: false,
  setType: (type) => set({ type }),
  setPosition: (x, y) => set({ x, y }),
  setVisible: (isVisible) => set({ isVisible }),
}));
