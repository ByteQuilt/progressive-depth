# Contributing to Progressive Depth

Thanks for your interest in contributing.

## Ways to Contribute

- **Use the format.** The best contribution is adopting Progressive Depth
  on your own blog and sharing what you learn.
- **Report issues.** If something in the component or spec doesn't work
  as expected, open an issue.
- **Improve documentation.** Clarifications, examples, and guides are
  always welcome.
- **Build integrations.** Adapters for other frameworks (Vue, Svelte,
  Astro components) would be great additions.

## Development

```bash
git clone https://github.com/bytequilt/progressive-depth.git
cd progressive-depth
pnpm install --frozen-lockfile
pnpm dev
```

Use the pnpm version pinned in [package.json](./package.json). CI uses Node 24;
use the same Node version when reproducing its checks. `pnpm dev` watches the
library build; follow the [demo guide](./examples/demo/README.md#run-it) to run a site.

## Workflow

We use GitHub Actions for Continuous Integration.

1.  **Fork** the repository and create a feature branch.
2.  **Make changes** locally.
3.  **Run checks** before pushing:
    ```bash
    pnpm check
    pnpm typecheck
    pnpm test
    pnpm build
    pnpm run check:package
    pnpm --dir examples/demo install --frozen-lockfile
    pnpm --dir examples/demo typecheck
    pnpm --dir examples/demo test
    pnpm --dir examples/demo build
    ```
4.  **Open a Pull Request** to `main`.
    - The CI workflow will automatically run tests and build checks.
    - The `main` branch is protected; changes must pass CI before merging.

## Pull Requests

- Keep changes focused. One PR per feature or fix.
- Follow existing code style.
- Update documentation if your change affects the public API. Use the
  [source map and update triggers](./docs/MAINTENANCE.md#source-map-and-ownership)
  and complete the [documentation checks](./docs/MAINTENANCE.md#validation).
- Add yourself to the contributors section if you'd like.

## Code of Conduct

Be kind. Be constructive. Build things.

## License

By contributing, you agree that your contributions will be licensed
under the MIT License.
