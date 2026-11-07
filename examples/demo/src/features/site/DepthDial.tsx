import { DEFAULT_MODE_LABELS, useToggle } from "@bytequilt/progressive-depth";

/** Accessible names for the page-level dial. Each starts with the visible label. */
const DIAL_LABELS = {
  canopy: { label: "Skim", description: "Skim the page: key points only" },
  standard: { label: "Read", description: "Read the page: key points and context" },
  deep: { label: "Deep Dive", description: "Deep Dive the page: everything" },
};

/**
 * Sets the reading depth for the whole page, which is itself written in layers.
 * Built on the package's own `useToggle`, so it is the same radio group a reader of your site would get.
 */
export function DepthDial() {
  const { mode, modes, getModeProps, getToggleProps } = useToggle({ labels: DIAL_LABELS });

  return (
    <aside className="dial" aria-label="Page depth">
      <p className="dial-note">This page is written in layers.</p>
      <div className="dial-rail" {...getToggleProps()} style={{ "--index": modes.indexOf(mode), "--count": modes.length } as React.CSSProperties}>
        <span className="dial-indicator" aria-hidden="true" />
        {modes.map((value) => (
          <button key={value} type="button" className="dial-stop" {...getModeProps(value)}>
            {DEFAULT_MODE_LABELS[value].label}
          </button>
        ))}
      </div>
    </aside>
  );
}
