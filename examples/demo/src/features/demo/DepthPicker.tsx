import { LAYER_ORDER, useToggle } from "@bytequilt/progressive-depth";
import { useMemo } from "react";
import { describeLayers, modeLabels, visibleLayers } from "../../core/reading";
import type { RulesPreset } from "../../core/rules";

/** Headless useToggle with custom markup. Labels come from the active visibility map, so they stay accurate when the rules change. */
export function DepthPicker({ rules }: { rules: RulesPreset }) {
  const labels = useMemo(() => modeLabels(rules.map), [rules]);
  const { mode, modes, getModeProps, getToggleProps } = useToggle({ labels });

  return (
    <div className="depth-picker" {...getToggleProps()} style={{ "--index": modes.indexOf(mode), "--count": modes.length } as React.CSSProperties}>
      <span className="depth-indicator" aria-hidden="true" />
      {modes.map((value) => {
        const layers = visibleLayers(value, rules.map);
        return (
          <button key={value} type="button" className="depth-option" {...getModeProps(value)}>
            <strong>{labels[value].label}</strong>
            <span className="depth-pips" aria-hidden="true">
              {LAYER_ORDER.map((layer) => (
                <i key={layer} data-layer={layer} data-on={layers.includes(layer)} />
              ))}
            </span>
            <span className="depth-option-layers">{describeLayers(layers)}</span>
          </button>
        );
      })}
    </div>
  );
}
