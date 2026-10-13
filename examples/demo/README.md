# Progressive Depth demo

The demo site for [Progressive Depth](../../README.md). It renders a short sample post with the package built from this repository, so it exercises the real components and hooks rather than mocks.

When Pages is enabled for the repository, the site is published by [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml) at <https://bytequilt.github.io/progressive-depth/>.

## What it shows

- **Reading modes.** Three buttons built with `useToggle` set Skim, Read or Deep Dive. The arrow keys, Home and End move between them.
- **Layer components.** `Canopy`, `Understory` and `Mycelium` render the sample post inside `ProgressiveDepthProvider`.
- **Visibility maps.** The Layer rules menu passes a different `visibilityMap` to the provider, and the table below it shows what each mode then displays.
- **Theming.** The Theme menu sets a few `--pd-*` custom properties on the article.
- **Persistence.** `usePersistence` saves the chosen mode in `localStorage` and restores it on the next visit. If the browser blocks storage, the demo skips persistence.
- **The built-in toggle.** The Use it section renders the provider's own toggle next to the code that produces it.

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
├── core/       Pure logic: word counts, reading time, visibility presets, themes, storage. No React components.
├── features/   UI by feature: demo, site (header, hero, footer) and usage.
├── styles/     Plain CSS: tokens, base, sections, demo.
└── __tests__/  Unit tests for core/ and an app test that clicks through the real package.
```

## Publishing

In the repository settings, set Pages to deploy from GitHub Actions. After that, [the workflow](../../.github/workflows/pages.yml) rebuilds and deploys the site on pushes to `main` that change the package or the demo. Its `paths` filter lists exactly which files.
