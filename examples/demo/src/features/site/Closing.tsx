import { InstallCommand } from "./InstallCommand";
import { BLOG_URL, REPO_URL } from "./links";

/** The last screen. The visitor has dived, tried it and seen the code, so the ask is one command. */
export function Closing() {
  return (
    <section className="closing" id="start" data-tone="cobalt" aria-labelledby="closing-heading">
      <svg className="closing-art" viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
        {[1, 0.74, 0.5, 0.3].map((scale) => (
          <path key={scale} d="M60 234 234 60H766L940 234V766L766 940H234L60 766Z" style={{ transform: `scale(${scale})` }} />
        ))}
      </svg>
      <div className="wrap closing-grid">
        <h2 id="closing-heading">
          Write the claim first.
          <br />
          <em>Let the reader choose the rest.</em>
        </h2>
        <div className="closing-body">
          <p>Wrap three layers around a section and the reader decides how far to go. Nothing is cut.</p>
          <InstallCommand />
          <div className="closing-actions">
            <a className="button" href={REPO_URL}>
              View on GitHub
            </a>
            <a className="text-link" href={BLOG_URL}>
              Read the introduction
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
