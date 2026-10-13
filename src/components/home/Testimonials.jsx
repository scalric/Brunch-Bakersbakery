import { useRef, useState } from "react";
import { TESTIMONIALS } from "@/data/constants";
 
// TESTIMONIALS are placeholder reviews (see data/constants.js): swap in real ones before launch.
// All quotes sit in the same grid cell and only fade, so the section keeps the height of the longest quote
// and nothing below it (the footer included) moves when the review changes.
export default function Testimonials() {
  const [i, setI] = useState(0);
  const touchX = useRef(null);
  const n = TESTIMONIALS.length;
  const go = (k) => setI(((k % n) + n) % n);
 
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? i + 1 : i - 1);
  };
 
  return (
    <section className="sec testi" aria-labelledby="testi-title">
      <div className="sec-in">
        <header className="sec-head">
          <h2 id="testi-title">Testimonials</h2>
        </header>
 
        <div role="region" aria-roledescription="carousel" aria-label="Customer reviews">
          <div
            className="testi-stage"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={onTouchEnd}
          >
            {TESTIMONIALS.map(([quote, who], k) => {
              const [name, ...place] = who.split(", ");
              return (
              <figure
                key={who}
                className={`testi-slide${k === i ? " is-on" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Review ${k + 1} of ${n}`}
                aria-hidden={k !== i}
              >
                <blockquote><p>{`\u201C${quote}\u201D`}</p></blockquote>
                <figcaption>
                  <b>{name}</b>
                  {place.length > 0 && <span>{place.join(", ")}</span>}
                </figcaption>
              </figure>
              );
            })}
          </div>
 
          <div className="testi-dots">
            {TESTIMONIALS.map((t, k) => (
              <button key={t[1]} type="button" className={k === i ? "on" : ""} onClick={() => go(k)} aria-label={`Show review ${k + 1} of ${n}`} aria-current={k === i ? "true" : undefined} />
            ))}
          </div>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{`Review ${i + 1} of ${n}`}</p>
      </div>
    </section>
  );
}