# Publishing Guide

This guide explains how to release new versions of `@bytequilt/progressive-depth`.

We use GitHub Actions to automatically publish the package when a new Release is created on GitHub.
Every release goes to two registries:

- **npmjs** (public): `npm install @bytequilt/progressive-depth` works with no extra setup.
- **GitHub Packages**: for projects whose `@bytequilt` scope points at `https://npm.pkg.github.com`.

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

The [Publish Package](./.github/workflows/publish.yml) workflow builds once and publishes that build to both registries.
npmjs authenticates through [trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm token is stored, and each version gets a provenance attestation.
GitHub Packages authenticates with the workflow's `GITHUB_TOKEN`.
Re-running the workflow skips any registry that already has the version.

### One-Time npmjs Setup

Trusted publishing is configured on the package after it exists on npmjs:

1.  Sign in to npmjs as an owner of the `bytequilt` organization.
2.  Open the package's **Settings** and add a **Trusted Publisher**.
3.  Choose **GitHub Actions** with organization `ByteQuilt`, repository `progressive-depth`, and workflow `publish.yml`.

### Manual Fallback

If CI fails, you can still publish manually from your local machine:

```bash
npm login                # npmjs account with publish rights on @bytequilt
pnpm run publish:npmjs   # npmjs only
pnpm run publish:github  # GitHub Packages only (see below)
pnpm release             # both
```

The repository has no `.npmrc`, so contributors can install without any token.
Publishing to GitHub Packages by hand needs a token with `write:packages` in your user-level `~/.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=<token>
```

The first npmjs release has to be published by hand, because trusted publishing can only be configured on a package that already exists.
Publish it with `pnpm run publish:npmjs`, then follow the one-time setup above.
