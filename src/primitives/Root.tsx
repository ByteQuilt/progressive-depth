import React from 'react';
import { useProgressiveDepth } from '../core/hooks/useProgressiveDepth';
import type { RootPrimitiveProps } from '../core/types';

/**
 * Optional wrapper element that sets data-pd-mode on a DOM node.
 *
 * Separated from Provider so consumers can place the data attribute
 * on any element in their tree, or omit it entirely when not using
 * CSS-based styling.
 *
 * @example
 * ```tsx
 * <Provider>
 *   <Root>
 *     <ReadingModeToggle />
 *     <Canopy>...</Canopy>
 *     <Understory>...</Understory>
 *   </Root>
 * </Provider>
 * ```
 */
export function Root({
  children,
  as: Component = 'div',
  className,
  ...rest
}: RootPrimitiveProps) {
  const { mode } = useProgressiveDepth();

  return (
    <Component
      {...rest}
      className={`progressive-depth ${className ?? ''}`.trim()}
      data-pd-mode={mode}
    >
      {children}
    </Component>
  );
}
