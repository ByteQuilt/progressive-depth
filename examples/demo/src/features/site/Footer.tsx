import { BLOG_URL, NPM_URL, REPO_URL } from "./links";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          Created by <a href="https://bytesbybrandon.com">Brandon D. Phillips</a> at <a href="https://bytequilt.com">ByteQuilt</a>. MIT license.
        </p>
        <ul>
          <li>
            <a href={REPO_URL}>GitHub</a>
          </li>
          <li>
            <a href={NPM_URL}>npm</a>
          </li>
          <li>
            <a href={BLOG_URL}>Read the introduction</a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
