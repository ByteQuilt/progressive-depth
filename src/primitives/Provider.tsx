import React, { useState, useCallback, useMemo } from 'react';
import { ProgressiveDepthContext, VisibilityMapContext } from '../core/context';
import { DEFAULT_VISIBILITY_MAP } from '../core/constants';
import type { ProviderPrimitiveProps, ReadingMode } from '../core/types';

/**
 * Headless provider primitive. Provides mode state to descendants
 * without rendering any wrapper DOM element.
 *
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: pass `defaultMode` (default: 'deep')
 * - Controlled: pass `mode` and `onModeChange`
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Provider defaultMode="standard">
 *   <Root>...</Root>
 * </Provider>
 *
 * // Controlled
 * <Provider mode={mode} onModeChange={setMode}>
 *   <Root>...</Root>
 * </Provider>
 * ```
 */
export function Provider({
  children,
  defaultMode = 'deep',
  mode: controlledMode,
  onModeChange,
  visibilityMap = DEFAULT_VISIBILITY_MAP,
}: ProviderPrimitiveProps) {
  const [internalMode, setInternalMode] = useState<ReadingMode>(defaultMode);

  const isControlled = controlledMode !== undefined;
  const mode = isControlled ? controlledMode : internalMode;

  const setMode = useCallback(
    (newMode: ReadingMode) => {
      if (!isControlled) {
        setInternalMode(newMode);
      }
      onModeChange?.(newMode);
    },
    [isControlled, onModeChange]
  );

  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <ProgressiveDepthContext.Provider value={contextValue}>
      <VisibilityMapContext.Provider value={visibilityMap}>
        {children}
      </VisibilityMapContext.Provider>
    </ProgressiveDepthContext.Provider>
  );
}
