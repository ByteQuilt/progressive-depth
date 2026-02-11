import React from 'react';
import { Layer } from '../primitives/Layer';
import type { LayerProps } from '../core/types';

/**
 * Understory layer. The 5-foot view.
 *
 * Visible in 'standard' and 'deep' reading modes. Contains
 * context and reasoning that supports the canopy claim.
 * Should be one to two paragraphs.
 */
export function Understory({ children, className }: LayerProps) {
  return (
    <Layer layer="understory" className={className}>
      {children}
    </Layer>
  );
}
