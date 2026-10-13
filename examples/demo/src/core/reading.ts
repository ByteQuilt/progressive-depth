import {
  DEFAULT_MODE_LABELS,
  isLayerVisible,
  LAYER_ORDER,
  type LayerName,
  MODE_ORDER,
  type ReadingMode,
  type VisibilityMap,
} from "@bytequilt/progressive-depth";
import type { Section } from "../content/article";

/** Typical adult silent reading speed. The readout is an estimate, not a measurement. */
const WORDS_PER_MINUTE = 230;

export const LAYER_TITLES: Record<LayerName, string> = { canopy: "Canopy", understory: "Understory", mycelium: "Mycelium" };

export function countWords(text: string): number {
  const words = text.trim().split(/\s+/);
  return words[0] === "" ? 0 : words.length;
}

export function visibleLayers(mode: ReadingMode, map: VisibilityMap): LayerName[] {
  return LAYER_ORDER.filter((layer) => isLayerVisible(layer, mode, map));
}

/** Words in the given layers across every section. */
export function countLayerWords(sections: Section[], layers: LayerName[]): number {
  return sections.reduce((total, section) => total + layers.reduce((sum, layer) => sum + section.layers[layer].reduce((n, p) => n + countWords(p), 0), 0), 0);
}

/** "20 seconds" under a minute and a half, whole minutes after that. */
export function formatReadingTime(words: number): string {
  if (words === 0) return "nothing to read";
  const seconds = (words / WORDS_PER_MINUTE) * 60;
  if (seconds < 90) return `about ${Math.max(5, Math.round(seconds / 5) * 5)} seconds`;
  return `about ${Math.round(seconds / 60)} minutes`;
}

/** "Canopy and understory". Names the layers a mode shows, for labels and tables. */
export function describeLayers(layers: LayerName[]): string {
  if (layers.length === 0) return "No layers";
  const names = layers.map((layer) => LAYER_TITLES[layer].toLowerCase());
  const text = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Toggle labels for a visibility map. The description becomes each button's accessible name,
 * so it contains the card's visible text (the label, then the layers) and stays accurate under any map.
 */
export function modeLabels(map: VisibilityMap): Record<ReadingMode, { label: string; description: string }> {
  return Object.fromEntries(
    MODE_ORDER.map((mode) => {
      const { label } = DEFAULT_MODE_LABELS[mode];
      return [mode, { label, description: `${label} ${describeLayers(visibleLayers(mode, map)).toLowerCase()}` }];
    }),
  ) as Record<ReadingMode, { label: string; description: string }>;
}
