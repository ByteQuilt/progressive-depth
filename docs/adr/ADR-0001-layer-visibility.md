# ADR-0001: Hide inactive layers from interaction and assistive technology

Status: Accepted (records existing, tested behavior).

## Context

Reading modes reduce the amount of content presented. The old format wording
promised all layers would remain accessible to screen readers in every mode,
while the implementation and tests deliberately hide inactive layers.

Evidence: [visibility attributes](../../src/core/visibility.ts),
[functional CSS](../../src/styles.css), and
[layer regression tests](../../src/__tests__/layers.test.tsx), including tests
named “mark hidden layers aria-hidden” and “takes hidden layers out of the tab
order and the accessibility tree”.

## Decision

Document the existing contract. Default `deep` mode exposes all layers with the
default visibility map. Reduced-depth modes mark inactive layers `aria-hidden`;
functional CSS collapses understory/mycelium and uses `visibility: hidden` to
remove their descendants from keyboard interaction. Content remains mounted.
Changing mode can reveal it again. Custom maps and renderers must provide
matching visual and interaction behavior.

## Consequences

The [format specification](../../FORMAT-SPEC.md#accessibility) now agrees with the
implementation. Readers using assistive technology receive the selected depth.
ARIA alone does not prevent keyboard focus, so custom renderers must also hide
or disable focusable descendants. Consumers must import the functional CSS or
implement equivalent handling. Revisiting this contract requires an explicit
behavior change with accessibility verification, a new superseding ADR, and
updates to tests, API reference and specification. Preserve this decision record
and mark its status superseded when appropriate. This documentation change
alters no library code.
