import { useCallback, useEffect, useRef, useState } from "react";
import { PROMOS } from "@/data/promos";

const prefersReduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Clipboard API needs https; fall back to a hidden textarea so the copy also works on plain http previews.
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* try the fallback */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch { return false; }
}

export default function Promos() {
  const [status, setStatus] = useState({ code: "", ok: true });
  const [pos, setPos] = useState({ pages: 1, active: 0 });
  const track = useRef(null);
  const timer = useRef(0);

  // One "page" = one card step. Cards visible at once changes with width, so pages = cards - visible + 1.
  const measure = useCallback(() => {
    const el = track.current;
    const card = el?.firstElementChild;
    if (!el || !card) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const perView = Math.max(1, Math.round((el.clientWidth + gap) / step));
    return { step, pages: Math.max(1, PROMOS.length - perView + 1) };
  }, []);

  const update = useCallback(() => {
    const m = measure();
    const el = track.current;
    if (!m || !el) return;
    setPos({ pages: m.pages, active: Math.min(m.pages - 1, Math.max(0, Math.round(el.scrollLeft / m.step))) });
  }, [measure]);

  useEffect(() => {
    update();
    const el = track.current;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (el) ro?.observe(el);
    window.addEventListener("resize", update);
    return () => { ro?.disconnect(); window.removeEventListener("resize", update); };
  }, [update]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const goTo = (i) => {
    const m = measure();
    const el = track.current;
    if (!m || !el) return;
    const next = Math.min(m.pages - 1, Math.max(0, i));
    el.scrollTo({ left: next * m.step, behavior: prefersReduced() ? "auto" : "smooth" });
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(pos.active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(pos.active - 1); }
  };

  const copy = async (code) => {
    const ok = await copyText(code);
    clearTimeout(timer.current);
    setStatus({ code, ok });
    timer.current = setTimeout(() => setStatus({ code: "", ok: true }), 2200);
  };

  const multi = pos.pages > 1;

  return (
    <section className="sec mint promos" id="offers" aria-labelledby="promos-title">
      <div className="sec-in">
        <header className="sec-head">
          <h2 id="promos-title">Promos</h2>
        </header>

        <div role="region" aria-roledescription="carousel" aria-label="Offers">
          <ul className="promo-track" ref={track} onScroll={update} onKeyDown={onKeyDown} tabIndex={0} aria-label="Offers, use left and right arrow keys to browse">
            {PROMOS.map((p) => {
              const copied = status.code === p.code;
              return (
                <li key={p.code} className="promo">
                  <h3 className="promo-amount">{p.label}</h3>
                  <p className="promo-desc">{p.desc}</p>
                  <button type="button" className={`promo-btn${copied ? " copied" : ""}`} onClick={() => copy(p.code)} aria-label={`Copy coupon code ${p.code}`}>
                    {copied ? (status.ok ? "Code copied" : "Select code") : `Use code ${p.code}`}
                  </button>
                </li>
              );
            })}
          </ul>

          {multi && (
            <div className="promo-dots">
              {Array.from({ length: pos.pages }, (_, i) => (
                <button key={i} type="button" className={i === pos.active ? "on" : ""} onClick={() => goTo(i)} aria-label={`Go to offer ${i + 1}`} aria-current={i === pos.active ? "true" : undefined} />
              ))}
            </div>
          )}
        </div>
        <p className="sr-only" role="status">{status.code ? (status.ok ? `Coupon code ${status.code} copied` : `Could not copy ${status.code}`) : ""}</p>
      </div>
    </section>
  );
}
