import { useContext, useMemo } from 'react';
import { ProgressiveDepthContext, VisibilityMapContext } from '../context';
import { resolveLayerVisibility } from '../visibility';
import type { LayerName, VisibilityMap, LayerVisibilityState } from '../types';

/**
 * Computes visibility state for a given layer based on the current mode.
 *
 * Returns everything needed to render, animate, or control a layer:
 * `isVisible`, data attributes, and aria attributes.
 *
 * @param layer - Which content layer ('canopy' | 'understory' | 'mycelium')
 * @param visibilityMapOverride - Optional override; falls back to provider's map
 *
 * @example
 * ```tsx
 * // With Framer Motion
 * function AnimatedUnderstory({ children }) {
 *   const { isVisible, dataAttributes, ariaAttributes } = useLayerVisibility('understory');
 *   return (
 *     <motion.div
 *       animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? 'auto' : 0 }}
 *       {...dataAttributes}
 *       {...ariaAttributes}
 *     >
 *       {children}
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional rendering
 * function SimpleUnderstory({ children }) {
 *   const { isVisible } = useLayerVisibility('understory');
 *   if (!isVisible) return null;
 *   return <div>{children}</div>;
 * }
 * ```
 */
export function useLayerVisibility(
  layer: LayerName,
  visibilityMapOverride?: VisibilityMap
): LayerVisibilityState {
  const { mode } = useContext(ProgressiveDepthContext);
  const contextVisibilityMap = useContext(VisibilityMapContext);
  const visibilityMap = visibilityMapOverride ?? contextVisibilityMap;

  return useMemo(
    () => resolveLayerVisibility(layer, mode, visibilityMap),
    [layer, mode, visibilityMap]
  );
}
