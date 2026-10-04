import type { LayerProps } from "../core/types";
import { Layer } from "../primitives/Layer";

/**
 * Canopy layer. The 10-foot view.
 *
 * Always visible in all reading modes. Contains the top-level
 * claim or takeaway for a section. Should be 1-2 sentences
 * that form a complete, standalone thought.
 */
export function Canopy({ children, className }: LayerProps) {
  return (
    <Layer layer="canopy" className={className}>
      {children}
    </Layer>
  );
}
