import { LayeredMark } from "./LayeredMark";
import { REPO_URL } from "./links";

export function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="brand">
        <LayeredMark />
        <span>Progressive Depth</span>
      </a>
      <nav className="site-nav" aria-label="Main">
        <a href="#idea">Idea</a>
        <a href="#try">Try it</a>
        <a href="#use">Use it</a>
        <a href={REPO_URL} className="nav-repo">
          GitHub
        </a>
      </nav>
    </header>
  );
}
