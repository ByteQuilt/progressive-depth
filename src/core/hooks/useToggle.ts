import { useContext, useCallback, useMemo, type KeyboardEvent } from "react";
import { ProgressiveDepthContext } from "../context";
import { MODE_ORDER, DEFAULT_MODE_LABELS } from "../constants";
import type { ReadingMode, UseToggleReturn, UseToggleOptions } from "../types";

/** Arrow keys move the selection, as the ARIA radio group pattern expects. */
const KEY_STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

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

  const mergedLabels = useMemo(() => ({ ...DEFAULT_MODE_LABELS, ...options.labels }), [options.labels]);

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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const index = MODE_ORDER.indexOf(mode);
      const step = KEY_STEPS[event.key];
      let target: ReadingMode | undefined;
      if (step) target = MODE_ORDER[(index + step + MODE_ORDER.length) % MODE_ORDER.length];
      else if (event.key === "Home") target = MODE_ORDER[0];
      else if (event.key === "End") target = MODE_ORDER[MODE_ORDER.length - 1];
      if (!target) return;

      event.preventDefault();
      setMode(target);
      // Focus follows the selection. Finding the button by its data attribute keeps this working for custom toggles.
      const group = event.currentTarget.closest('[role="radiogroup"]');
      group?.querySelector<HTMLElement>(`[data-pd-mode="${target}"]`)?.focus();
    },
    [mode, setMode],
  );

  const getModeProps = useCallback(
    (targetMode: ReadingMode) => ({
      role: "radio" as const,
      "aria-checked": targetMode === mode,
      "aria-label": mergedLabels[targetMode].description,
      // Roving tabindex: Tab reaches only the checked mode; arrow keys move between modes.
      tabIndex: targetMode === mode ? (0 as const) : (-1 as const),
      "data-pd-mode": targetMode,
      "data-pd-active": targetMode === mode,
      onClick: () => setMode(targetMode),
      onKeyDown: handleKeyDown,
    }),
    [mode, setMode, mergedLabels, handleKeyDown],
  );

  const getToggleProps = useCallback(
    () => ({
      role: "radiogroup" as const,
      "aria-label": "Reading depth",
    }),
    [],
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
