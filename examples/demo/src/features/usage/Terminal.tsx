import { type KeyboardEvent, useId, useState } from "react";
import { useCopy } from "../../core/useCopy";
import { highlight, type Language } from "./highlight";
import { INSTALL, MARKDOC, QUICK_START } from "./snippets";

const TABS: { id: string; label: string; file: string; language: Language; code: string }[] = [
  { id: "install", label: "Install", file: "terminal", language: "sh", code: INSTALL },
  { id: "react", label: "React", file: "BlogPost.tsx", language: "tsx", code: QUICK_START },
  { id: "markdoc", label: "Markdoc", file: "post.md", language: "markdoc", code: MARKDOC },
];

/** One window for the three snippets, so the page shows a single path from install to a working post. */
export function Terminal() {
  const [active, setActive] = useState(TABS[1].id);
  const { copied, failed, copy } = useCopy();
  const base = useId();
  const current = TABS.find((tab) => tab.id === active) ?? TABS[0];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = TABS.findIndex((tab) => tab.id === active);
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    const target = event.key === "Home" ? 0 : event.key === "End" ? TABS.length - 1 : (index + step + TABS.length) % TABS.length;
    if (!step && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    setActive(TABS[target].id);
    document.getElementById(`${base}-tab-${TABS[target].id}`)?.focus();
  };

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="terminal-tabs" role="tablist" aria-label="Setup steps">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`${base}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={tab.id === active}
              aria-controls={`${base}-panel`}
              tabIndex={tab.id === active ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={onKeyDown}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="terminal-file">{current.file}</span>
        <button type="button" className="terminal-copy" onClick={() => copy(current.code)} aria-label={`Copy the ${current.label} snippet`}>
          {copied ? "Copied" : "Copy"}
        </button>
        <span className="sr-only" role="status">
          {copied ? `${current.label} snippet copied.` : failed ? "Copying failed. Select the code and copy it by hand." : ""}
        </span>
      </div>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: the code region scrolls, so keyboard users must be able to focus it */}
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${current.id}`} tabIndex={0} className="terminal-panel">
        <pre>
          <code>{highlight(current.code, current.language)}</code>
        </pre>
      </div>
    </div>
  );
}
