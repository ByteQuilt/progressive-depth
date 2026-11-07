import { DEFAULT_VISIBILITY_MAP, LAYER_ORDER, MODE_ORDER } from "@bytequilt/progressive-depth";
import { describe, expect, it } from "vitest";
import { ARTICLE } from "../content/article";
import { depthLink, modeFromSearch } from "../core/depth";
import { pinnedProgress, RING_RADII, stageAt, TONE_FLIP } from "../core/descent";
import { countLayerWords, countWords, describeLayers, formatReadingTime, modeLabels, visibleLayers } from "../core/reading";
import { findRules, RULES_PRESETS } from "../core/rules";
import { getBrowserStorage } from "../core/storage";
import { findTheme, THEMES } from "../core/themes";

describe("reading", () => {
  it("counts words and treats empty text as zero", () => {
    expect(countWords("  one two\nthree ")).toBe(3);
    expect(countWords("   ")).toBe(0);
  });

  it("resolves visible layers from a visibility map", () => {
    expect(visibleLayers("canopy", DEFAULT_VISIBILITY_MAP)).toEqual(["canopy"]);
    expect(visibleLayers("deep", DEFAULT_VISIBILITY_MAP)).toEqual(LAYER_ORDER);
    expect(visibleLayers("standard", findRules("claims-evidence").map)).toEqual(["canopy", "mycelium"]);
  });

  it("counts more words as more layers show", () => {
    const skim = countLayerWords(ARTICLE, ["canopy"]);
    const read = countLayerWords(ARTICLE, ["canopy", "understory"]);
    const deep = countLayerWords(ARTICLE, LAYER_ORDER);
    expect(skim).toBeGreaterThan(0);
    expect(read).toBeGreaterThan(skim);
    expect(deep).toBeGreaterThan(read);
  });

  it("formats reading time", () => {
    expect(formatReadingTime(0)).toBe("nothing to read");
    expect(formatReadingTime(1)).toBe("about 5 seconds");
    expect(formatReadingTime(115)).toBe("about 30 seconds");
    expect(formatReadingTime(460)).toBe("about 2 minutes");
  });

  it("describes layer lists", () => {
    expect(describeLayers([])).toBe("No layers");
    expect(describeLayers(["canopy"])).toBe("Canopy");
    expect(describeLayers(["canopy", "understory", "mycelium"])).toBe("Canopy, understory and mycelium");
  });

  it("starts each mode description with its visible label and layers", () => {
    const labels = modeLabels(DEFAULT_VISIBILITY_MAP);
    for (const mode of MODE_ORDER) expect(labels[mode].description.startsWith(labels[mode].label)).toBe(true);
    expect(labels.standard.description).toBe("Read canopy and understory");
  });
});

describe("rules presets", () => {
  it("cover every mode with valid layers and keep the canopy, which the package never hides", () => {
    for (const preset of RULES_PRESETS) {
      for (const mode of MODE_ORDER) {
        expect(preset.map[mode]).toContain("canopy");
        for (const layer of preset.map[mode]) expect(LAYER_ORDER).toContain(layer);
      }
    }
  });

  it("falls back to the first preset for an unknown id", () => {
    expect(findRules("nope")).toBe(RULES_PRESETS[0]);
  });
});

describe("themes", () => {
  it("only set the package's custom properties", () => {
    for (const theme of THEMES) for (const name of Object.keys(theme.vars)) expect(name.startsWith("--pd-")).toBe(true);
  });

  it("falls back to the first theme for an unknown id", () => {
    expect(findTheme("nope")).toBe(THEMES[0]);
  });
});

describe("getBrowserStorage", () => {
  it("returns localStorage when it works", () => {
    expect(getBrowserStorage()).toBe(window.localStorage);
  });

  it("returns undefined when the browser blocks storage", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("blocked", "SecurityError");
      },
    });
    try {
      expect(getBrowserStorage()).toBeUndefined();
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
    }
  });
});

describe("descent", () => {
  const steps = Array.from({ length: 101 }, (_, i) => i / 100);

  it("zooms in one direction only, so the dive never reverses", () => {
    const zooms = steps.map((p) => stageAt(p).zoom);
    for (let i = 1; i < zooms.length; i++) expect(zooms[i]).toBeGreaterThanOrEqual(zooms[i - 1]);
    expect(zooms[0]).toBe(1);
  });

  it("shows exactly one statement at each resting point and none on top of another", () => {
    const resting = { canopy: 0, understory: 0.52, mycelium: 1 };
    expect(stageAt(resting.canopy).acts).toEqual([1, 0, 0]);
    expect(stageAt(resting.understory).acts).toEqual([0, 1, 0]);
    expect(stageAt(resting.mycelium).acts).toEqual([0, 0, 1]);
    for (const p of steps) {
      const [first, second, third] = stageAt(p).acts;
      expect(first + second + third).toBeLessThanOrEqual(1.5);
      // Never two statements fully legible at once.
      expect([first, second, third].filter((opacity) => opacity > 0.75).length).toBeLessThanOrEqual(1);
    }
  });

  it("moves the ground from paper to cobalt to ink, with each statement on its plateau", () => {
    expect(stageAt(0)).toMatchObject({ paperToCobalt: 0, cobaltToInk: 0, tone: "light" });
    expect(stageAt(0.52)).toMatchObject({ paperToCobalt: 1, cobaltToInk: 0, tone: "dark" });
    expect(stageAt(1)).toMatchObject({ paperToCobalt: 1, cobaltToInk: 1, tone: "dark" });
  });

  it("flips the text tone before the ground is dark enough to need it", () => {
    expect(stageAt(TONE_FLIP - 0.01).tone).toBe("light");
    expect(stageAt(TONE_FLIP).tone).toBe("dark");
    expect(stageAt(TONE_FLIP).paperToCobalt).toBeGreaterThan(0.5);
  });

  it("scales each ring by the camera zoom times its radius", () => {
    const stage = stageAt(0.7);
    for (const [i, scale] of stage.scales.entries()) expect(scale).toBeCloseTo(stage.zoom * RING_RADII[i], 10);
  });

  it("clamps progress outside the pinned range", () => {
    expect(stageAt(-3)).toEqual(stageAt(0));
    expect(stageAt(9)).toEqual(stageAt(1));
  });

  it("measures pinned progress from the section's top edge", () => {
    // A 3000px section in a 1000px window pins for 2000px of scroll.
    expect(pinnedProgress(0, 3000, 1000)).toBe(0);
    expect(pinnedProgress(-1000, 3000, 1000)).toBe(0.5);
    expect(pinnedProgress(-2000, 3000, 1000)).toBe(1);
    expect(pinnedProgress(-2600, 3000, 1000)).toBe(1);
    expect(pinnedProgress(300, 3000, 1000)).toBe(0);
    // A section no taller than the window never pins, which is the reduced-motion layout.
    expect(pinnedProgress(-200, 900, 1000)).toBe(0);
  });
});

describe("depth links", () => {
  it("reads the depth a link asks for", () => {
    expect(modeFromSearch("?depth=skim")).toBe("canopy");
    expect(modeFromSearch("?x=1&depth=read")).toBe("standard");
    expect(modeFromSearch("?depth=deep")).toBe("deep");
  });

  it("ignores a missing or unknown depth", () => {
    expect(modeFromSearch("")).toBeUndefined();
    expect(modeFromSearch("?depth=canopy")).toBeUndefined();
    expect(modeFromSearch("?depth=")).toBeUndefined();
  });

  it("builds a link that reads back as the same mode", () => {
    for (const mode of MODE_ORDER) {
      const link = new URL(depthLink(mode, { origin: "https://example.test", pathname: "/progressive-depth/" }));
      expect(link.origin + link.pathname).toBe("https://example.test/progressive-depth/");
      expect(link.hash).toBe("#try");
      expect(modeFromSearch(link.search)).toBe(mode);
    }
  });
});
