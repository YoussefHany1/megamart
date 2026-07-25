import { create } from "zustand";

type MarkState = {
  showMark: boolean;
  setShowMark: (show: boolean) => void;
};

export const useMarkStore = create<MarkState>((set) => ({
  showMark: false,
  setShowMark: (show) => set({ showMark: show }),
}));
