import { DEFAULT_VISIBILITY_MAP, type VisibilityMap } from "@bytequilt/progressive-depth";

export interface RulesPreset {
  id: string;
  label: string;
  note: string;
  map: VisibilityMap;
}

/** Visibility maps for the Provider's `visibilityMap` prop. */
export const RULES_PRESETS: RulesPreset[] = [
  {
    id: "default",
    label: "Default",
    note: "Each mode adds one layer.",
    map: DEFAULT_VISIBILITY_MAP,
  },
  {
    id: "claims-evidence",
    label: "Claims and evidence",
    note: "Read skips the understory and shows the canopy and mycelium.",
    map: { canopy: ["canopy"], standard: ["canopy", "mycelium"], deep: ["canopy", "understory", "mycelium"] },
  },
  {
    id: "one-layer",
    label: "One layer at a time",
    note: "Each mode shows a single layer.",
    map: { canopy: ["canopy"], standard: ["understory"], deep: ["mycelium"] },
  },
];

export function findRules(id: string): RulesPreset {
  return RULES_PRESETS.find((preset) => preset.id === id) ?? RULES_PRESETS[0];
}
