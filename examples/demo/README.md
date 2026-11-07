# Progressive Depth demo

The demo site for [Progressive Depth](../../README.md). It renders a short sample post with the package built from this repository, so it exercises the real components and hooks rather than mocks.

When Pages is enabled for the repository, the site is published by [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml) at <https://bytequilt.github.io/progressive-depth/>.

## What it shows

The page is written in the format it explains, so using it is the demonstration.

- **The descent.** The hero is a pinned dive through three nested octagons, one per layer. Scrolling turns the ground from paper to cobalt to ink while the claim, the reasoning and the evidence take turns on screen. With `prefers-reduced-motion` it is a single still composition. The choreography is the pure function `stageAt` in [`src/core/descent.ts`](./src/core/descent.ts), and `useScrollEngine` writes its output as CSS custom properties without re-rendering React.
- **A page-wide depth dial.** Once the dive is over, a pill docked to the bottom of the screen sets the reading depth for the whole page. The explanation under "One post, three depths" and the intro under "Use it" are real `Canopy`, `Understory` and `Mycelium` components, so Skim shortens them. The dial is built with `useToggle`, so it is the same radio group a reader of your site would get.
- **One shared mode.** The dial, the picker in the demo and the layered copy share one `Provider`. The demo adds its own nested `Provider` that only swaps in the chosen `visibilityMap`.
- **Share at a depth.** "Copy a link that opens at Skim" copies a URL with `?depth=skim` (or `read`, `deep`). A link sets the depth on arrival but is not saved until the reader changes it, so it never overrides their own preference.
- **What a depth gives back.** The demo shows a sentence ("You are skipping 262 words. That is about 70 seconds back.") and a bar with one segment per layer, sized by its words.
- **Reading modes.** Three options built with `useToggle` set Skim, Read or Deep Dive. The arrow keys, Home and End move between them.
- **Visibility maps.** The Layer rules menu passes a different `visibilityMap` to the demo's provider, and the table below it shows what each mode then displays.
- **Theming.** The Theme menu sets a few `--pd-*` custom properties on the article.
- **Persistence.** `usePersistence` saves the chosen mode in `localStorage` and restores it on the next visit. If the browser blocks storage, the demo skips persistence.
- **The built-in toggle.** The Use it section renders the provider's own toggle next to the code that produces it, in one tabbed window with Install, React and Markdoc snippets. The running copy sets `toggleLabels` so each button's accessible name starts with its visible label (Skim, Read, Deep Dive); the library defaults don't.

## Run it

The demo links to the package in this repository, so build the package first.

```bash
pnpm install
pnpm build
cd examples/demo
pnpm install
pnpm dev
```

Open <http://localhost:5173>. Other scripts:

| Script           | What it does                                                                         |
| ---------------- | ------------------------------------------------------------------------------------ |
| `pnpm typecheck` | Type-checks the demo.                                                                |
| `pnpm test`      | Runs the demo tests against the real package.                                        |
| `pnpm build`     | Builds the site into `dist/` with the `/progressive-depth/` base path for Pages.     |
| `pnpm preview`   | Serves the build at <http://localhost:4173/progressive-depth/>.                      |

## Layout

```
src/
├── content/    The sample post, as data.
├── core/       Pure logic: the descent choreography, depth links, word counts, reading time, visibility presets, themes, storage. No React components.
├── features/   UI by feature: demo, site (header, descent hero, depth dial, closing, footer) and usage.
├── styles/     Plain CSS: tokens, base, sections, demo.
└── __tests__/  Unit tests for core/ and an app test that clicks through the real package.
```

## Publishing

In the repository settings, set Pages to deploy from GitHub Actions. After that, [the workflow](../../.github/workflows/pages.yml) rebuilds and deploys the site on pushes to `main` that change the package or the demo. Its `paths` filter lists exactly which files.
