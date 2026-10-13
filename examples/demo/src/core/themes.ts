import type { CSSProperties } from "react";

export interface Theme {
  id: string;
  label: string;
  /** Values for the package's `--pd-*` custom properties. */
  vars: Record<`--pd-${string}`, string>;
}

export const THEMES: Theme[] = [
  {
    id: "editorial",
    label: "Editorial",
    vars: {
      "--pd-canopy-color": "var(--ink)",
      "--pd-canopy-font-weight": "600",
      "--pd-understory-color": "var(--ink)",
      "--pd-mycelium-color": "var(--muted)",
      "--pd-mycelium-border-color": "var(--coral)",
    },
  },
  {
    id: "quiet",
    label: "Quiet",
    vars: {
      "--pd-canopy-font-size": "1.1rem",
      "--pd-canopy-font-weight": "500",
      "--pd-canopy-color": "var(--cobalt)",
      "--pd-understory-color": "var(--muted)",
      "--pd-mycelium-color": "var(--muted)",
      "--pd-mycelium-border-color": "var(--cobalt)",
    },
  },
  {
    id: "large",
    label: "Large type",
    vars: {
      "--pd-canopy-font-size": "1.55rem",
      "--pd-canopy-font-weight": "600",
      "--pd-canopy-color": "var(--ink)",
      "--pd-understory-font-size": "1.2rem",
      "--pd-understory-color": "var(--ink)",
      "--pd-mycelium-font-size": "1.1rem",
      "--pd-mycelium-color": "var(--muted)",
      "--pd-mycelium-border-color": "var(--coral)",
    },
  },
];

export function findTheme(id: string): Theme {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0];
}

export function themeStyle(theme: Theme): CSSProperties {
  return theme.vars as CSSProperties;
}
