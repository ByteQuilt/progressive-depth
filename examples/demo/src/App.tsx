import { LiveDemo } from "./features/demo/LiveDemo";
import { Footer } from "./features/site/Footer";
import { Header } from "./features/site/Header";
import { Hero } from "./features/site/Hero";
import { Idea } from "./features/site/Idea";
import { Usage } from "./features/usage/Usage";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Idea />
        <LiveDemo />
        <Usage />
      </main>
      <Footer />
    </>
  );
}
