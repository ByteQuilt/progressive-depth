import React from 'react';
import { useProgressiveDepth } from './context';
import type { LayerProps } from './types';

/**
 * Canopy layer. The 10-foot view.
 *
 * Always visible in all reading modes. Contains the top-level
 * claim or takeaway for a section. Should be 1-2 sentences
 * that form a complete, standalone thought.
 */
export function Canopy({ children, className }: LayerProps) {
  return (
    <div
      className={`progressive-depth-canopy ${className ?? ''}`.trim()}
      data-pd-layer="canopy"
    >
      {children}
    </div>
  );
}

/**
 * Understory layer. The 5-foot view.
 *
 * Visible in 'standard' and 'deep' reading modes. Contains
 * context and reasoning that supports the canopy claim.
 * Should be one to two paragraphs.
 */
export function Understory({ children, className }: LayerProps) {
  const { mode } = useProgressiveDepth();
  const visible = mode === 'standard' || mode === 'deep';

  return (
    <div
      className={`progressive-depth-understory ${className ?? ''}`.trim()}
      data-pd-layer="understory"
      data-pd-visible={visible}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}

/**
 * Mycelium layer. The deep dive.
 *
 * Visible only in 'deep' reading mode. Contains full detail,
 * examples, evidence, technical specifics, and stories.
 * No length restriction, but every sentence should earn its place.
 */
export function Mycelium({ children, className }: LayerProps) {
  const { mode } = useProgressiveDepth();
  const visible = mode === 'deep';

  return (
    <div
      className={`progressive-depth-mycelium ${className ?? ''}`.trim()}
      data-pd-layer="mycelium"
      data-pd-visible={visible}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}
