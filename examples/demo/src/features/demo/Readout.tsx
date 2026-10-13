import { DEFAULT_MODE_LABELS, LAYER_ORDER, useProgressiveDepth } from "@bytequilt/progressive-depth";
import type { Section } from "../../content/article";
import { countLayerWords, formatReadingTime } from "../../core/reading";
import { useVisibleLayers } from "./useVisibleLayers";

/** Summary of what the current mode leaves on the page. Screen readers hear it when the mode changes. */
export function Readout({ sections }: { sections: Section[] }) {
  const { mode } = useProgressiveDepth();
  const layers = useVisibleLayers();
  const shown = countLayerWords(sections, layers);
  const total = countLayerWords(sections, LAYER_ORDER);

  return (
    <p className="readout" role="status">
      <strong>{DEFAULT_MODE_LABELS[mode].label}</strong>
      <span>
        {layers.length} of {LAYER_ORDER.length} layers · {shown} of {total} words · {formatReadingTime(shown)}
      </span>
    </p>
  );
}
