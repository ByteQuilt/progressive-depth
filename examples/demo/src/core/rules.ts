import { DEFAULT_VISIBILITY_MAP, type VisibilityMap } from "@bytequilt/progressive-depth";

export interface RulesPreset {
  id: string;
  label: string;
  note: string;
  map: VisibilityMap;
}

/** Visibility maps for the Provider's `visibilityMap` prop. The package never hides the canopy, so every mode lists it. */
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
    id: "canopy-plus-one",
    label: "Canopy plus one layer",
    note: "Read adds the understory. Deep Dive swaps it for the mycelium.",
    map: { canopy: ["canopy"], standard: ["canopy", "understory"], deep: ["canopy", "mycelium"] },
  },
];

export function findRules(id: string): RulesPreset {
  return RULES_PRESETS.find((preset) => preset.id === id) ?? RULES_PRESETS[0];
}
