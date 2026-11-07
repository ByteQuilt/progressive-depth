import { Provider, type ReadingMode, Root, usePersistence } from "@bytequilt/progressive-depth";
import { useCallback, useState } from "react";
import { modeFromSearch } from "./core/depth";
import { getBrowserStorage } from "./core/storage";
import { LiveDemo } from "./features/demo/LiveDemo";
import { PersistenceSync } from "./features/demo/PersistenceSync";
import { Closing } from "./features/site/Closing";
import { DepthDial } from "./features/site/DepthDial";
import { Descent } from "./features/site/Descent";
import { Footer } from "./features/site/Footer";
import { Header } from "./features/site/Header";
import { Idea } from "./features/site/Idea";
import { useScrollEngine } from "./features/site/useScrollEngine";
import { Usage } from "./features/usage/Usage";

/**
 * One reading depth for the whole page. A visitor who arrives on a shared link such as `?depth=skim` sees that depth,
 * but it is only saved once they change it themselves, so a link never overrides their own preference.
 */
export default function App() {
  const [storage] = useState(getBrowserStorage);
  const [linked] = useState(() => modeFromSearch(window.location.search));
  const [mode, setMode] = useState<ReadingMode>(() => linked ?? (storage ? usePersistence.getInitialMode({ storage }) : undefined) ?? "deep");
  const [chosen, setChosen] = useState(false);
  const choose = useCallback((next: ReadingMode) => {
    setMode(next);
    setChosen(true);
  }, []);
  useScrollEngine();

  return (
    <Provider mode={mode} onModeChange={choose}>
      <Root className="site">
        {storage && (chosen || !linked) && <PersistenceSync storage={storage} />}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <DepthDial />
        <main id="main">
          <Descent />
          <Idea />
          <LiveDemo />
          <Usage />
          <Closing />
        </main>
        <Footer />
      </Root>
    </Provider>
  );
}
