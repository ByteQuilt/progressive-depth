import { Canopy, Mycelium, PHI, Understory } from "@bytequilt/progressive-depth";

/** Each layer runs about phi times as long as the one above it, so the bars are 1, phi and phi squared, scaled to the longest. */
const LAYERS = [
  {
    name: "Canopy",
    view: "The 10-foot view",
    text: "The claim, in one or two sentences. A reader who only reads canopies should still follow the argument.",
    length: 1 / PHI ** 2,
  },
  {
    name: "Understory",
    view: "The 5-foot view",
    text: "Context and reasoning. It adds something the canopy didn't say, usually in one paragraph.",
    length: 1 / PHI,
  },
  { name: "Mycelium", view: "The deep dive", text: "Evidence, examples and detail. The only layer with real freedom of length.", length: 1 },
];

/** The explanation is written in the format it explains: the page's depth dial changes what shows here. */
export function Idea() {
  return (
    <section className="idea" id="idea" data-tone="dark" aria-labelledby="idea-heading">
      <div className="wrap">
        <div className="idea-grid">
          <h2 id="idea-heading">
            One post,
            <br />
            <em>three depths.</em>
          </h2>
          <div className="idea-body">
            <Canopy className="idea-claim">
              <p>Each section carries its claim, its reasoning and its evidence. The reader chooses how much of that to see.</p>
            </Canopy>
            <Understory>
              <p>
                The layers are named for a forest: the canopy you see from a distance, the understory beneath it, and the mycelium underground. Each layer is
                meant to run about {PHI} times as long as the one above it, the golden ratio.
              </p>
            </Understory>
            <Mycelium>
              <p>
                A toggle sets the reading mode. Skim shows the canopy, Read adds the understory, and Deep Dive shows everything. Deep Dive is the default, so
                nobody misses content by accident.
              </p>
            </Mycelium>
          </div>
        </div>

        <ol className="strata">
          {LAYERS.map((layer) => (
            <li key={layer.name} data-layer={layer.name.toLowerCase()}>
              <h3>{layer.name}</h3>
              <p className="strata-view">{layer.view}</p>
              <p className="strata-text">{layer.text}</p>
              <span className="strata-bar" style={{ "--length": layer.length } as React.CSSProperties} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
