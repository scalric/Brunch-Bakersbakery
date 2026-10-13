import { useEffect, useLayoutEffect, useRef } from "react";

// Scroll behaviour for the Our Story timeline. Returns two refs:
//   root: the wrapper; elements marked `.sj-rv` fade in once they enter the viewport
//   list: the timeline <ol>; drives the filled rail and the `is-past` / `is-now` step classes
// Everything is progressive: the reveal is only armed once JS runs, and it is skipped for reduced motion.
export default function useStoryScroll() {
  const root = useRef(null);
  const list = useRef(null);

  // reveal-on-scroll is only armed once JS runs, so nothing stays hidden without it
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    el.classList.add("sj-js");
    return () => el.classList.remove("sj-js");
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    el.querySelectorAll(".sj-rv").forEach((n) => io.observe(n));

    // scroll state: filled rail, current step, steps already passed
    const ol = list.current;
    const steps = ol ? [...ol.children] : [];
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ol) return;
      const stuck = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hdr-stuck")) || 112;
      const line = stuck + Math.min(window.innerHeight * 0.3, 220);
      const r = ol.getBoundingClientRect();
      ol.style.setProperty("--sj-fill", `${Math.max(0, Math.min(r.height, line - r.top))}px`);
      steps.forEach((s) => {
        const b = s.getBoundingClientRect();
        s.classList.toggle("is-past", b.bottom < stuck + 150);
        s.classList.toggle("is-now", b.top < line && b.bottom >= stuck + 150);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { root, list };
}
