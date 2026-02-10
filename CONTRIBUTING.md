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
npm install
npm run dev
```

## Workflow

We use GitHub Actions for Continuous Integration.

1.  **Fork** the repository and create a feature branch.
2.  **Make changes** locally.
3.  **Run checks** before pushing:
    ```bash
    pnpm typecheck
    pnpm build
    ```
4.  **Open a Pull Request** to `main`.
    - The CI workflow will automatically run tests and build checks.
    - The `main` branch is protected; changes must pass CI before merging.

## Pull Requests

- Keep changes focused. One PR per feature or fix.
- Follow existing code style.
- Update documentation if your change affects the public API.
- Add yourself to the contributors section if you'd like.

## Code of Conduct

Be kind. Be constructive. Build things.

## License

By contributing, you agree that your contributions will be licensed
under the MIT License.
