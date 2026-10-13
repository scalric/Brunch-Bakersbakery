import { useEffect, useRef, useState } from "react";

// value = number to count up to, suffix/decimals only affect how it is shown.
// VERIFY BEFORE LAUNCH: none of these figures has been confirmed (stores, cities, years, rating). Note that 15 cities does
// not match the 11 cities listed in data/constants.js. Update them from real business data.
const STATS = [
  { value: 120, suffix: "+", label: "Stores" },
  { value: 15, suffix: "", label: "Cities" },
  { value: 8, suffix: " yrs", label: "of baking" },
  { value: 4.8, suffix: "", label: "Rating", decimals: 1 },
];

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function CountUp({ value, suffix, decimals = 0, run }) {
  const [n, setN] = useState(reduced() ? value : 0);
  useEffect(() => {
    if (!run || reduced()) { if (run) setN(value); return; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n.toFixed(decimals)}{suffix}</>;
}

export default function BrandNumbers() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec numbers" ref={ref} aria-label="Brunch Bakers in numbers">
      <div className="sec-in numbers-grid">
        {STATS.map((s) => (
          <div key={s.label} className="num-card">
            <b><CountUp {...s} run={seen} /></b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
