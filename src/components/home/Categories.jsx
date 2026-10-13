import { Link } from "react-router-dom";
import "@/styles/signatures.css";
import cakes from "@/assets/signature/cakes.webp";
import desserts from "@/assets/signature/desserts.webp";
import pizza from "@/assets/signature/pizza.webp";
import sandwiches from "@/assets/signature/sandwiches.webp";

// name = tile title, cat = category the Menu page opens on, img = 5:4 photo (swap files in assets/signature to change)
const CARDS = [
  { name: "Cakes", cat: "Cakes", line: "Made for every celebration.", img: cakes, alt: "Chocolate drip cake on a marble stand" },
  { name: "Desserts", cat: "Desserts", line: "Little indulgences, big smiles.", img: desserts, alt: "Layered chocolate dessert topped with white chocolate swirls" },
  { name: "Pizza", cat: "Pizza", line: "Hot, cheesy and freshly baked.", img: pizza, alt: "Slice of cheese pizza with a long cheese pull" },
  { name: "Sandwiches", cat: "Sandwiches", line: "Fresh, filling everyday favourites.", img: sandwiches, alt: "Veg sandwich with lettuce and peppers" },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Categories() {
  return (
    <section className="sig" aria-labelledby="sig-title">
      <div className="sig-inner">
        <header className="sig-head">
          <p className="sig-eyebrow">Our Signatures</p>
          <h2 id="sig-title">Made Fresh. Loved Always.</h2>
          <p className="sig-sub">A little something for every craving.</p>
        </header>

        <div className="sig-grid">
          {CARDS.map(({ name, cat, line, img, alt }) => (
            <Link key={name} to={`/products?cat=${encodeURIComponent(cat)}`} className="sig-card">
              <div className="sig-media">
                <img src={img} alt={alt} width="600" height="480" sizes="(max-width: 680px) 92vw, 560px" loading="lazy" decoding="async" draggable="false" />
              </div>
              <div className="sig-body">
                <div>
                  <h3>{name}</h3>
                  <p>{line}</p>
                </div>
                <span className="sig-arrow"><Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
