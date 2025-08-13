import { type ResumeData, sampleResume } from "@reactive-resume/schema";
import { create } from "zustand";

export type ArtboardStore = {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
  setMetadata: (metadata: ResumeData["metadata"]) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  resume: sampleResume,
  setResume: (resume) => {
    set({ resume });
  },
  setMetadata: (metadata) => {
    set((state) => ({
      resume: {
        ...state.resume,
        metadata: structuredClone(metadata),
      },
    }));
  },
}));
