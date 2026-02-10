# Publishing Guide

This guide explains how to release new versions of `@bytequilt/progressive-depth` to GitHub Packages.

## Prerequisites

1.  **Personal Access Token (PAT)**: You need a GitHub Personal Access Token with `write:packages` scope.
2.  **Login**: Authenticate with GitHub Packages locally:
    ```bash
    npm login --registry=https://npm.pkg.github.com --scope=@ByteQuilt
    ```
    (Use your GitHub username and PAT as the password).

## Release Workflow

### 1. Commit Changes

Ensure your working directory is clean and all changes are committed.

### 2. Bump Version

Run one of the following commands to update the version, create a commit, and tag the release:

```bash
# For bug fixes (1.0.0 -> 1.0.1)
pnpm bump:patch

# For new backward-compatible features (1.0.0 -> 1.1.0)
pnpm bump:minor

# For breaking changes (1.0.0 -> 2.0.0)
pnpm bump:major
```

### 3. Build & Publish

Run the release script. This will automatically rebuild the project (`prepublishOnly`) and publish it to the registry.

```bash
pnpm release
```

### 4. Push to GitHub

Push the new version commit and the created tag to the repository.

```bash
git push --follow-tags
```
