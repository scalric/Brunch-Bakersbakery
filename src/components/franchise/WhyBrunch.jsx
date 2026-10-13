import { WHY_STATS } from "@/data/franchise";
// franchise.css first, then this section's own file, so the section's rules keep winning the cascade
import "@/styles/franchise.css";
import "./WhyBrunch.css";

// "Why Brunch Bakers": big statement on the left, the road travelled in numbers on the right.
// (The four image cards are a separate component, HighlightCards, shown on the investment calculator page.)
export default function WhyBrunch() {
  return (
    <section className="wb" aria-labelledby="wb-title">
      <div className="wb-in">
        <div className="wb-head">
          <h2 id="wb-title">Why Brunch Bakers</h2>
          <span className="wb-rule" aria-hidden="true" />
          <span className="wb-tag">Since 2017</span>
        </div>

        <div className="wb-grid">
          <p className="wb-big">
            A bakery that grows.
            <span>And stays true<i aria-hidden="true" /></span>
          </p>

          <div className="wb-right">
            <p className="wb-lead">Cities, menu, values: our figures show the road travelled since 2017.</p>
            <span className="wb-dash" aria-hidden="true" />
            <dl className="wb-stats">
              {WHY_STATS.map(([n, label]) => (
                <div key={label} className="wb-row">
                  <dt>{n}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
