import React from 'react';
import { Provider } from '../primitives/Provider';
import { Root } from '../primitives/Root';
import { ReadingModeToggle } from './ReadingModeToggle';
import type { ProgressiveDepthProviderProps } from '../core/types';

/**
 * Provider component for Progressive Depth.
 *
 * Wraps your content and provides reading mode state to all
 * Canopy, Understory, and Mycelium components within.
 *
 * Optionally renders a ReadingModeToggle at the top.
 *
 * @example
 * ```tsx
 * <ProgressiveDepthProvider>
 *   <h2>My Section</h2>
 *   <Canopy><p>The claim.</p></Canopy>
 *   <Understory><p>The context.</p></Understory>
 *   <Mycelium><p>The details.</p></Mycelium>
 * </ProgressiveDepthProvider>
 *
 * // Without the built-in toggle
 * <ProgressiveDepthProvider showToggle={false}>
 *   {content}
 * </ProgressiveDepthProvider>
 * ```
 */
export function ProgressiveDepthProvider({
  children,
  defaultMode = 'deep',
  showToggle = true,
  toggleClassName,
  toggleLabels,
  visibilityMap,
  onModeChange,
}: ProgressiveDepthProviderProps) {
  return (
    <Provider
      defaultMode={defaultMode}
      visibilityMap={visibilityMap}
      onModeChange={onModeChange}
    >
      <Root>
        {showToggle && (
          <ReadingModeToggle className={toggleClassName} labels={toggleLabels} />
        )}
        {children}
      </Root>
    </Provider>
  );
}
