import type { PresentationPlayback } from '@/composables/presentation/types';

// — Reproducción voluntaria o automática según el contexto —
export const shouldPlayPresentation = (state: PresentationPlayback): boolean => {
  if (!state.visible || !state.pageVisible || state.ended || state.intent === 'pause') return false;
  if (state.intent === 'play') return true;
  return !state.reducedMotion && !state.saveData;
};
