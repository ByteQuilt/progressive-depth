// ---- Styled Components (backward compatible, primary API) ----
export { ProgressiveDepthProvider } from './components/ProgressiveDepthProvider';
export { Canopy, Understory, Mycelium } from './components';
export { ReadingModeToggle } from './components/ReadingModeToggle';

// ---- Core Hooks ----
export { useProgressiveDepth } from './core/hooks/useProgressiveDepth';
export { useLayerVisibility } from './core/hooks/useLayerVisibility';
export { useToggle } from './core/hooks/useToggle';
export { usePersistence } from './core/hooks/usePersistence';

// ---- Primitives (for custom builds) ----
export { Provider } from './primitives/Provider';
export { Root } from './primitives/Root';
export { Layer } from './primitives/Layer';
export { Toggle } from './primitives/Toggle';

// ---- Core Utilities ----
export { isLayerVisible, resolveLayerVisibility } from './core/visibility';

// ---- Constants ----
export {
  PHI,
  MODE_ORDER,
  LAYER_ORDER,
  DEFAULT_MODE_LABELS,
  DEFAULT_VISIBILITY_MAP,
} from './core/constants';

// ---- Types ----
export type {
  ReadingMode,
  ReadingModeInfo,
  LayerName,
  VisibilityMap,
  LayerVisibilityState,
  ProgressiveDepthContextValue,
  UseToggleReturn,
  UseToggleOptions,
  UsePersistenceOptions,
  LayerProps,
  LayerPrimitiveProps,
  ReadingModeToggleProps,
  ProgressiveDepthProviderProps,
  ProviderPrimitiveProps,
  TogglePrimitiveProps,
  RootPrimitiveProps,
} from './core/types';
