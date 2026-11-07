import { useEffect } from "react";
import { pinnedProgress, stageAt } from "../../core/descent";

/** Height of the fixed header. A section counts as "under" the header once its top passes this line. */
const HEADER_LINE = 56;

/** Width in px of one SVG user unit in the hero drawing, whose viewBox is 1000 wide. */
const VIEWBOX_UNITS = 1000;

/**
 * One scroll listener drives the three things that must move together:
 * the hero's dive (CSS custom properties on `.descent-stage`), the page tone that recolours the fixed
 * header, and when the depth dial appears. It writes styles directly so scrolling never re-renders React.
 */
export function useScrollEngine() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".descent");
    const stage = hero?.querySelector<HTMLElement>(".descent-stage");
    const art = stage?.querySelector<SVGElement>(".descent-art");
    const idea = document.getElementById("idea");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!hero || !stage || !art || !idea || !footer) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      // Read layout first, then write, so a frame never forces a second layout.
      const live = !reduceMotion?.matches;
      const progress = live ? pinnedProgress(hero.getBoundingClientRect().top, hero.offsetHeight, window.innerHeight) : 0;
      const unit = art.getBoundingClientRect().width / VIEWBOX_UNITS || 1;
      const sectionTops = [...document.querySelectorAll<HTMLElement>("[data-tone]")].map((section) => ({
        section,
        top: section.getBoundingClientRect().top,
      }));
      const ideaTop = idea.getBoundingClientRect().top;
      const footerTop = footer.getBoundingClientRect().top;

      const s = stageAt(progress);
      const set = (name: string, value: number | string) => stage.style.setProperty(name, String(value));
      hero.dataset.tone = s.tone;
      for (const [i, scale] of s.scales.entries()) set(`--s${i + 1}`, scale.toFixed(4));
      for (const [i, turn] of s.turns.entries()) set(`--turn${i + 1}`, `${turn.toFixed(3)}deg`);
      for (const [i, opacity] of s.acts.entries()) set(`--act${i + 1}`, opacity.toFixed(3));
      set("--t1", s.paperToCobalt.toFixed(3));
      set("--t2", s.cobaltToInk.toFixed(3));
      set("--roots", s.roots.toFixed(3));
      set("--nodes", s.nodes.toFixed(3));
      // Root strokes sit inside the mycelium ring's scaled space, so divide the scale back out to keep them hairline.
      set("--root-width", (2.2 / (s.scales[2] * unit)).toFixed(3));

      // The last section whose top has passed the header decides the header's colours.
      let tone = "light";
      for (const { section, top } of sectionTops) if (top <= HEADER_LINE) tone = section.dataset.tone ?? tone;
      root.dataset.tone = tone;
      // The dial belongs to the reading sections: not over the hero, and out of the way of the footer links.
      root.dataset.dial = ideaTop < window.innerHeight * 0.6 && footerTop > window.innerHeight - 24 ? "on" : "off";
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduceMotion?.addEventListener?.("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduceMotion?.removeEventListener?.("change", schedule);
    };
  }, []);
}
