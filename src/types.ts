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

/**
 * Context value for the progressive depth provider.
 */
export interface ProgressiveDepthContextValue {
  mode: ReadingMode;
  setMode: (mode: ReadingMode) => void;
}

/**
 * Props for layer components.
 */
export interface LayerProps {
  children: React.ReactNode;
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
  children: React.ReactNode;
  defaultMode?: ReadingMode;
  showToggle?: boolean;
  toggleClassName?: string;
  toggleLabels?: Partial<Record<ReadingMode, ReadingModeInfo>>;
}
