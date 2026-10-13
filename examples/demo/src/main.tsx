import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource/dm-mono/latin-400.css";
import "@fontsource/dm-mono/latin-500.css";
import "@bytequilt/progressive-depth/styles.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";
import "./styles/demo.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
