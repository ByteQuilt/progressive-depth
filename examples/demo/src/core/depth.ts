import { MODE_ORDER, type ReadingMode } from "@bytequilt/progressive-depth";

/** Query parameter that opens the page at a chosen depth, so a link can say "read this at Skim". */
export const DEPTH_PARAM = "depth";

const SLUGS: Record<ReadingMode, string> = { canopy: "skim", standard: "read", deep: "deep" };

/** The mode a query string asks for, or undefined when it is absent or unknown. */
export function modeFromSearch(search: string): ReadingMode | undefined {
  const slug = new URLSearchParams(search).get(DEPTH_PARAM);
  return MODE_ORDER.find((mode) => SLUGS[mode] === slug);
}

/** A link to the demo that opens at the given depth. Other query parameters are dropped. */
export function depthLink(mode: ReadingMode, location: Pick<Location, "origin" | "pathname">, hash = "try"): string {
  return `${location.origin}${location.pathname}?${DEPTH_PARAM}=${SLUGS[mode]}#${hash}`;
}
