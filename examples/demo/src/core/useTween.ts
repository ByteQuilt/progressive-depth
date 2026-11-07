import { useEffect, useRef, useState } from "react";

/** Eases a displayed number toward its target. With reduced motion, or on the first render, it jumps straight there. */
export function useTween(target: number, durationMs = 700): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || current.current === target) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 4;
      current.current = from + (target - from) * eased;
      setValue(Math.round(current.current));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}
