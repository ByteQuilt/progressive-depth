# Markdoc Tag Schemas

Tag schemas for using Progressive Depth with [Markdoc](https://markdoc.dev/).

## Setup

### Tag Definitions

```typescript
// markdoc/tags/canopy.markdoc.ts
export const canopy = {
  render: 'Canopy',
  children: ['paragraph', 'list', 'heading', 'fence', 'blockquote', 'tag', 'hr'],
  attributes: {},
};

// markdoc/tags/understory.markdoc.ts
export const understory = {
  render: 'Understory',
  children: ['paragraph', 'list', 'heading', 'fence', 'blockquote', 'tag', 'hr'],
  attributes: {},
};

// markdoc/tags/mycelium.markdoc.ts
export const mycelium = {
  render: 'Mycelium',
  children: ['paragraph', 'list', 'heading', 'fence', 'blockquote', 'tag', 'hr'],
  attributes: {},
};
```

### Markdoc Config

```typescript
import Markdoc from '@markdoc/markdoc';
import { canopy } from './tags/canopy.markdoc';
import { understory } from './tags/understory.markdoc';
import { mycelium } from './tags/mycelium.markdoc';

const config = {
  tags: {
    canopy,
    understory,
    mycelium,
  },
};
```

### Component Mapping

```tsx
import {
  Canopy,
  Understory,
  Mycelium,
} from '@bytequilt/progressive-depth';

const components = {
  Canopy,
  Understory,
  Mycelium,
};

// Pass to your Markdoc renderer
Markdoc.renderers.react(content, React, { components });
```

## Keystatic Integration

If you use [Keystatic](https://keystatic.com/), add the layers as
content components:

```typescript
import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

// In your collection schema:
body: fields.markdoc({
  label: 'Body',
  components: {
    canopy: wrapper({
      label: 'Canopy (10ft view)',
      description: 'The top-level claim. 1-2 sentences.',
      schema: {},
    }),
    understory: wrapper({
      label: 'Understory (5ft view)',
      description: 'Context and reasoning. A short paragraph.',
      schema: {},
    }),
    mycelium: wrapper({
      label: 'Mycelium (Deep dive)',
      description: 'Full detail, examples, and evidence.',
      schema: {},
    }),
  },
}),
```

## Usage in Content

```markdoc
## Section Title

{% canopy %}
The claim. A complete thought in 1-2 sentences.
{% /canopy %}

{% understory %}
Context and reasoning. Why the claim matters.
{% /understory %}

{% mycelium %}
The full depth. Examples, code, evidence, stories.

This can span multiple paragraphs and include any
Markdoc content: code fences, images, lists, etc.
{% /mycelium %}
```
