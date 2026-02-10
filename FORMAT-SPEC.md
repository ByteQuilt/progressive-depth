# Progressive Depth Format Specification

**Version:** 1.0.0

## Overview

Progressive Depth is a content format that structures long-form writing in
three layers of depth per section. Readers choose their depth through a
reading mode toggle, getting value at whatever commitment level they bring.

## Layers

Each section of a Progressive Depth document contains up to three layers:

### Canopy

The top-level claim. One or two sentences that state the takeaway.

**Requirements:**
- Must be a complete, standalone thought
- Must be the claim, not the evidence
- A reader who only reads canopies should understand the full argument
- Approximate length: 40-60 words

### Understory

Context and reasoning that supports the canopy claim.

**Requirements:**
- Must add new information, not rephrase the canopy
- Answers "why" or "how" at a high level
- One to two paragraphs maximum
- Approximate length: 65-100 words (φ × canopy)

### Mycelium

The full depth. Examples, evidence, technical details, stories.

**Requirements:**
- Multiple paragraphs permitted
- May include code blocks, images, and other rich content
- Every sentence should earn its place
- Approximate length: 105-160 words (φ² × canopy)

## Proportional Scaling

Content scales between layers following the golden ratio (φ ≈ 1.618):

```
canopy     ×1      (~50 words)
understory ×φ      (~80 words)
mycelium   ×φ²     (~130 words)
```

These are proportional guidelines, not rigid targets. The goal is a
natural sense of deepening. If a canopy is longer than its understory,
or an understory is longer than its mycelium, the proportions are wrong.

## Reading Modes

Three reading modes control layer visibility:

| Mode | Visible Layers | Use Case |
|------|----------------|----------|
| Skim | Canopy | Under 2 minutes. Just the claims. |
| Read | Canopy + Understory | Standard article experience. |
| Deep Dive | All | The complete picture. |

**Default mode is Deep Dive.** No content is hidden by default. The
toggle exists for readers who want to skim, not as a barrier that
forces clicking for more.

## Document Structure

A Progressive Depth document consists of:

1. A title and optional introduction (not layered)
2. One or more sections, each containing:
   - A section heading
   - A canopy layer (required)
   - An understory layer (optional, but recommended)
   - A mycelium layer (optional)
3. An optional conclusion (not layered)

Not every section requires all three layers. Short sections that don't
warrant depth can use canopy only, or canopy + understory. The format
should serve the content, not the other way around.

## Markup

### Markdoc

```markdoc
{% canopy %}
Content here.
{% /canopy %}

{% understory %}
Content here.
{% /understory %}

{% mycelium %}
Content here.
{% /mycelium %}
```

### HTML (semantic)

```html
<div class="progressive-depth-canopy" data-pd-layer="canopy">
  <p>Content here.</p>
</div>

<div class="progressive-depth-understory" data-pd-layer="understory">
  <p>Content here.</p>
</div>

<div class="progressive-depth-mycelium" data-pd-layer="mycelium">
  <p>Content here.</p>
</div>
```

## Visual Treatment

The specification does not prescribe a visual design. Implementations
should provide their own styling. However, the following visual
hierarchy is recommended:

- **Canopy** text should be visually prominent (larger, bolder, or
  higher contrast)
- **Understory** text should use standard body styling
- **Mycelium** text should visually recede (slightly smaller, lighter,
  or indented with a border)

The visual hierarchy should communicate depth even without the
interactive toggle, so the format works on any rendering platform.

## Accessibility

Implementations must ensure:

- All layers are accessible to screen readers regardless of reading mode
- The toggle is keyboard navigable
- Hidden layers use appropriate ARIA attributes (not `display: none`)
- Color contrast meets WCAG AA for all layers

## Naming

The layer names come from forest ecology:

- **Canopy**: The top of the forest. Visible from a distance.
- **Understory**: The middle layer. Requires stepping closer.
- **Mycelium**: The hidden network beneath the surface.

Implementations may use these names directly or provide aliases, but
the semantic meaning of each layer should be preserved.
