import { DEFAULT_VISIBILITY_MAP, LAYER_ORDER, MODE_ORDER } from "@bytequilt/progressive-depth";
import { describe, expect, it } from "vitest";
import { ARTICLE } from "../content/article";
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
