import { useEffect } from "react";

// Attaches Lenis smooth momentum scrolling to the page.
export default function useLenis() {
  useEffect(() => {
    let lenis;
    let rafId;
    let mounted = true;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (!mounted) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Anchor links -> smooth scroll via lenis
      window.__lenis = lenis;
    })();

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -80 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
