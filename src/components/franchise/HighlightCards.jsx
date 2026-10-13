import { WHY_HIGHLIGHTS } from "@/data/franchise";
// franchise.css first, then the section's own file, so its rules keep winning the cascade
import "@/styles/franchise.css";
import "./WhyBrunch.css";

// The four image cards (donuts, croissant, chef, storefront). Used under "Why Brunch Bakers" on the franchise page
// and on their own on the investment calculator page. Content lives in data/franchise.js.
export default function HighlightCards() {
  return (
    <ul className="wb-cards">
      {WHY_HIGHLIGHTS.map((h) => (
        <li key={h.title} className="wb-card">
          <img src={h.img} alt={h.title} loading="lazy" decoding="async" style={{ objectPosition: h.pos }} />
          <h3>{h.title}</h3>
          <span className="wb-card-rule" aria-hidden="true" />
          <p>{h.text}</p>
        </li>
      ))}
    </ul>
  );
}
