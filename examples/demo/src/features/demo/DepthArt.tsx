import { LAYER_ORDER, type LayerName } from "@bytequilt/progressive-depth";
import { LAYER_TITLES } from "../../core/reading";

/** The brand octagon at three sizes. A ring is drawn solid when its layer is shown, and as a dashed ghost when it is not. */
const OCTAGON = "M60 234 234 60H766L940 234V766L766 940H234L60 766Z";
const RING_SCALE: Record<LayerName, number> = { canopy: 1, understory: 0.62, mycelium: 0.3 };

/** Decorative cross-section of the post. One ring per layer; a layer's ring fills in when that layer is shown. */
export function DepthArt({ layers }: { layers: LayerName[] }) {
  const shown = (layer: LayerName) => layers.includes(layer);

  return (
    <figure className="depth-art">
      <svg viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
        {LAYER_ORDER.map((layer) => (
          <path key={layer} className={`art-ring art-${layer}`} data-shown={shown(layer)} d={OCTAGON} style={{ transform: `scale(${RING_SCALE[layer]})` }} />
        ))}
      </svg>
      <figcaption>
        <ul className="art-legend">
          {LAYER_ORDER.map((layer) => (
            <li key={layer} data-layer={layer} data-shown={shown(layer)}>
              <span className="art-swatch" aria-hidden="true" />
              {LAYER_TITLES[layer]}
              {!shown(layer) && <span className="sr-only"> (hidden)</span>}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
