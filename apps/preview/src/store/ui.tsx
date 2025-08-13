import { create } from "zustand";

type UIState = {
  activeTemplate: string | null;
  setActiveTemplate: (template: string | null) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTemplate: null,
  setActiveTemplate: (template) => {
    set({ activeTemplate: template });
  },
}));
