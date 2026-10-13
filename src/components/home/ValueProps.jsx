import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/story.css";
import photo from "@/assets/story/our-story-cake.webp";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// content shows straight away when there is no IntersectionObserver or the visitor prefers reduced motion
const showAtOnce = () =>
  typeof window === "undefined" ||
  !("IntersectionObserver" in window) ||
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// "Our Story" editorial split: story copy on the left, one large cake photograph on the right.
// showCta hides the button where it would just link back to the page you are already on (About).
// asPage marks it as the main heading of a page with tighter spacing (used on About).
export default function ValueProps({ showCta = true, asPage = false }) {
  // on the Our Story page this is the main heading of the page; on the home page the hero already has the h1
  const Title = asPage ? "h1" : "h2";
  const ref = useRef(null);
  const [shown, setShown] = useState(showAtOnce);

  // gentle fade-in the first time the section scrolls into view
  useEffect(() => {
    if (shown) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <section className={`ourstory${asPage ? " is-page" : ""}${shown ? " is-in" : ""}`} ref={ref} aria-labelledby="story-title">
      <div className="ourstory-in">
        <div className="ourstory-copy">
          <p className="ourstory-eyebrow">Our Story — Made with Heart</p>
          <Title id="story-title">
            More Than a Bakery.
            <span>A Little Piece of Happiness.</span>
          </Title>
          <p>
            At Brunch Bakers, we believe the sweetest memories begin with the simplest moments. From indulgent cakes to freshly baked treats, every creation is made to bring people together and make everyday occasions feel special.
          </p>
          <p className="ourstory-close">Because life&rsquo;s little moments deserve something delicious.</p>
          {showCta && (
            <Link to="/about" className="ourstory-btn">
              Discover Our Story <Arrow />
            </Link>
          )}
        </div>

        <figure className="ourstory-visual">
          <div className="ourstory-frame">
            <img
              className="ourstory-photo"
              src={photo}
              alt="A glossy chocolate mirror-glaze cake with dark chocolate triangles on a cream ceramic plate, with chocolate shards floating above against a cocoa-brown silk backdrop"
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="ourstory-note">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 20.5s-7.5-4.4-9.3-9.4C1.5 7.7 3.5 4.5 6.8 4.5c2.1 0 3.9 1.2 5.2 3 1.3-1.8 3.1-3 5.2-3 3.3 0 5.3 3.2 4.1 6.6-1.8 5-9.3 9.4-9.3 9.4z" /></svg>
            Thoughtfully baked. Happily shared.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
