import { Canopy, Mycelium, ProgressiveDepthProvider, Understory } from "@bytequilt/progressive-depth";
import { ARTICLE } from "../../content/article";
import { Terminal } from "./Terminal";

const SAMPLE = ARTICLE[0];

export function Usage() {
  return (
    <section className="use" id="use" data-tone="dark" aria-labelledby="use-heading">
      <div className="wrap">
        <h2 id="use-heading">
          Add it to
          <br />
          <em>a React app.</em>
        </h2>
        <div className="use-intro">
          <Canopy>
            <p>
              Install the package, import its stylesheet, and wrap a section in <code>ProgressiveDepthProvider</code>.
            </p>
          </Canopy>
          <Understory>
            <p>It renders a Skim, Read and Deep Dive toggle for you.</p>
          </Understory>
          <Mycelium>
            <p>The default mode is Deep Dive, so readers see everything until they choose otherwise.</p>
          </Mycelium>
        </div>

        <div className="use-grid">
          <Terminal />
          <div className="use-demo">
            <h3>The same code, running</h3>
            <p className="use-note">This block's toggle labels are set to Skim, Read and Deep Dive, and it starts in Skim.</p>
            <div className="use-live">
              <ProgressiveDepthProvider
                defaultMode="canopy"
                toggleLabels={{
                  canopy: { label: "Skim", description: "Skim: just the key points" },
                  standard: { label: "Read", description: "Read: key points and context" },
                  deep: { label: "Deep Dive", description: "Deep Dive: the full picture" },
                }}
              >
                <h4>{SAMPLE.heading}</h4>
                <Canopy>
                  <p>{SAMPLE.layers.canopy[0]}</p>
                </Canopy>
                <Understory>
                  <p>{SAMPLE.layers.understory[0]}</p>
                </Understory>
                <Mycelium>
                  {SAMPLE.layers.mycelium.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </Mycelium>
              </ProgressiveDepthProvider>
            </div>
          </div>
        </div>

        <p className="use-note use-markdoc">
          Writing in Markdoc? The format maps to Markdoc tags, and the{" "}
          <a href="https://github.com/ByteQuilt/progressive-depth/tree/main/markdoc">markdoc folder</a> has the tag definitions to copy into your config.
        </p>
      </div>
    </section>
  );
}
