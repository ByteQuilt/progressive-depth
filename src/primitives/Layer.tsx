import React from 'react';
import { useLayerVisibility } from '../core/hooks/useLayerVisibility';
import type { LayerPrimitiveProps } from '../core/types';

/**
 * Generic layer primitive. Resolves visibility based on its `layer` prop
 * and the current mode. Supports three rendering strategies:
 *
 * 1. Default: renders a div with data/aria attributes (CSS handles animation)
 * 2. render prop: consumer gets full control via render function
 * 3. as prop: render as a different element type
 *
 * @example
 * ```tsx
 * // Default (CSS animation)
 * <Layer layer="understory">
 *   <p>Contextual content</p>
 * </Layer>
 * ```
 *
 * @example
 * ```tsx
 * // Framer Motion via render prop
 * <Layer layer="understory" render={({ isVisible }) => (
 *   <motion.div animate={{ opacity: isVisible ? 1 : 0 }}>
 *     <p>Animated content</p>
 *   </motion.div>
 * )} />
 * ```
 */
export function Layer({
  children,
  layer,
  render,
  as: Component = 'div',
  className,
  ...rest
}: LayerPrimitiveProps) {
  const visibilityState = useLayerVisibility(layer);

  if (render) {
    return <>{render(visibilityState)}</>;
  }

  const { dataAttributes, ariaAttributes } = visibilityState;

  return (
    <Component
      {...rest}
      {...dataAttributes}
      {...ariaAttributes}
      className={`progressive-depth-${layer} ${className ?? ''}`.trim()}
    >
      {children}
    </Component>
  );
}
