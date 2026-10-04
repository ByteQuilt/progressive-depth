import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Canopy, Mycelium, ProgressiveDepthProvider, Understory } from "../index";

describe("layers", () => {
  it("render their content directly, so content margins collapse between layers as in normal flow", () => {
    const { container } = render(
      <ProgressiveDepthProvider defaultMode="deep" showToggle={false}>
        <Canopy>
          <p>Claim</p>
        </Canopy>
        <Understory>
          <p>Context</p>
        </Understory>
        <Mycelium>
          <p>Detail</p>
        </Mycelium>
      </ProgressiveDepthProvider>,
    );

    for (const layer of ["canopy", "understory", "mycelium"]) {
      expect(container.querySelector(`.progressive-depth-${layer}`)?.firstElementChild?.tagName).toBe("P");
    }
  });

  it("mark hidden layers aria-hidden", () => {
    const { container } = render(
      <ProgressiveDepthProvider defaultMode="canopy" showToggle={false}>
        <Understory>
          <a href="#more">More</a>
        </Understory>
      </ProgressiveDepthProvider>,
    );
    expect(container.querySelector(".progressive-depth-understory")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("styles.css", () => {
  const css = readFileSync(join(__dirname, "..", "styles.css"), "utf8");
  const hiddenRule = css.match(/\[data-pd-visible="false"\][^{]*\{([^}]*)\}/)?.[1] ?? "";
  const visibleRule = css.match(/\[data-pd-visible="true"\][^{]*\{([^}]*)\}/)?.[1] ?? "";

  it("takes hidden layers out of the tab order and the accessibility tree", () => {
    expect(hiddenRule).toMatch(/visibility:\s*hidden/);
  });

  it("collapses layers to height 0 and opens them to auto, with no max-height cap", () => {
    expect(hiddenRule).toMatch(/height:\s*0/);
    expect(visibleRule).toMatch(/height:\s*auto/);
    expect(css).not.toMatch(/max-height:\s*\d/);
    expect(css).toMatch(/interpolate-size:\s*allow-keywords/);
  });

  it("keeps visible layers free of overflow clipping, so content margins still collapse", () => {
    expect(visibleRule).not.toMatch(/overflow/);
  });
});
