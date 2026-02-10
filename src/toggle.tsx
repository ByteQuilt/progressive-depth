import React from 'react';
import { useProgressiveDepth } from './context';
import { MODE_ORDER, DEFAULT_MODE_LABELS } from './constants';
import type { ReadingModeToggleProps } from './types';

/**
 * Reading mode toggle. Lets readers choose their depth.
 *
 * Renders three buttons (Skim, Read, Deep Dive) that control
 * which layers are visible. Ships unstyled with semantic class
 * names and data attributes for custom styling.
 *
 * @example
 * ```tsx
 * <ReadingModeToggle />
 *
 * // With custom labels
 * <ReadingModeToggle
 *   labels={{
 *     canopy: { label: 'TL;DR', description: 'The short version' },
 *   }}
 * />
 * ```
 */
export function ReadingModeToggle({
  className,
  labels,
}: ReadingModeToggleProps) {
  const { mode, setMode } = useProgressiveDepth();

  const mergedLabels = {
    ...DEFAULT_MODE_LABELS,
    ...labels,
  };

  return (
    <nav
      className={`progressive-depth-toggle ${className ?? ''}`.trim()}
      role="radiogroup"
      aria-label="Reading depth"
    >
      {MODE_ORDER.map((m) => {
        const isActive = m === mode;
        const info = mergedLabels[m];

        return (
          <button
            key={m}
            className="progressive-depth-toggle-button"
            role="radio"
            aria-checked={isActive}
            aria-label={info.description}
            title={info.description}
            data-pd-mode={m}
            data-pd-active={isActive}
            onClick={() => setMode(m)}
          >
            {info.label}
          </button>
        );
      })}
    </nav>
  );
}
