// ---- Styled Components (backward compatible, primary API) ----

export { Canopy, Mycelium, Understory } from "./components";
export { ProgressiveDepthProvider } from "./components/ProgressiveDepthProvider";
export { ReadingModeToggle } from "./components/ReadingModeToggle";
// ---- Constants ----
export {
  DEFAULT_MODE_LABELS,
  DEFAULT_VISIBILITY_MAP,
  LAYER_ORDER,
  MODE_ORDER,
  PHI,
} from "./core/constants";
export { useLayerVisibility } from "./core/hooks/useLayerVisibility";
export { usePersistence } from "./core/hooks/usePersistence";
// ---- Core Hooks ----
export { useProgressiveDepth } from "./core/hooks/useProgressiveDepth";
export { useToggle } from "./core/hooks/useToggle";
// ---- Types ----
export type {
  LayerName,
  LayerPrimitiveProps,
  LayerProps,
  LayerVisibilityState,
  ProgressiveDepthContextValue,
  ProgressiveDepthProviderProps,
  ProviderPrimitiveProps,
  ReadingMode,
  ReadingModeInfo,
  ReadingModeToggleProps,
  RootPrimitiveProps,
  TogglePrimitiveProps,
  UsePersistenceOptions,
  UseToggleOptions,
  UseToggleReturn,
  VisibilityMap,
} from "./core/types";
// ---- Core Utilities ----
export { isLayerVisible, resolveLayerVisibility } from "./core/visibility";
export { Layer } from "./primitives/Layer";
// ---- Primitives (for custom builds) ----
export { Provider } from "./primitives/Provider";
export { Root } from "./primitives/Root";
export { Toggle } from "./primitives/Toggle";
