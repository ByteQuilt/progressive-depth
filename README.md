# Progressive Depth

A content format for how people actually read.

Progressive Depth structures blog posts and long-form writing in three layers of depth per section, so readers get value whether they spend two minutes or twenty. Instead of fighting short attention spans, the format designs for them.

## The Three Layers

Every section has three named layers inspired by forest ecology:

| Layer          | Purpose                                     | Scale |
| -------------- | ------------------------------------------- | ----- |
| **Canopy**     | The 10-foot view. The claim. 1-2 sentences. | 1x    |
| **Understory** | The 5-foot view. Context and reasoning.     | ~φx   |
| **Mycelium**   | The deep dive. Full detail and evidence.    | ~φ²x  |

Content scales between layers following the golden ratio (φ ≈ 1.618), creating a natural sense of deepening rather than repetition.

## Reading Modes

The format supports three reading experiences:

- **Skim**: Canopy only. The full argument in under 2 minutes.
- **Read**: Canopy + Understory. The standard article experience.
- **Deep Dive**: Everything. The complete picture.

A toggle lets readers choose their depth. The default shows everything, so nobody misses content by accident.

## Quick Start

```bash
npm install @bytequilt/progressive-depth
```

### React Component

```tsx
import {
  ProgressiveDepthProvider,
  Canopy,
  Understory,
  Mycelium,
} from "@bytequilt/progressive-depth";

function BlogPost() {
  return (
    <ProgressiveDepthProvider>
      <h2>Section Title</h2>
      <Canopy>
        <p>The claim. The takeaway. A complete thought in 1-2 sentences.</p>
      </Canopy>
      <Understory>
        <p>Context and reasoning. Why the claim matters. A short paragraph.</p>
      </Understory>
      <Mycelium>
        <p>The deep dive. Examples, evidence, technical details, stories.</p>
      </Mycelium>
    </ProgressiveDepthProvider>
  );
}
```

### Demo

Check out the [working demo](./examples/demo/README.md) to see a complete React application using the format.

### Markdoc Tags

If you use [Markdoc](https://markdoc.dev/) (including with [Keystatic](https://keystatic.com/)), the format maps to custom tags:

```markdoc
## Section Title

{% canopy %}
The claim. The takeaway. A complete thought in 1-2 sentences.
{% /canopy %}

{% understory %}
Context and reasoning. Why the claim matters. A short paragraph.
{% /understory %}

{% mycelium %}
The deep dive. Examples, evidence, technical details, stories.
{% /mycelium %}
```

See [markdoc/](./markdoc/) for tag schemas and configuration.

## Writing Guidelines

### Canopy Rules

- Must be a **complete thought**, not a hook or teaser
- Should be the **claim**, not the evidence
- A reader who only reads canopies should understand the full argument
- Should make you _want_ to read the understory without _needing_ to

### Understory Rules

- Must add **new information**, not rephrase the canopy
- Answers "why" or "how" at a high level
- One paragraph is usually right. Two if the reasoning requires a turn. Never more.

### Mycelium Rules

- The only layer with real freedom of length
- Multiple paragraphs, code blocks, images, whatever the section needs
- Every sentence should earn its place. Depth is not padding.

### The Ratio Check

After drafting a section, check the proportions. If the canopy is longer than the understory, something is wrong. If the understory is longer than the mycelium, the section probably doesn't need three layers. The golden ratio provides the gut check: each layer should be roughly 1.6x the previous one.

## Styling

The component ships with minimal functional styles and CSS custom properties for theming. Import the stylesheet, then override properties to match your site:

```css
/* Override custom properties on the root wrapper */
.progressive-depth {
  --pd-canopy-font-size: 1.2rem;
  --pd-canopy-font-weight: 500;
  --pd-canopy-color: #111111;

  --pd-understory-font-size: 1rem;
  --pd-understory-color: #333333;

  --pd-mycelium-font-size: 0.925rem;
  --pd-mycelium-color: #555555;
  --pd-mycelium-border-color: #e0e0e0;

  --pd-toggle-bg: #f0f0f0;
  --pd-toggle-button-padding: 8px 16px;
  --pd-toggle-button-font-size: 0.85rem;
}
```

## Philosophy

Progressive Depth is part of a broader design philosophy inspired by patterns in nature. The naming comes from forest ecology:

- **Canopy**: The top of the forest. Visible from a distance. What you see first.
- **Understory**: The middle layer. Sheltered, more detailed, requires stepping closer.
- **Mycelium**: The hidden network beneath the surface. The deepest connections.

The golden ratio scaling mirrors how natural systems distribute resources across layers.

Read the full introduction: [Introducing Progressive Depth](https://bytesbybrandon.com/blog/introducing-progressive-depth-a-blog-format-for-how-people-actually-read)

## Packages

| Package                                | Description                               |
| -------------------------------------- | ----------------------------------------- |
| `@bytequilt/progressive-depth`         | React components and reading mode context |
| `@bytequilt/progressive-depth-markdoc` | Markdoc tag schemas (coming soon)         |

## License

[MIT](./LICENSE) - Copyright (c) 2026 ByteQuilt LLC

Build on it. Adapt the naming. Design your own visual treatment. Make it yours.

---

Created by [Brandon D. Phillips](https://bytesbybrandon.com) at [ByteQuilt](https://bytequilt.com).
