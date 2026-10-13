import { LAYER_ORDER } from "@bytequilt/progressive-depth";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import { RULES_PRESETS } from "../core/rules";

const STORAGE_KEY = "progressive-depth-mode";

function demoSection() {
  return within(document.getElementById("try") as HTMLElement);
}

function layerStates(root: HTMLElement, layer: string) {
  return [...root.querySelectorAll(`.progressive-depth-${layer}`)].map((el) => el.getAttribute("data-pd-visible"));
}

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe("App", () => {
  it("starts in Skim and shows only the canopy of the sample post", () => {
    render(<App />);
    const demo = demoSection();
    expect(demo.getByRole("radio", { name: "Skim canopy" }).getAttribute("aria-checked")).toBe("true");
    const root = document.getElementById("try") as HTMLElement;
    expect(layerStates(root, "canopy")).toEqual(["true", "true", "true"]);
    expect(layerStates(root, "understory")).toEqual(["false", "false", "false"]);
    expect(layerStates(root, "mycelium")).toEqual(["false", "false", "false"]);
  });

  it("opens more layers, updates the readout and saves the mode", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();
    const skimWords = demo.getByRole("status").textContent;

    await user.click(demo.getByRole("radio", { name: "Read canopy and understory" }));
    const root = document.getElementById("try") as HTMLElement;
    expect(layerStates(root, "understory")).toEqual(["true", "true", "true"]);
    expect(layerStates(root, "mycelium")).toEqual(["false", "false", "false"]);
    expect(demo.getByRole("status").textContent).not.toBe(skimWords);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("standard");
  });

  it("moves between modes with the arrow keys and Home", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();
    demo.getByRole("radio", { name: "Skim canopy" }).focus();

    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(demo.getByRole("radio", { name: "Deep Dive canopy, understory and mycelium" }).getAttribute("aria-checked")).toBe("true");

    await user.keyboard("{Home}");
    expect(demo.getByRole("radio", { name: "Skim canopy" }).getAttribute("aria-checked")).toBe("true");
  });

  it("restores the saved mode on load", () => {
    window.localStorage.setItem(STORAGE_KEY, "deep");
    render(<App />);
    expect(
      demoSection()
        .getByRole("radio", { name: /^Deep Dive/ })
        .getAttribute("aria-checked"),
    ).toBe("true");
  });

  it("applies the selected layer rules", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();

    await user.selectOptions(demo.getByLabelText("Layer rules"), "claims-evidence");
    await user.click(demo.getByRole("radio", { name: "Read canopy and mycelium" }));
    const root = document.getElementById("try") as HTMLElement;
    expect(layerStates(root, "understory")).toEqual(["false", "false", "false"]);
    expect(layerStates(root, "mycelium")).toEqual(["true", "true", "true"]);
  });

  it("keeps the table, readout and art in step with the rendered article under every layer rule", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();
    const root = document.getElementById("try") as HTMLElement;
    const article = root.querySelector(".article") as HTMLElement;

    for (const preset of RULES_PRESETS) {
      await user.selectOptions(demo.getByLabelText("Layer rules"), preset.id);
      for (const radio of demo.getAllByRole("radio")) {
        await user.click(radio);
        const rendered = LAYER_ORDER.filter((layer) => layerStates(article, layer).every((state) => state === "true"));
        const row = root.querySelector("tr[aria-current='true']") as HTMLElement;
        const legend = [...root.querySelectorAll(".art-legend li")];

        expect(rendered).toContain("canopy");
        expect(LAYER_ORDER.filter((_, i) => row.querySelectorAll("td")[i].getAttribute("data-shown") === "true")).toEqual(rendered);
        expect(legend.filter((item) => item.getAttribute("data-shown") === "true").map((item) => item.getAttribute("data-layer"))).toEqual(rendered);
        expect(demo.getByRole("status").textContent).toContain(`${rendered.length} of ${LAYER_ORDER.length} layers`);
      }
    }
  });

  it("applies the selected theme to the article", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();

    await user.selectOptions(demo.getByLabelText("Theme"), "large");
    const themed = document.querySelector<HTMLElement>("#try .article")?.parentElement as HTMLElement;
    expect(themed.style.getPropertyValue("--pd-canopy-font-size")).toBe("1.55rem");
  });

  it("renders the built-in toggle in the usage example", async () => {
    const user = userEvent.setup();
    render(<App />);
    const use = within(document.getElementById("use") as HTMLElement);
    const live = document.querySelector(".use-live") as HTMLElement;

    expect(layerStates(live, "mycelium")).toEqual(["false"]);
    await user.click(use.getByRole("radio", { name: "Skim: just the key points" }));
    await user.click(use.getByRole("radio", { name: "Read: key points and context" }));
    expect(layerStates(live, "understory")).toEqual(["true"]);
    expect(layerStates(live, "mycelium")).toEqual(["false"]);
    await user.click(use.getByRole("radio", { name: "Deep Dive: the full picture" }));
    expect(layerStates(live, "mycelium")).toEqual(["true"]);
    expect(screen.getAllByRole("radiogroup", { name: "Reading depth" })).toHaveLength(2);
  });
});
