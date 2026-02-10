// Components
export { ProgressiveDepthProvider } from './provider';
export { Canopy, Understory, Mycelium } from './layers';
export { ReadingModeToggle } from './toggle';

// Context and hooks
export { useProgressiveDepth } from './context';

// Constants
export { PHI, MODE_ORDER, DEFAULT_MODE_LABELS } from './constants';

// Types
export type {
  ReadingMode,
  ReadingModeInfo,
  ProgressiveDepthContextValue,
  LayerProps,
  ReadingModeToggleProps,
  ProgressiveDepthProviderProps,
} from './types';
