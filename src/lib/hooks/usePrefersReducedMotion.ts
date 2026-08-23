"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // matchMedia is unavailable during SSR, so the initial render must
    // default to false and correct itself here post-mount to avoid a
    // hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(query.matches);

    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}
