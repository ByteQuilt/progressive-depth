# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.2.1](https://github.com/ByteQuilt/progressive-depth/compare/v1.2.0...v1.2.1) (2026-10-04)


### Bug Fixes

* mark the package as client code for React Server Components ([#10](https://github.com/ByteQuilt/progressive-depth/issues/10)) ([d7fe70a](https://github.com/ByteQuilt/progressive-depth/commit/d7fe70ad0bb69e0aa9ac3136a4e28b573fad63bb))

## [1.2.0](https://github.com/ByteQuilt/progressive-depth/compare/v1.1.0...v1.2.0) (2026-10-04)


### Bug Fixes

* make the reading toggle and hidden layers accessible ([#3](https://github.com/ByteQuilt/progressive-depth/issues/3)) ([07ee6ed](https://github.com/ByteQuilt/progressive-depth/commit/07ee6edeeec2ca1a05db810fe541c67d27c828b0))
* resolve CommonJS types correctly and declare package metadata ([#4](https://github.com/ByteQuilt/progressive-depth/issues/4)) ([5c06b00](https://github.com/ByteQuilt/progressive-depth/commit/5c06b00cae7fa6d429bfb2becbc1f737957d1dde))
* resolve the remaining Biome findings ([2b8246d](https://github.com/ByteQuilt/progressive-depth/commit/2b8246de64bd78a2c409b2238aff4741e2523704))

## [0.1.0] - 2026-02-09

### Added

- `ProgressiveDepthProvider` component with reading mode state
- `Canopy`, `Understory`, and `Mycelium` layer components
- `ReadingModeToggle` with customizable labels
- `useProgressiveDepth` hook for custom integrations
- Base CSS with custom properties for theming
- Reduced motion support
- ARIA attributes for accessibility
- Markdoc tag schemas and Keystatic integration guide
- Format specification (FORMAT-SPEC.md)
- Example usage
