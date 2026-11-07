import { InstallCommand } from "./InstallCommand";
import { NPM_URL, REPO_URL } from "./links";

/** The brand mark's octagon, drawn at 880 units wide and centred in a 1000 unit box. Every ring reuses it at a different scale. */
const OCTAGON = "M60 234 234 60H766L940 234V766L766 940H234L60 766Z";

/** Hairline octagons inside a ring, as fractions of its size. They read as strata when the camera is inside. */
const CANOPY_CONTOURS = [0.93, 0.86, 0.79];
const UNDERSTORY_CONTOURS = [0.88, 0.76];

/** Hand-drawn root network in the mycelium ring's own coordinates. The ring is small, so the roots reach far outside it. */
const ROOTS = [
  "M500 500C420 380 300 330 120 340S-300 260-620 120",
  "M500 500C640 380 760 300 940 330S1320 270 1560 90",
  "M500 500C560 640 540 800 640 960S780 1300 700 1560",
  "M500 500C380 620 240 700 170 860S-60 1180-300 1420",
  "M500 500C560 330 520 160 620 20S800-300 1000-520",
  "M500 500C360 460 200 520 20 480S-380 560-700 700",
  "M940 330C1000 420 1120 470 1220 620",
  "M120 340C60 220 0 160-60 20",
  "M640 960C520 1020 420 1160 300 1240",
  "M620 20C720-20 860 20 960-120",
  "M170 860C260 900 300 1000 280 1120",
  "M20 480C-40 400-160 380-260 300",
  "M1220 620C1320 600 1400 660 1480 780",
  "M1000-520C1060-420 1160-380 1260-420",
  "M-300 1420C-200 1380-80 1400 20 1480",
  "M540 800C440 860 380 960 400 1100",
];
const NODES: [number, number][] = [
  [120, 340],
  [940, 330],
  [640, 960],
  [170, 860],
  [620, 20],
  [20, 480],
];

/** Faint octagons around the mycelium core, so it reads as the source of the roots rather than a flat shape. */
const HALOS = [3.2, 2.1, 1.45];

const LAYER_KEY = [
  { name: "Canopy", role: "the claim" },
  { name: "Understory", role: "the reasoning" },
  { name: "Mycelium", role: "the evidence" },
];

/**
 * The hero. Scrolling dives through the three layers: the page turns from paper to cobalt to ink while
 * the claim, the reasoning and the evidence take turns on screen. The scroll engine writes the custom
 * properties that drive it. Without motion the section is a single static composition.
 */
export function Descent() {
  return (
    <section className="descent" id="top" data-tone="light" aria-labelledby="top-heading">
      <div className="descent-stage">
        <svg className="descent-art" viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
          <g className="ring ring-canopy">
            <path className="ring-body" d={OCTAGON} />
            {CANOPY_CONTOURS.map((scale) => (
              <path key={scale} className="contour" d={OCTAGON} style={{ transform: `scale(${scale})` }} />
            ))}
          </g>
          <g className="ring ring-understory">
            <path className="ring-body" d={OCTAGON} />
            {UNDERSTORY_CONTOURS.map((scale) => (
              <path key={scale} className="contour" d={OCTAGON} style={{ transform: `scale(${scale})` }} />
            ))}
          </g>
          <g className="ring ring-mycelium">
            <g className="roots">
              {ROOTS.map((d) => (
                <path key={d} d={d} pathLength={1} />
              ))}
            </g>
            <g className="nodes">
              {NODES.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="26" />
              ))}
            </g>
            {HALOS.map((scale) => (
              <path key={scale} className="halo" d={OCTAGON} style={{ transform: `scale(${scale})` }} />
            ))}
            <path className="ring-body" d={OCTAGON} />
          </g>
        </svg>
        <div className="grain" aria-hidden="true" />

        <div className="descent-copy wrap">
          <h1 className="act act-canopy" id="top-heading">
            <span>Let every reader</span> <em>choose how far</em> <span>to go.</span>
          </h1>
          <p className="act act-understory">
            Progressive Depth splits each section of a post into three layers: <em>the claim, the reasoning and the evidence.</em>
          </p>
          <p className="act act-mycelium">
            Readers pick how many layers to see. <em>Nothing is cut;</em> the detail waits in the deepest layer.
          </p>
        </div>

        <div className="descent-dock wrap">
          <ul className="layer-key" aria-hidden="true">
            {LAYER_KEY.map((layer, i) => (
              <li key={layer.name} style={{ opacity: `calc(0.4 + 0.6 * var(--act${i + 1}, ${i === 0 ? 1 : 0}))` }}>
                <strong>{layer.name}</strong> {layer.role}
              </li>
            ))}
          </ul>
          <div className="dock-actions">
            <InstallCommand />
            <a className="button" href="#try">
              Try it
            </a>
            <a className="text-link" href={REPO_URL}>
              GitHub
            </a>
            <a className="text-link" href={NPM_URL}>
              npm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
