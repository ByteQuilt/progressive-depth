# Progressive Depth Demo

This is a working example of [Progressive Depth](../../README.md) in a React application. It demonstrates:

- **The Reading Mode Toggle**: A floating control to switch between Canopy, Understory, and Mycelium modes.
- **Layer Components**: How `Canopy`, `Understory`, and `Mycelium` components respond to the context.
- **Theming**: How to customize the look and feel using CSS variables.

## Running the Demo

1.  Navigate to this directory:

    ```bash
    cd examples/demo
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Start the development server:

    ```bash
    pnpm dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

You can play with the theming variables in [`src/index.css`](src/index.css) to see how easy it is to adapt Progressive Depth to your brand.
