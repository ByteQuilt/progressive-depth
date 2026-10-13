import { DEFAULT_MODE_LABELS, isLayerVisible, LAYER_ORDER, MODE_ORDER, useProgressiveDepth } from "@bytequilt/progressive-depth";
import { LAYER_TITLES } from "../../core/reading";
import type { RulesPreset } from "../../core/rules";

/** The active visibility map as a table, with the current mode marked. */
export function RulesTable({ rules }: { rules: RulesPreset }) {
  const { mode: current } = useProgressiveDepth();

  return (
    // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need access to horizontal table scrolling.
    <section className="rules-scroll" aria-label="Layers each reading mode shows" tabIndex={0}>
      <table className="rules-table">
        <caption className="sr-only">Layers each reading mode shows</caption>
        <thead>
          <tr>
            <th scope="col">Mode</th>
            {LAYER_ORDER.map((layer) => (
              <th key={layer} scope="col">
                {LAYER_TITLES[layer]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MODE_ORDER.map((mode) => (
            <tr key={mode} aria-current={mode === current ? "true" : undefined}>
              <th scope="row">{DEFAULT_MODE_LABELS[mode].label}</th>
              {LAYER_ORDER.map((layer) => (
                <td key={layer} data-shown={isLayerVisible(layer, mode, rules.map)}>
                  {isLayerVisible(layer, mode, rules.map) ? "Shown" : "Hidden"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
