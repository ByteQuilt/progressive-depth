import {
  ProgressiveDepthProvider,
  Canopy,
  Understory,
  Mycelium,
} from "@bytequilt/progressive-depth";
import "@bytequilt/progressive-depth/styles.css";
import "./index.css";

/**
 * Example: A blog post section using Progressive Depth.
 *
 * The provider wraps your content and renders a reading mode
 * toggle. All layer components within automatically respond
 * to the selected mode.
 */
export default function App() {
  return (
    <article className="content-wrapper">
      <h1>My Blog Post</h1>
      <p className="intro">An introduction that doesn't use depth layers.</p>

      <ProgressiveDepthProvider>
        {/* Section 1 */}
        <h2>The Snap On/Off Principle</h2>

        <Canopy>
          <p>
            Every external dependency in your system should be swappable without
            touching your core logic. Database, cache, search, messaging. Snap
            on today, snap off tomorrow.
          </p>
        </Canopy>

        <Understory>
          <p>
            Most codebases get locked into infrastructure decisions made in week
            one. You pick a database before you understand your data model.
            Eighteen months later, changing anything requires rewriting half the
            system because every layer has direct knowledge of the
            implementation.
          </p>
        </Understory>

        <Mycelium>
          <p>
            The structure is straightforward. Your domain defines what it needs
            through interfaces. Your infrastructure provides the how through
            adapters. Each adapter is self-contained and swappable.
          </p>
          <p>
            The critical insight: always build the in-memory adapter first. If
            your domain works against a hash map, your abstractions are clean.
            If it doesn't, you have a leak to fix.
          </p>
        </Mycelium>

        {/* Section 2 */}
        <h2>Why This Matters</h2>

        <Canopy>
          <p>
            Abstractions aren't overhead. When done right, they're the most
            valuable part of your architecture. They're what makes a system
            composable instead of just functional.
          </p>
        </Canopy>

        <Understory>
          <p>
            The cost of an abstraction is paid once, upfront. The cost of not
            having one is paid continuously, in ways you can't predict when
            you're making the decision. Teams that skip abstractions save a week
            and pay for it with months of rework.
          </p>
        </Understory>

        <Mycelium>
          <p>
            I've seen this pattern at every company I've worked at. The specific
            infrastructure changes, but the story is the same: a decision that
            seemed permanent turns out to be temporary, and the cost of changing
            it is proportional to how deeply it was embedded.
          </p>
          <p>
            Abstractions make that cost constant instead of proportional.
            They're insurance against the inevitable reality that your
            infrastructure decisions will need to change. The premium is small.
            The payout is enormous.
          </p>
        </Mycelium>
      </ProgressiveDepthProvider>
    </article>
  );
}
