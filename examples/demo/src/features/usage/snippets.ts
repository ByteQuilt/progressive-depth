export const INSTALL = "npm install @bytequilt/progressive-depth";

export const QUICK_START = `import {
  ProgressiveDepthProvider,
  Canopy,
  Understory,
  Mycelium,
} from "@bytequilt/progressive-depth";
import "@bytequilt/progressive-depth/styles.css";

function BlogPost() {
  return (
    <ProgressiveDepthProvider
      toggleLabels={{
        canopy: { label: "Skim", description: "Skim: just the key points" },
        standard: { label: "Read", description: "Read: key points and context" },
        deep: { label: "Deep Dive", description: "Deep Dive: the full picture" },
      }}
    >
      <h2>Section Title</h2>
      <Canopy>
        <p>The claim. A complete thought in one or two sentences.</p>
      </Canopy>
      <Understory>
        <p>Context and reasoning. Why the claim holds.</p>
      </Understory>
      <Mycelium>
        <p>Examples, evidence and technical detail.</p>
      </Mycelium>
    </ProgressiveDepthProvider>
  );
}`;

export const MARKDOC = `## Section Title

{% canopy %}
The claim. A complete thought in one or two sentences.
{% /canopy %}

{% understory %}
Context and reasoning. Why the claim holds.
{% /understory %}

{% mycelium %}
Examples, evidence and technical detail.
{% /mycelium %}`;
