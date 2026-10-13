import { PHI } from "@bytequilt/progressive-depth";

const LAYERS = [
  { name: "Canopy", view: "The 10-foot view", text: "The claim, in one or two sentences. A reader who only reads canopies should still follow the argument." },
  { name: "Understory", view: "The 5-foot view", text: "Context and reasoning. It adds something the canopy didn't say, usually in one paragraph." },
  { name: "Mycelium", view: "The deep dive", text: "Evidence, examples and detail. The only layer with no length limit." },
];

export function Idea() {
  return (
    <section className="idea-section" id="idea" aria-labelledby="idea-heading">
      <div className="wrap">
        <p className="section-label">01 / The idea</p>
        <div className="idea-grid">
          <h2 id="idea-heading">
            One post,
            <br />
            <em>three depths.</em>
          </h2>
          <div className="idea-body">
            <p className="large-copy">Each section carries its claim, its reasoning and its evidence. The reader chooses how much of that to see.</p>
            <p>
              The layers are named for a forest: the canopy you see from a distance, the understory beneath it, and the mycelium underground. Each layer is
              meant to run about {PHI} times as long as the one above it, the golden ratio.
            </p>
            <p>
              A toggle sets the reading mode. Skim shows the canopy, Read adds the understory, and Deep Dive shows everything. Deep Dive is the default, so
              nobody misses content by accident.
            </p>
          </div>
        </div>
        <ol className="layer-list">
          {LAYERS.map((layer) => (
            <li key={layer.name}>
              <h3>{layer.name}</h3>
              <p className="layer-view">{layer.view}</p>
              <p>{layer.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
