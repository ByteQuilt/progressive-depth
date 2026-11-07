# React API and customization

Start with the [README example](../README.md#quick-start). React and React DOM
18 or later are peer dependencies. Import the separate stylesheet for the styled
components; the JavaScript entrypoint does not load it. The package provides ESM,
CommonJS and declarations ([package exports](../package.json)). Its build marks
the entrypoint `"use client"` for React Server Component frameworks
([build configuration](../tsup.config.ts)).

The authoritative export list is [src/index.ts](../src/index.ts). Option and
return-value contracts live in [src/core/types.ts](../src/core/types.ts).

## Modes and visibility

`ReadingMode` is `"canopy" | "standard" | "deep"`; `LayerName` is
`"canopy" | "understory" | "mycelium"`. Display labels are Skim, Read and Deep
Dive. Default visibility is:

| Mode | Visible layers |
| --- | --- |
| `canopy` | canopy |
| `standard` | canopy, understory |
| `deep` | canopy, understory, mycelium |

`VisibilityMap` is `Record<ReadingMode, LayerName[]>`. Pass a complete map to
change these rules. The supplied stylesheet collapses understory and mycelium;
a custom map that hides canopy requires custom CSS for canopy too.
See [default constants](../src/core/constants.ts) and
[visibility implementation](../src/core/visibility.ts).

The default layer components keep inactive layers mounted, expose
`aria-hidden="true"`, and the supplied
CSS removes hidden content from keyboard navigation. Deep Dive reveals all
layers with the default map. See the [visibility ADR](./adr/ADR-0001-layer-visibility.md).

## Styled components

All styled components use provider context. Without a provider, context defaults
to `deep` and its setter is a no-op ([context](../src/core/context.ts)).

| Export | Props and behavior |
| --- | --- |
| `ProgressiveDepthProvider` | Required `children`; `defaultMode="deep"`; `showToggle=true`; optional `toggleClassName`, `toggleLabels`, `visibilityMap`, `onModeChange`. Adds a root wrapper and optional built-in toggle. For controlled state use primitive `Provider`. |
| `Canopy`, `Understory`, `Mycelium` | Required `children`; optional `className`. Render their named layer with functional data and ARIA attributes. |
| `ReadingModeToggle` | Optional `className` and `labels`; renders radio buttons in a labelled group. |

`toggleLabels` and `labels` accept `Partial<Record<ReadingMode, ReadingModeInfo>>`.
Each supplied mode needs both `label` and `description`. `label` is visible text;
`description` becomes the accessible name. Include the visible label in each
custom description, for example `{ label: "Skim", description: "Skim: key points" }`.
The built-in defaults use shorter descriptions that do not contain the visible labels.
Sources: [provider](../src/components/ProgressiveDepthProvider.tsx),
[toggle](../src/components/ReadingModeToggle.tsx), [toggle hook](../src/core/hooks/useToggle.ts).

## Hooks

| Export | Contract |
| --- | --- |
| `useProgressiveDepth()` | Returns `{ mode, setMode }`. Use beneath a provider to change shared mode. |
| `useLayerVisibility(layer, visibilityMapOverride?)` | Returns `LayerVisibilityState`: `isVisible`, `mode`, `layer`, `dataAttributes` (`data-pd-layer`, `data-pd-visible`) and `ariaAttributes` (`aria-hidden`). An override takes precedence over the provider map. |
| `useToggle(options?)` | Optional `{ labels }`; returns `mode`, `setMode`, `nextMode`, `previousMode`, `modes`, `getModeProps(mode)` and `getToggleProps()`. Next/previous wrap. Spread the container props and each button's props for radio semantics, roving tab index, click and Arrow/Home/End keyboard support. |
| `usePersistence(mode, options?)` | Writes mode to storage in an effect; returns nothing. Options: `storageKey` (default `progressive-depth-mode`) and `storage` (default browser `localStorage`). |
| `usePersistence.getInitialMode(options?)` | Reads a valid stored mode, otherwise returns `undefined`. Returns `undefined` without browser storage during SSR. It does not subscribe to storage changes. |

Source: [hooks](../src/core/hooks/index.ts),
[persistence](../src/core/hooks/usePersistence.ts). Storage getters and reads/writes
can throw when a browser blocks storage. Guard storage before passing it, or skip
persistence; the hook itself does not catch exceptions. For SSR, arrange initial
state so server and first client render match before restoring browser state.
The [demo storage adapter](../examples/demo/src/core/storage.ts) demonstrates guards.

## Headless primitives

| Export | Contract |
| --- | --- |
| `Provider` | Required `children`; optional `defaultMode="deep"`, controlled `mode`, `onModeChange`, `visibilityMap`. Provides context without DOM. In controlled mode the parent must update `mode` in response to `onModeChange`. |
| `Root` | Required `children`; accepts div HTML attributes and `as` (default `div`). Adds `progressive-depth` class and `data-pd-mode`. |
| `Layer` | Required `children` and `layer`; accepts div HTML attributes, `as` (default `div`) and optional `render(state)`. Normal rendering adds layer classes/data/ARIA; with `render`, only the callback output renders, so it must apply its own attributes, content and focus handling. |
| `Toggle` | Required function child receiving `UseToggleReturn`; optional `labels`. Adds no wrapper DOM. |

`Root` and `Layer` expose div HTML attributes even when `as` changes the element;
they do not infer element-specific props. Neither primitive forwards a ref.

Source: [primitives](../src/primitives/index.ts). The following complete example
uses controlled state and a custom toggle. `children={null}` satisfies `Layer`'s
required children prop when its render callback owns the content.

```tsx
import { useState } from "react";
import { Layer, Provider, Root, Toggle, type ReadingMode } from "@bytequilt/progressive-depth";
import "@bytequilt/progressive-depth/styles.css";

export function CustomArticle() {
  const [mode, setMode] = useState<ReadingMode>("deep");
  return (
    <Provider mode={mode} onModeChange={setMode}>
      <Root as="article">
        <Toggle>
          {({ modes, getModeProps, getToggleProps }) => (
            <div {...getToggleProps()}>
              {modes.map((value) => (
                <button key={value} type="button" {...getModeProps(value)} aria-label={value}>{value}</button>
              ))}
            </div>
          )}
        </Toggle>
        <Layer layer="canopy">The claim.</Layer>
        <Layer layer="understory" children={null} render={({ dataAttributes, ariaAttributes }) => (
          <section className="progressive-depth-understory" {...dataAttributes} {...ariaAttributes}>
            Context and reasoning.
          </section>
        )} />
        <Layer layer="mycelium">Examples and evidence.</Layer>
      </Root>
    </Provider>
  );
}
```

## Utilities and constants

`isLayerVisible(layer, mode, visibilityMap?)` returns a boolean.
`resolveLayerVisibility(layer, mode, visibilityMap?)` returns `LayerVisibilityState`.
Both default to `DEFAULT_VISIBILITY_MAP` and perform no React operations
([source](../src/core/visibility.ts)). They are exported through the same client-marked
package entrypoint; this is not a separate server-only entrypoint.

`DEFAULT_MODE_LABELS`, `DEFAULT_VISIBILITY_MAP`, `LAYER_ORDER`, `MODE_ORDER` and
`PHI` (1.618) are exported from [constants](../src/core/constants.ts). Treat shared
arrays/maps as read-only inputs; supply new values rather than mutating exports.

## Exported types

[Type definitions](../src/core/types.ts) export:

- Domain and context: `ReadingMode`, `LayerName`, `ReadingModeInfo`, `VisibilityMap`,
  `LayerVisibilityState`, `ProgressiveDepthContextValue`.
- Styled props: `ProgressiveDepthProviderProps`, `LayerProps`, `ReadingModeToggleProps`.
- Primitive props: `ProviderPrimitiveProps`, `RootPrimitiveProps`,
  `LayerPrimitiveProps`, `TogglePrimitiveProps`.
- Hook options/results: `UseToggleOptions`, `UseToggleReturn`, `UsePersistenceOptions`.

## Styling

Override `--pd-*` variables on `.progressive-depth` after loading the stylesheet.
The [README styling example](../README.md#styling) covers common colors and sizes;
[src/styles.css](../src/styles.css) lists all spacing, typography, borders and
transition variables. Reduced-motion preferences disable layer transitions.
Custom renderers must manage hidden descendants' focus as well as ARIA state.
