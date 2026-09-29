"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lightweight inertia scrolling — disabled for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Same-page hash links get Lenis' smooth scroll, but only when the anchor
    // is already mounted — links that open content on click would otherwise
    // log "Target not found".
    const onAnchorClick = (event: MouseEvent) => {
      const link = event
        .composedPath()
        .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement && !!node.href);
      if (!link) return;
      const url = new URL(link.href);
      const current = new URL(window.location.href);
      if (url.host !== current.host || url.pathname !== current.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      // The packages page opens its detail inline and owns that scroll itself.
      if (document.getElementById("package-detail")?.contains(target)) return;
      lenis.scrollTo(`#${id}`);
    };
    window.addEventListener("click", onAnchorClick);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
