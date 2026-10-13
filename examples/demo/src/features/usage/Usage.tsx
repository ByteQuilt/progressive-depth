import { Canopy, Mycelium, ProgressiveDepthProvider, Understory } from "@bytequilt/progressive-depth";
import { ARTICLE } from "../../content/article";
import { INSTALL, MARKDOC, QUICK_START } from "./snippets";

const SAMPLE = ARTICLE[0];

export function Usage() {
  return (
    <section className="use-section" id="use" aria-labelledby="use-heading">
      <div className="wrap">
        <p className="section-label">03 / Use it</p>
        <h2 id="use-heading">
          Add it to
          <br />
          <em>a React app.</em>
        </h2>
        <p className="use-intro">
          Install the package, import its stylesheet, and wrap a section in <code>ProgressiveDepthProvider</code>. It renders a Skim, Read and Deep Dive toggle
          for you. The default mode is Deep Dive, so readers see everything until they choose otherwise.
        </p>

        <div className="use-grid">
          <div>
            <pre className="code">
              <code>{INSTALL}</code>
            </pre>
            <pre className="code">
              <code>{QUICK_START}</code>
            </pre>
          </div>
          <div>
            <h3>The same code, running</h3>
            <p className="use-note">This block uses the built-in toggle with its default labels and starts in Skim.</p>
            <div className="use-live">
              <ProgressiveDepthProvider defaultMode="canopy">
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
            <h3>Writing in Markdoc</h3>
            <p className="use-note">
              The format maps to Markdoc tags. The <a href="https://github.com/ByteQuilt/progressive-depth/tree/main/markdoc">markdoc folder</a> has the tag
              definitions to copy into your config.
            </p>
            <pre className="code">
              <code>{MARKDOC}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
