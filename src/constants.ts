import type { ReadingMode, ReadingModeInfo } from './types';

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
