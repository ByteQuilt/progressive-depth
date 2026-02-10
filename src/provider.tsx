import React, { useState } from 'react';
import { ProgressiveDepthContext } from './context';
import { ReadingModeToggle } from './toggle';
import type { ProgressiveDepthProviderProps } from './types';

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
}: ProgressiveDepthProviderProps) {
  const [mode, setMode] = useState(defaultMode);

  return (
    <ProgressiveDepthContext.Provider value={{ mode, setMode }}>
      <div className="progressive-depth" data-pd-mode={mode}>
        {showToggle && (
          <ReadingModeToggle
            className={toggleClassName}
            labels={toggleLabels}
          />
        )}
        {children}
      </div>
    </ProgressiveDepthContext.Provider>
  );
}
