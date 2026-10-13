import { LAYER_ORDER } from "@bytequilt/progressive-depth";
import { DepthArt } from "../demo/DepthArt";
import { NPM_URL, REPO_URL } from "./links";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="top-heading">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">A content format and React library</p>
          <h1 id="top-heading">
            Let every reader
            <br />
            <em>choose how far</em>
            <br />
            to go.
          </h1>
          <p className="hero-intro">
            Progressive Depth splits each section of a post into three layers: the claim, the reasoning and the evidence. Readers pick how many layers to see.
          </p>
          <div className="hero-actions">
            <a className="button" href="#try">
              Try it
            </a>
            <a className="text-link" href={REPO_URL}>
              View on GitHub
            </a>
            <a className="text-link" href={NPM_URL}>
              View on npm
            </a>
          </div>
        </div>
        <DepthArt layers={LAYER_ORDER} variant="hero" />
      </div>
    </section>
  );
}
