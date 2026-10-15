import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Hero() {
  const video = useRef(null);
  const [reduceMotion] = useState(prefersReducedMotion);

  // pause while the tab is in the background; stay paused for visitors who prefer reduced motion
  useEffect(() => {
    const el = video.current;
    if (!el) return undefined;
    if (reduceMotion) { el.pause(); return undefined; }
    const onVisibility = () => (document.hidden ? el.pause() : el.play().catch(() => {}));
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduceMotion]);

  return (
    // is-dark: light copy over the video (desktop); the left-hand scrim in hero.css keeps it readable
    <section className="hero is-dark" aria-label="Brunch Bakers">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Own a Slice<br />of the oven.</h1>
          <div className="hero-ctas">
            <Link className="hero-btn primary" to="/franchise">Become a Franchisee</Link>
            <Link className="hero-btn primary" to="/products">View Menu</Link>
          </div>
        </div>
      </div>

      <div className="hero-bg">
        <video
          ref={video}
          className="hero-video"
          src="/hero/baked.mp4?v=2"
          poster="/hero/baked-poster.jpg?v=2"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        />
      </div>
    </section>
  );
}
