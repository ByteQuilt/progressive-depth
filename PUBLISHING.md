# Publishing Guide

This guide explains how to release new versions of `@bytequilt/progressive-depth`.

We use GitHub Actions to automatically publish the package when a new Release is created on GitHub.

## For Contributors

Contributors do not need to worry about publishing. Simply:

1.  Open a Pull Request with your changes.
2.  Ensure tests pass.
3.  Once merged, a maintainer will handle the release.

## For Maintainers

### 1. Prepare Release

On your local machine, pull the latest `main` branch and bump the version:

```bash
git pull origin main

# Choose the appropriate bump type:
pnpm bump:patch  # Bug fixes (1.0.0 -> 1.0.1)
pnpm bump:minor  # Features (1.0.0 -> 1.1.0)
pnpm bump:major  # Breaking changes (1.0.0 -> 2.0.0)

# Push the version commit and tag
git push --follow-tags
```

### 2. Trigger Publication

Go to the [Releases page on GitHub](https://github.com/ByteQuilt/progressive-depth/releases) and draft a new release:

1.  Click **Draft a new release**.
2.  Select the tag you just pushed (e.g., `v1.0.1`).
3.  Generate release notes.
4.  Click **Publish release**.

The [Publish Package](./.github/workflows/publish.yml) workflow will automatically build and publish the package to the GitHub Package Registry.

### Manual Fallback

If CI fails, you can still publish manually from your local machine (requires authentication):

```bash
pnpm release
```
