# Publishing Guide

This guide explains how to release new versions of `@bytequilt/progressive-depth`.

Releases are automated with [release-please](https://github.com/googleapis/release-please).
Every release goes to two registries:

- **npmjs** (public): `npm install @bytequilt/progressive-depth` works with no extra setup.
- **GitHub Packages**: for projects whose `@bytequilt` scope points at `https://npm.pkg.github.com`.

## For Contributors

Contributors do not need to worry about publishing. Simply:

1.  Open a Pull Request with your changes.
2.  Ensure tests pass.
3.  Once merged, a maintainer will handle the release.

## For Maintainers

### 1. Write Conventional Commits

release-please reads commit messages on `main` to choose the next version and write the changelog:

- `fix:` releases a patch.
- `feat:` releases a minor version.
- A `!` after the type, or a `BREAKING CHANGE:` footer, releases a major version.

Squash merges use the pull request title as the commit message, so the title must follow the same format.

### 2. Merge the Release Pull Request

After each push to `main`, the [Release](./.github/workflows/publish.yml) workflow opens or updates a pull request titled `chore(main): release <version>`.
It bumps `package.json` and adds the new section to `CHANGELOG.md`.
Never edit `CHANGELOG.md` by hand; change the commit messages instead.

Merging the release pull request tags the version and creates the GitHub release.
The same workflow then runs the tests and package checks, builds once, and publishes that build to both registries.
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

### First npmjs Release

Trusted publishing can only be configured on a package that already exists, so the first npmjs release is published by hand:

1.  Check out the open release pull request's branch, which already has the new version in `package.json`.
2.  Run `pnpm install --frozen-lockfile`, then `npm login`, then `pnpm run publish:npmjs` (it builds first).
3.  Follow the one-time setup above to add the trusted publisher.
4.  Merge the release pull request.
    The workflow sees the version already on npmjs, skips it, and publishes to GitHub Packages.
