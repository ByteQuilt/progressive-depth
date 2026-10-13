import { ProgressiveDepthProvider, usePersistence } from "@bytequilt/progressive-depth";
import { useId, useState } from "react";
import { ARTICLE } from "../../content/article";
import { findRules, RULES_PRESETS } from "../../core/rules";
import { getBrowserStorage } from "../../core/storage";
import { findTheme, THEMES, themeStyle } from "../../core/themes";
import { ArticleView } from "./ArticleView";
import { DepthArt } from "./DepthArt";
import { DepthPicker } from "./DepthPicker";
import { PersistenceSync } from "./PersistenceSync";
import { Readout } from "./Readout";
import { RulesTable } from "./RulesTable";
import { useVisibleLayers } from "./useVisibleLayers";

function Art() {
  return <DepthArt layers={useVisibleLayers()} />;
}

export function LiveDemo() {
  const [storage] = useState(getBrowserStorage);
  const [initialMode] = useState(() => (storage ? usePersistence.getInitialMode({ storage }) : undefined) ?? "canopy");
  const [rulesId, setRulesId] = useState(RULES_PRESETS[0].id);
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const rules = findRules(rulesId);
  const theme = findTheme(themeId);
  const ids = { rules: useId(), theme: useId() };

  return (
    <section className="demo-section" id="try" aria-labelledby="try-heading">
      <div className="wrap">
        <p className="section-label">02 / Try it</p>
        <h2 id="try-heading">
          Pick a depth.
          <br />
          <em>Read the same post.</em>
        </h2>
        <p className="demo-intro">
          The post below is rendered by the package you install. The three buttons set the reading mode, and the counter shows what that mode leaves visible.
          Your choice is {storage ? "saved in this browser and restored on your next visit" : "not saved, because this browser blocks site storage"}.
        </p>

        <ProgressiveDepthProvider showToggle={false} defaultMode={initialMode} visibilityMap={rules.map}>
          {storage && <PersistenceSync storage={storage} />}
          <DepthPicker rules={rules} />
          <p className="hint">Keyboard: Tab to the buttons, then use the arrow keys, Home or End to change depth.</p>

          <div className="demo-stage">
            <div className="stage-art">
              <Art />
            </div>
            <div className="stage-body">
              <Readout sections={ARTICLE} />
              <div className="themed" style={themeStyle(theme)}>
                <ArticleView sections={ARTICLE} />
              </div>
            </div>
          </div>

          <div className="options">
            <div className="option">
              <label htmlFor={ids.rules}>Layer rules</label>
              <select id={ids.rules} value={rulesId} onChange={(event) => setRulesId(event.target.value)}>
                {RULES_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
              <p>{rules.note} Set with the visibilityMap prop.</p>
              <RulesTable rules={rules} />
            </div>
            <div className="option">
              <label htmlFor={ids.theme}>Theme</label>
              <select id={ids.theme} value={themeId} onChange={(event) => setThemeId(event.target.value)}>
                {THEMES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p>Each theme sets a few of the package's --pd-* CSS custom properties. No other styles change.</p>
              <pre className="vars">
                <code>
                  {Object.entries(theme.vars)
                    .map(([name, value]) => `${name}: ${value};`)
                    .join("\n")}
                </code>
              </pre>
            </div>
          </div>
        </ProgressiveDepthProvider>
      </div>
    </section>
  );
}
