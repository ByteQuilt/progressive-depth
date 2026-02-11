import { useContext, useCallback, useMemo } from 'react';
import { ProgressiveDepthContext } from '../context';
import { MODE_ORDER, DEFAULT_MODE_LABELS } from '../constants';
import type { ReadingMode, UseToggleReturn, UseToggleOptions } from '../types';

/**
 * Headless hook for building custom reading mode toggle UIs.
 *
 * Returns the current mode, setters, navigation helpers, and
 * prop-getter functions that provide accessible attributes for
 * any toggle element.
 *
 * @example
 * ```tsx
 * // Button group
 * function CustomToggle() {
 *   const { modes, getModeProps, getToggleProps } = useToggle();
 *   return (
 *     <div {...getToggleProps()}>
 *       {modes.map(m => (
 *         <button key={m} {...getModeProps(m)}>{m}</button>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Dropdown
 * function DropdownToggle() {
 *   const { mode, setMode, modes } = useToggle();
 *   return (
 *     <select value={mode} onChange={e => setMode(e.target.value as ReadingMode)}>
 *       {modes.map(m => <option key={m} value={m}>{m}</option>)}
 *     </select>
 *   );
 * }
 * ```
 */
export function useToggle(options: UseToggleOptions = {}): UseToggleReturn {
  const { mode, setMode } = useContext(ProgressiveDepthContext);

  const mergedLabels = useMemo(
    () => ({ ...DEFAULT_MODE_LABELS, ...options.labels }),
    [options.labels]
  );

  const nextMode = useCallback(() => {
    const currentIndex = MODE_ORDER.indexOf(mode);
    const nextIndex = (currentIndex + 1) % MODE_ORDER.length;
    setMode(MODE_ORDER[nextIndex]);
  }, [mode, setMode]);

  const previousMode = useCallback(() => {
    const currentIndex = MODE_ORDER.indexOf(mode);
    const prevIndex = (currentIndex - 1 + MODE_ORDER.length) % MODE_ORDER.length;
    setMode(MODE_ORDER[prevIndex]);
  }, [mode, setMode]);

  const getModeProps = useCallback(
    (targetMode: ReadingMode) => ({
      role: 'radio' as const,
      'aria-checked': targetMode === mode,
      'aria-label': mergedLabels[targetMode].description,
      'data-pd-mode': targetMode,
      'data-pd-active': targetMode === mode,
      onClick: () => setMode(targetMode),
    }),
    [mode, setMode, mergedLabels]
  );

  const getToggleProps = useCallback(
    () => ({
      role: 'radiogroup' as const,
      'aria-label': 'Reading depth',
    }),
    []
  );

  return {
    mode,
    setMode,
    nextMode,
    previousMode,
    modes: MODE_ORDER,
    getModeProps,
    getToggleProps,
  };
}
