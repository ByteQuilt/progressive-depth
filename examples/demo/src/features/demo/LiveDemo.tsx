import { Provider, Root, useProgressiveDepth } from "@bytequilt/progressive-depth";
import { useId, useState } from "react";
import { ARTICLE } from "../../content/article";
import { findRules, RULES_PRESETS } from "../../core/rules";
import { getBrowserStorage } from "../../core/storage";
import { findTheme, THEMES, themeStyle } from "../../core/themes";
import { ArticleView } from "./ArticleView";
import { DepthArt } from "./DepthArt";
import { DepthPicker } from "./DepthPicker";
import { Dividend } from "./Dividend";
import { Readout } from "./Readout";
import { RulesTable } from "./RulesTable";
import { ShareLink } from "./ShareLink";
import { useVisibleLayers } from "./useVisibleLayers";

function Art() {
  return <DepthArt layers={useVisibleLayers()} />;
}

/**
 * The sample post and its controls. The reading mode is the page's one shared mode, so the picker here, the dial
 * and the layered copy on the rest of the page always agree. This Provider adds only the layer rules chosen below.
 */
export function LiveDemo() {
  const [storage] = useState(getBrowserStorage);
  const { mode, setMode } = useProgressiveDepth();
  const [rulesId, setRulesId] = useState(RULES_PRESETS[0].id);
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const rules = findRules(rulesId);
  const theme = findTheme(themeId);
  const ids = { rules: useId(), theme: useId() };

  return (
    <section className="demo" id="try" data-tone="light" aria-labelledby="try-heading">
      <div className="wrap">
        <div className="demo-head">
          <h2 id="try-heading">
            Pick a depth.
            <br />
            <em>Read the same post.</em>
          </h2>
          <p className="demo-intro">
            The post below is rendered by the package you install. The three options set the reading mode for this whole page, and the readout shows what that
            mode leaves visible. Your choice is{" "}
            {storage ? "saved in this browser and restored on your next visit" : "not saved, because this browser blocks site storage"}.
          </p>
        </div>

        <Provider mode={mode} onModeChange={setMode} visibilityMap={rules.map}>
          <Root className="demo-root">
            <DepthPicker rules={rules} />
            <div className="demo-bar">
              <p className="hint">Keyboard: Tab to the options, then use the arrow keys, Home or End to change depth.</p>
              <ShareLink />
            </div>

            <div className="demo-stage">
              <div className="stage-art">
                <Art />
                <Dividend sections={ARTICLE} />
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
          </Root>
        </Provider>
      </div>
    </section>
  );
}
