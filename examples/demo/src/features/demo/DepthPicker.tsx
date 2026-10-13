import { useToggle } from "@bytequilt/progressive-depth";
import { useMemo } from "react";
import { describeLayers, modeLabels, visibleLayers } from "../../core/reading";
import type { RulesPreset } from "../../core/rules";

/** Headless useToggle with custom markup. Labels come from the active visibility map, so they stay accurate when the rules change. */
export function DepthPicker({ rules }: { rules: RulesPreset }) {
  const labels = useMemo(() => modeLabels(rules.map), [rules]);
  const { modes, getModeProps, getToggleProps } = useToggle({ labels });

  return (
    <div className="depth-picker" {...getToggleProps()}>
      {modes.map((mode) => (
        <button key={mode} type="button" className="depth-card" {...getModeProps(mode)}>
          <strong>{labels[mode].label}</strong>
          <span className="depth-card-layers">{describeLayers(visibleLayers(mode, rules.map))}</span>
        </button>
      ))}
    </div>
  );
}
