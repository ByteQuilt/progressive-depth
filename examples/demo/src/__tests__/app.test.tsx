import { LAYER_ORDER } from "@bytequilt/progressive-depth";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { RULES_PRESETS } from "../core/rules";

const STORAGE_KEY = "progressive-depth-mode";

function section(id: string) {
  return document.getElementById(id) as HTMLElement;
}

function demoSection() {
  return within(section("try"));
}

function layerStates(root: HTMLElement, layer: string) {
  return [...root.querySelectorAll(`.progressive-depth-${layer}`)].map((el) => el.getAttribute("data-pd-visible"));
}

/** The demo's summary of what the current mode leaves on the page. */
function readout() {
  return section("try").querySelector(".readout")?.textContent;
}

function dial() {
  return within(screen.getByRole("complementary", { name: "Page depth" }));
}

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
  vi.restoreAllMocks();
});

describe("App", () => {
  it("opens at Deep Dive, so a first-time visitor misses nothing", () => {
    render(<App />);
    expect(
      dial()
        .getByRole("radio", { name: /^Deep Dive/ })
        .getAttribute("aria-checked"),
    ).toBe("true");
    expect(
      demoSection()
        .getByRole("radio", { name: /^Deep Dive/ })
        .getAttribute("aria-checked"),
    ).toBe("true");
    // The usage example's own toggle starts in Skim on purpose, so it is left out here.
    const copy = [section("idea"), section("try"), section("use").querySelector(".use-intro") as HTMLElement];
    for (const root of copy) for (const layer of LAYER_ORDER) expect(layerStates(root, layer).every((state) => state === "true")).toBe(true);
  });

  it("lets the dial reduce the whole page, including the copy that explains the format", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(dial().getByRole("radio", { name: /^Skim/ }));
    for (const root of [section("idea"), section("try"), section("use").querySelector(".use-intro") as HTMLElement]) {
      expect(layerStates(root, "canopy").every((state) => state === "true")).toBe(true);
      expect(layerStates(root, "understory").every((state) => state === "false")).toBe(true);
      expect(layerStates(root, "mycelium").every((state) => state === "false")).toBe(true);
    }
    expect(demoSection().getByRole("radio", { name: "Skim canopy" }).getAttribute("aria-checked")).toBe("true");
  });

  it("keeps the demo picker and the dial on one shared mode, and saves it", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();
    const before = readout();

    await user.click(demo.getByRole("radio", { name: "Read canopy and understory" }));
    expect(dial().getByRole("radio", { name: /^Read/ }).getAttribute("aria-checked")).toBe("true");
    expect(layerStates(section("idea"), "understory").every((state) => state === "true")).toBe(true);
    expect(layerStates(section("idea"), "mycelium").every((state) => state === "false")).toBe(true);
    expect(readout()).not.toBe(before);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("standard");
  });

  it("moves between modes with the arrow keys and Home", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();
    await user.click(demo.getByRole("radio", { name: "Skim canopy" }));
    demo.getByRole("radio", { name: "Skim canopy" }).focus();

    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(demo.getByRole("radio", { name: "Deep Dive canopy, understory and mycelium" }).getAttribute("aria-checked")).toBe("true");

    await user.keyboard("{Home}");
    expect(demo.getByRole("radio", { name: "Skim canopy" }).getAttribute("aria-checked")).toBe("true");
  });

  it("restores the saved mode on load", () => {
    window.localStorage.setItem(STORAGE_KEY, "canopy");
    render(<App />);
    expect(dial().getByRole("radio", { name: /^Skim/ }).getAttribute("aria-checked")).toBe("true");
  });

  describe("a shared depth link", () => {
    it("opens the page at the linked depth without overriding the visitor's saved preference", async () => {
      window.localStorage.setItem(STORAGE_KEY, "deep");
      window.history.replaceState({}, "", "/?depth=skim");
      const user = userEvent.setup();
      render(<App />);

      expect(dial().getByRole("radio", { name: /^Skim/ }).getAttribute("aria-checked")).toBe("true");
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("deep");

      await user.click(dial().getByRole("radio", { name: /^Read/ }));
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("standard");
    });

    it("ignores an unknown depth", () => {
      window.history.replaceState({}, "", "/?depth=sideways");
      render(<App />);
      expect(
        dial()
          .getByRole("radio", { name: /^Deep Dive/ })
          .getAttribute("aria-checked"),
      ).toBe("true");
    });

    it("copies a link that opens at the current depth", async () => {
      const user = userEvent.setup();
      const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
      render(<App />);

      await user.click(dial().getByRole("radio", { name: /^Read/ }));
      await user.click(demoSection().getByRole("button", { name: "Copy a link that opens at Read" }));
      expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/?depth=read#try`);
      expect(await demoSection().findByRole("button", { name: "Link copied" })).toBeTruthy();
    });
  });

  it("applies the selected layer rules to the sample post only", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();

    await user.selectOptions(demo.getByLabelText("Layer rules"), "claims-evidence");
    await user.click(demo.getByRole("radio", { name: "Read canopy and mycelium" }));
    expect(layerStates(section("try"), "understory").every((state) => state === "false")).toBe(true);
    expect(layerStates(section("try"), "mycelium").every((state) => state === "true")).toBe(true);
    // The page's own copy keeps the default rules, where Read shows the understory.
    expect(layerStates(section("idea"), "understory").every((state) => state === "true")).toBe(true);
  });

  it("keeps the table, readout and art in step with the rendered article under every layer rule", async () => {
    const user = userEvent.setup();
    render(<App />);
    const demo = demoSection();
    const root = section("try");
    const article = root.querySelector(".article") as HTMLElement;

    for (const preset of RULES_PRESETS) {
      await user.selectOptions(demo.getByLabelText("Layer rules"), preset.id);
      for (const radio of demo.getAllByRole("radio")) {
        await user.click(radio);
        const rendered = LAYER_ORDER.filter((layer) => layerStates(article, layer).every((state) => state === "true"));
        const row = root.querySelector("tr[aria-current='true']") as HTMLElement;
        const legend = [...root.querySelectorAll(".art-legend li")];
        const bar = [...root.querySelectorAll(".wordbar-segment")];

        expect(rendered).toContain("canopy");
        expect(LAYER_ORDER.filter((_, i) => row.querySelectorAll("td")[i].getAttribute("data-shown") === "true")).toEqual(rendered);
        expect(legend.filter((item) => item.getAttribute("data-shown") === "true").map((item) => item.getAttribute("data-layer"))).toEqual(rendered);
        expect(bar.filter((item) => item.getAttribute("data-shown") === "true").map((item) => item.getAttribute("data-layer"))).toEqual(rendered);
        expect(readout()).toContain(`${rendered.length} of ${LAYER_ORDER.length} layers`);
      }
    }
  });

  it("applies the selected theme to the article", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(demoSection().getByLabelText("Theme"), "large");
    const themed = section("try").querySelector<HTMLElement>(".article")?.parentElement as HTMLElement;
    expect(themed.style.getPropertyValue("--pd-canopy-font-size")).toBe("1.55rem");
  });

  it("renders the built-in toggle in the usage example", async () => {
    const user = userEvent.setup();
    render(<App />);
    const use = within(section("use"));
    const live = section("use").querySelector(".use-live") as HTMLElement;

    expect(layerStates(live, "mycelium")).toEqual(["false"]);
    await user.click(use.getByRole("radio", { name: "Skim: just the key points" }));
    await user.click(use.getByRole("radio", { name: "Read: key points and context" }));
    expect(layerStates(live, "understory")).toEqual(["true"]);
    expect(layerStates(live, "mycelium")).toEqual(["false"]);
    await user.click(use.getByRole("radio", { name: "Deep Dive: the full picture" }));
    expect(layerStates(live, "mycelium")).toEqual(["true"]);
    // The dial, the demo picker and this example are three independent radio groups.
    expect(screen.getAllByRole("radiogroup", { name: "Reading depth" })).toHaveLength(3);
  });

  describe("install command", () => {
    it("copies the command and says so", async () => {
      const user = userEvent.setup();
      const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
      render(<App />);

      await user.click(within(section("top")).getByRole("button", { name: "Copy npm install @bytequilt/progressive-depth" }));
      expect(writeText).toHaveBeenCalledWith("npm install @bytequilt/progressive-depth");
      expect(await within(section("top")).findByText("Install command copied to the clipboard.")).toBeTruthy();
    });

    it("tells the visitor when the browser refuses", async () => {
      const user = userEvent.setup();
      vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
      render(<App />);

      await user.click(within(section("start")).getByRole("button", { name: /^Copy npm install/ }));
      expect(await within(section("start")).findByText(/Copying failed/)).toBeTruthy();
    });
  });

  describe("setup terminal", () => {
    it("shows one snippet at a time and moves between tabs with the arrow keys", async () => {
      const user = userEvent.setup();
      render(<App />);
      const use = within(section("use"));

      expect(use.getByRole("tab", { name: "React" }).getAttribute("aria-selected")).toBe("true");
      expect(use.getByRole("tabpanel").textContent).toContain("BlogPost");

      use.getByRole("tab", { name: "React" }).focus();
      await user.keyboard("{ArrowRight}");
      expect(use.getByRole("tab", { name: "Markdoc" }).getAttribute("aria-selected")).toBe("true");
      expect(use.getByRole("tabpanel").textContent).toContain("{% canopy %}");

      await user.keyboard("{Home}");
      expect(use.getByRole("tab", { name: "Install" }).getAttribute("aria-selected")).toBe("true");
      expect(use.getByRole("tabpanel").textContent).toBe("npm install @bytequilt/progressive-depth");
    });
  });
});
