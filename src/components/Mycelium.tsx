import React from 'react';
import { Layer } from '../primitives/Layer';
import type { LayerProps } from '../core/types';

/**
 * Mycelium layer. The deep dive.
 *
 * Visible only in 'deep' reading mode. Contains full detail,
 * examples, evidence, technical specifics, and stories.
 * No length restriction, but every sentence should earn its place.
 */
export function Mycelium({ children, className }: LayerProps) {
  return (
    <Layer layer="mycelium" className={className}>
      {children}
    </Layer>
  );
}
