import { useCopy } from "../../core/useCopy";
import { INSTALL } from "../usage/snippets";

function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {done ? (
        <path d="m4.5 10.5 3.5 3.5 7.5-8" />
      ) : (
        <>
          <rect x="7" y="7" width="9" height="9" rx="1.5" />
          <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" />
        </>
      )}
    </svg>
  );
}

/** The install command with a one-click copy. Used wherever a visitor is ready to act. */
export function InstallCommand({ command = INSTALL }: { command?: string }) {
  const { copied, failed, copy } = useCopy();

  return (
    <div className="install" data-copied={copied}>
      <code>{command}</code>
      <button type="button" className="install-copy" onClick={() => copy(command)} aria-label={`Copy ${command}`}>
        <CopyIcon done={copied} />
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? "Install command copied to the clipboard." : failed ? "Copying failed. Select the command and copy it by hand." : ""}
      </span>
    </div>
  );
}
