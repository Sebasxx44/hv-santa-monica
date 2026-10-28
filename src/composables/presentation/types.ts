// — Preferencias y reproducción —
export type PresentationIntent = 'auto' | 'play' | 'pause';

export interface PresentationPlayback {
  visible: boolean;
  pageVisible: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  ended: boolean;
  intent: PresentationIntent;
}

export interface PresentationConnection extends EventTarget {
  readonly saveData?: boolean;
}

export type PresentationNavigator = Navigator & {
  readonly connection?: PresentationConnection;
};

export type PresentationCleanup = () => void;
