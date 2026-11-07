import { LAYER_ORDER } from "@bytequilt/progressive-depth";
import type { Section } from "../../content/article";
import { countLayerWords, formatReadingTime, LAYER_TITLES } from "../../core/reading";
import { useTween } from "../../core/useTween";
import { useVisibleLayers } from "./useVisibleLayers";

/**
 * What the chosen depth gives back, said in a sentence and drawn as one bar per layer sized by its words.
 * The bar is the golden-ratio claim made visible: each layer is longer than the one above it.
 */
export function Dividend({ sections }: { sections: Section[] }) {
  const layers = useVisibleLayers();
  const total = countLayerWords(sections, LAYER_ORDER);
  const skipped = total - countLayerWords(sections, layers);
  const skimmed = useTween(skipped);
  const skimWords = countLayerWords(sections, ["canopy"]);

  return (
    <div className="dividend">
      <p className="dividend-line">
        {skipped === 0 ? (
          <>
            You are reading all {total} words, {formatReadingTime(total)}. Skim, and it is {formatReadingTime(skimWords)}.
          </>
        ) : (
          <>
            <span className="sr-only">You are skipping {skipped} words. </span>
            <span aria-hidden="true">
              You are skipping <strong>{skimmed}</strong> words.{" "}
            </span>
            That is {formatReadingTime(skipped)} back.
          </>
        )}
      </p>
      <div className="wordbar" aria-hidden="true">
        {LAYER_ORDER.map((layer) => {
          const words = countLayerWords(sections, [layer]);
          return (
            <span key={layer} className="wordbar-segment" data-layer={layer} data-shown={layers.includes(layer)} style={{ flexGrow: words }}>
              <span>{LAYER_TITLES[layer]}</span>
              <span>{words}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
