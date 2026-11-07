import { DEFAULT_MODE_LABELS, useProgressiveDepth } from "@bytequilt/progressive-depth";
import { depthLink } from "../../core/depth";
import { useCopy } from "../../core/useCopy";

/** Copies a link that opens this page at the reader's current depth, so "read the short version" can be a URL. */
export function ShareLink() {
  const { mode } = useProgressiveDepth();
  const { copied, failed, copy } = useCopy();
  const label = DEFAULT_MODE_LABELS[mode].label;

  return (
    <div className="share">
      <button type="button" className="share-button" onClick={() => copy(depthLink(mode, window.location))}>
        {copied ? "Link copied" : `Copy a link that opens at ${label}`}
      </button>
      <span className="sr-only" role="status">
        {copied ? `Link copied. It opens this page at ${label}.` : failed ? "Copying failed. Copy the address from the browser bar instead." : ""}
      </span>
    </div>
  );
}
