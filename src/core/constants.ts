import type { ReadingMode, ReadingModeInfo, VisibilityMap, LayerName } from './types';

/**
 * The golden ratio. Used as the proportional scaling factor
 * between content layers.
 */
export const PHI = 1.618;

/**
 * Reading modes in display order.
 */
export const MODE_ORDER: ReadingMode[] = ['canopy', 'standard', 'deep'];

/**
 * Content layers in display order.
 */
export const LAYER_ORDER: LayerName[] = ['canopy', 'understory', 'mycelium'];

/**
 * Default labels for the reading mode toggle.
 */
export const DEFAULT_MODE_LABELS: Record<ReadingMode, ReadingModeInfo> = {
  canopy: {
    label: 'Skim',
    description: 'Just the key points',
  },
  standard: {
    label: 'Read',
    description: 'Key points + context',
  },
  deep: {
    label: 'Deep Dive',
    description: 'The full picture',
  },
};

/**
 * Default visibility rules. Maps each reading mode to the layers
 * that should be visible in that mode.
 *
 * - canopy mode: only canopy layer visible
 * - standard mode: canopy + understory visible
 * - deep mode: all layers visible
 */
export const DEFAULT_VISIBILITY_MAP: VisibilityMap = {
  canopy: ['canopy'],
  standard: ['canopy', 'understory'],
  deep: ['canopy', 'understory', 'mycelium'],
};
