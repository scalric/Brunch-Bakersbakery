import { Link } from "react-router-dom";
import photo from "@/assets/hero/hero-showcase.webp";

// Compact franchise enquiry panel. Copy is limited to what the brief supplied: no returns, stats or investment claims.
export default function FranchiseStrip() {
  return (
    <section className="sec fstrip" aria-labelledby="franchise-title">
      <div className="sec-in">
        <div className="fstrip-panel">
          <div className="fstrip-copy">
            <p className="kicker">Grow with Brunch Bakers</p>
            <h2 id="franchise-title">Your Passion for Business. Our Love for Baking.</h2>
            <p className="fstrip-text">Explore a bakery partnership built around quality products, brand support, and a shared passion for great food.</p>
            <Link className="btn dark" to="/franchise">Explore Franchise →</Link>
          </div>
          <div className="fstrip-media">
            <img src={photo} alt="Cakes, tarts and macarons from the Brunch Bakers menu on marble stands" width="1979" height="794" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
