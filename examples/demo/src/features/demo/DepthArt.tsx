import type { LayerName } from "@bytequilt/progressive-depth";
import { LAYER_TITLES } from "../../core/reading";

const LAYERS: LayerName[] = ["canopy", "understory", "mycelium"];

/** Decorative drawing. One shape per layer; a layer's shape appears when that layer is shown. */
export function DepthArt({ layers, variant = "stage" }: { layers: LayerName[]; variant?: "hero" | "stage" }) {
  const shown = (layer: LayerName) => layers.includes(layer);

  return (
    <figure className={`depth-art depth-art-${variant}`}>
      <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <path className="art-line" d="M63 119 152 50h225l112 88v242l-92 104H166L63 405Z" />
        <path className="art-layer art-canopy" data-shown={shown("canopy")} d="m110 166 88-65 170 19 91 80-18 171-121 73-160-33-60-91Z" />
        <path className="art-layer art-understory" data-shown={shown("understory")} d="m169 205 70-49 119 20 58 58-35 105-106 57-99-41-31-73Z" />
        <path className="art-layer art-mycelium" data-shown={shown("mycelium")} d="m232 245 54-24 67 30 20 61-74 45-69-30Z" />
        <path
          className="art-thread"
          d="M91 348c85-21 138-9 188 35 57 49 111 45 187-31M138 130c43 55 52 107 29 159-25 56-6 104 71 147M422 142c-42 40-60 88-53 143 8 62-17 106-73 139"
        />
        {shown("understory") && (
          <g className="art-notes">
            <circle cx="178" cy="294" r="8" />
            <circle cx="405" cy="318" r="8" />
            <path d="M186 294h56M397 318h-49" />
          </g>
        )}
        {shown("mycelium") && (
          <g className="art-detail">
            <path d="M274 247v87M294 259v81M313 268v60M254 274h83M247 292h96" />
            <circle cx="274" cy="247" r="4" />
            <circle cx="333" cy="321" r="4" />
          </g>
        )}
      </svg>
      <figcaption>
        <ul className="art-legend">
          {LAYERS.map((layer) => (
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
