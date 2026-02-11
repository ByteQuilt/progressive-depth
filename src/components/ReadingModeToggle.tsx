import React from 'react';
import { useToggle } from '../core/hooks/useToggle';
import { DEFAULT_MODE_LABELS } from '../core/constants';
import type { ReadingModeToggleProps } from '../core/types';

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
  const { modes, getModeProps, getToggleProps } = useToggle({ labels });

  const mergedLabels = { ...DEFAULT_MODE_LABELS, ...labels };

  return (
    <nav
      className={`progressive-depth-toggle ${className ?? ''}`.trim()}
      {...getToggleProps()}
    >
      {modes.map((m) => {
        const info = mergedLabels[m];

        return (
          <button
            key={m}
            className="progressive-depth-toggle-button"
            {...getModeProps(m)}
            title={info.description}
          >
            {info.label}
          </button>
        );
      })}
    </nav>
  );
}
