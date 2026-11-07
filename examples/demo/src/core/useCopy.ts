import { useCallback, useEffect, useRef, useState } from "react";

/** Writes text to the clipboard. Resolves false when the browser refuses, for example outside a secure context. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Copy action with a short-lived "copied" flag for button feedback. `failed` stays set until the next attempt. */
export function useCopy(resetAfterMs = 2000) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(timer.current);
      const ok = await copyText(text);
      setState(ok ? "copied" : "failed");
      if (ok) timer.current = window.setTimeout(() => setState("idle"), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { copied: state === "copied", failed: state === "failed", copy };
}
