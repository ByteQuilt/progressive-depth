import type { ReadingMode, LayerName, VisibilityMap, LayerVisibilityState } from './types';
import { DEFAULT_VISIBILITY_MAP } from './constants';

/**
 * Determines if a layer is visible in a given mode.
 *
 * Pure function with no React dependencies. Can be used in SSR,
 * tests, or non-React contexts.
 */
export function isLayerVisible(
  layer: LayerName,
  mode: ReadingMode,
  visibilityMap: VisibilityMap = DEFAULT_VISIBILITY_MAP
): boolean {
  return visibilityMap[mode]?.includes(layer) ?? false;
}

/**
 * Computes the full visibility state for a layer, including
 * data attributes and aria attributes ready to spread onto an element.
 *
 * Pure function with no React dependencies.
 */
export function resolveLayerVisibility(
  layer: LayerName,
  mode: ReadingMode,
  visibilityMap: VisibilityMap = DEFAULT_VISIBILITY_MAP
): LayerVisibilityState {
  const isVisible = isLayerVisible(layer, mode, visibilityMap);

  return {
    isVisible,
    mode,
    layer,
    dataAttributes: {
      'data-pd-layer': layer,
      'data-pd-visible': isVisible,
    },
    ariaAttributes: {
      'aria-hidden': !isVisible,
    },
  };
}
