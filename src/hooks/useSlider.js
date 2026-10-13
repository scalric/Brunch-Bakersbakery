import { useCallback, useEffect, useState } from "react";

/**
 * Autoplay slider state.
 * The timer restarts whenever the index changes, so clicking an arrow or dot
 * always gives the new slide a full display time.
 */
export default function useSlider(length, { delay = 5500, paused = false } = {}) {
  const [index, setIndex] = useState(0);

  const go = useCallback((i) => setIndex(((i % length) + length) % length), [length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);

  useEffect(() => {
    if (paused || length < 2) return undefined;
    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [index, paused, delay, length, next]);

  return { index, go, next, prev };
}
