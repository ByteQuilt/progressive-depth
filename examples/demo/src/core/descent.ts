/**
 * The hero is a dive through the three layers. Scroll progress `p` (0 to 1) maps to a camera zoom into
 * three nested octagons, to the ground colour (paper, then cobalt, then ink) and to which of the three
 * statements is on screen. Everything here is pure so the choreography can be tested without a browser.
 */

export type Tone = "light" | "dark";

/** Radius of each ring relative to the canopy ring: canopy, understory, mycelium. */
export const RING_RADII = [1, 0.56, 0.075] as const;

/** Degrees each ring turns over the whole dive. Neighbouring rings turn opposite ways. */
const RING_TURN = [12, -24, 45] as const;

/** Progress at which text flips from ink to paper. The ground is cobalt-dominant by then, so both read. */
export const TONE_FLIP = 0.36;

export interface Stage {
  /** Camera zoom. 1 shows the whole drawing; each ring leaves the frame as the camera passes it. */
  zoom: number;
  /** Scale applied to each ring: the camera zoom times the ring's radius. */
  scales: [number, number, number];
  /** Rotation of each ring in degrees. */
  turns: [number, number, number];
  /** Blend from paper to cobalt, then from cobalt to ink. */
  paperToCobalt: number;
  cobaltToInk: number;
  /** Opacity of the canopy, understory and mycelium statements. */
  acts: [number, number, number];
  /** How much of the root network is drawn, and how visible its nodes are. */
  roots: number;
  nodes: number;
  tone: Tone;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/** Zero slope at both ends, so every move eases in and out. */
export function smooth(from: number, to: number, value: number): number {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

export function stageAt(progress: number): Stage {
  const p = clamp(progress);
  // A slow constant drift, plus a push through each boundary between layers.
  const lnZoom = 0.4 * p + 0.95 * smooth(0.2, 0.4, p) + 0.37 * smooth(0.58, 0.78, p);
  const zoom = Math.exp(lnZoom);

  return {
    zoom,
    scales: RING_RADII.map((radius) => zoom * radius) as Stage["scales"],
    turns: RING_TURN.map((degrees) => degrees * p) as Stage["turns"],
    paperToCobalt: smooth(0.2, 0.4, p),
    cobaltToInk: smooth(0.58, 0.78, p),
    acts: [1 - smooth(0.14, 0.28, p), smooth(0.4, 0.48, p) * (1 - smooth(0.6, 0.68, p)), smooth(0.78, 0.86, p)],
    roots: smooth(0.62, 0.95, p),
    nodes: smooth(0.8, 1, p),
    tone: p < TONE_FLIP ? "light" : "dark",
  };
}

/** Scroll progress through a pinned section: 0 when its top reaches the viewport top, 1 when its bottom reaches the viewport bottom. */
export function pinnedProgress(rectTop: number, sectionHeight: number, viewportHeight: number): number {
  const travel = sectionHeight - viewportHeight;
  return travel > 0 ? clamp(-rectTop / travel) : 0;
}
