import { useArtboardStore } from "@/preview/store/artboard";

export const colors = {
  background: useArtboardStore.getState().resume.metadata.theme.background,
  text: useArtboardStore.getState().resume.metadata.theme.text,
  primary: useArtboardStore.getState().resume.metadata.theme.primary,
  secondary:
    useArtboardStore.getState().resume.metadata.theme.secondary ??
    useArtboardStore.getState().resume.metadata.theme.primary,
};

export const sizes = {
  margin: useArtboardStore.getState().resume.metadata.page.margin,
  fontSize: useArtboardStore.getState().resume.metadata.typography.font.size,
  lineHeight: useArtboardStore.getState().resume.metadata.typography.lineHeight,
};
