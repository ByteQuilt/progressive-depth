import type { ReactNode, HTMLAttributes } from 'react';

// ---- Mode Types ----

/**
 * Reading depth modes.
 *
 * - `canopy`: Show only the top-level claims (skim mode)
 * - `standard`: Show claims and context (read mode)
 * - `deep`: Show everything (deep dive mode)
 */
export type ReadingMode = 'canopy' | 'standard' | 'deep';

/**
 * Labels and descriptions for each reading mode.
 */
export interface ReadingModeInfo {
  label: string;
  description: string;
}

// ---- Visibility Types ----

/** The named content layers. */
export type LayerName = 'canopy' | 'understory' | 'mycelium';

/**
 * Maps each reading mode to the set of layers visible in that mode.
 * This is the core configuration that controls progressive disclosure behavior.
 */
export type VisibilityMap = Record<ReadingMode, LayerName[]>;

/**
 * Result of computing visibility for a single layer.
 * Contains everything needed to render, animate, or control the layer.
 */
export interface LayerVisibilityState {
  /** Whether the layer is currently visible. */
  isVisible: boolean;
  /** The current reading mode. */
  mode: ReadingMode;
  /** The layer name. */
  layer: LayerName;
  /** Data attributes to spread onto the layer element. */
  dataAttributes: {
    'data-pd-layer': LayerName;
    'data-pd-visible': boolean;
  };
  /** Accessibility attributes to spread onto the layer element. */
  ariaAttributes: {
    'aria-hidden': boolean;
  };
}

// ---- Context Types ----

/**
 * Context value for the progressive depth provider.
 */
export interface ProgressiveDepthContextValue {
  mode: ReadingMode;
  setMode: (mode: ReadingMode) => void;
}

// ---- Hook Return Types ----

/** Return value of useToggle hook. */
export interface UseToggleReturn {
  /** Current active mode. */
  mode: ReadingMode;
  /** Set active mode directly. */
  setMode: (mode: ReadingMode) => void;
  /** Advance to the next mode (wraps around). */
  nextMode: () => void;
  /** Go to the previous mode (wraps around). */
  previousMode: () => void;
  /** All available modes in order. */
  modes: ReadingMode[];
  /** Get accessible props for a specific mode button. */
  getModeProps: (targetMode: ReadingMode) => {
    role: 'radio';
    'aria-checked': boolean;
    'aria-label': string;
    'data-pd-mode': ReadingMode;
    'data-pd-active': boolean;
    onClick: () => void;
  };
  /** Get accessible props for the toggle container. */
  getToggleProps: () => {
    role: 'radiogroup';
    'aria-label': string;
  };
}

/** Options for useToggle hook. */
export interface UseToggleOptions {
  labels?: Partial<Record<ReadingMode, ReadingModeInfo>>;
}

/** Options for usePersistence hook. */
export interface UsePersistenceOptions {
  /** Storage key. Default: 'progressive-depth-mode' */
  storageKey?: string;
  /** Storage backend. Default: localStorage */
  storage?: Storage;
}

// ---- Primitive Component Props ----

/** Props for the headless Provider primitive. */
export interface ProviderPrimitiveProps {
  children: ReactNode;
  /** Initial/default reading mode. Default: 'deep' */
  defaultMode?: ReadingMode;
  /** Controlled mode (for external state management). */
  mode?: ReadingMode;
  /** Callback when mode changes. */
  onModeChange?: (mode: ReadingMode) => void;
  /** Custom visibility map. Overrides default visibility rules. */
  visibilityMap?: VisibilityMap;
}

/** Props for the headless Layer primitive. */
export interface LayerPrimitiveProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Which layer this is. Determines visibility based on current mode. */
  layer: LayerName;
  /**
   * Custom render function. Receives visibility state, returns JSX.
   * When provided, the primitive renders nothing itself -- the consumer
   * has full control over rendering.
   */
  render?: (state: LayerVisibilityState) => ReactNode;
  /** Render as a different element. Default: 'div' */
  as?: React.ElementType;
}

/** Props for the headless Toggle primitive. */
export interface TogglePrimitiveProps {
  /**
   * Children-as-function pattern. Receives the full toggle API.
   */
  children: (toggle: UseToggleReturn) => ReactNode;
  labels?: Partial<Record<ReadingMode, ReadingModeInfo>>;
}

/** Props for the Root primitive (wrapper div). */
export interface RootPrimitiveProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Render as a different element. Default: 'div' */
  as?: React.ElementType;
}

// ---- Styled Component Props (backward compatible) ----

/**
 * Props for layer components.
 */
export interface LayerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Props for the reading mode toggle.
 */
export interface ReadingModeToggleProps {
  className?: string;
  labels?: Partial<Record<ReadingMode, ReadingModeInfo>>;
}

/**
 * Props for the provider component.
 */
export interface ProgressiveDepthProviderProps {
  children: ReactNode;
  defaultMode?: ReadingMode;
  showToggle?: boolean;
  toggleClassName?: string;
  toggleLabels?: Partial<Record<ReadingMode, ReadingModeInfo>>;
  /** Custom visibility map. Overrides default visibility rules. */
  visibilityMap?: VisibilityMap;
  /** Callback when mode changes. */
  onModeChange?: (mode: ReadingMode) => void;
}
