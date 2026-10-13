import { Link } from "react-router-dom";
import InvestmentCalculator from "@/components/franchise/InvestmentCalculator";
import HighlightCards from "@/components/franchise/HighlightCards";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import "@/styles/franchise.css";

// Its own page (reached from the header, the footer and the franchise page), so the calculator opens on its own
// instead of sitting inside the franchise page.
export default function InvestmentCalculatorPage() {
  useDocumentTitle("Investment Calculator");
  return (
    <div className="fr-page">
      <section className="sec fr-beige fr-calc" aria-labelledby="calc-title">
        <div className="sec-in">
          <header className="sec-head">
            <p className="kicker">Investment Calculator</p>
            <h1 id="calc-title" className="fr-calc-title">Estimate Your Investment</h1>
            <p className="sec-lead">Adjust the shop size, city type and assumptions to see an illustrative picture. It updates as you change each input.</p>
          </header>

          <InvestmentCalculator />

          <p className="fr-calc-back">
            <Link to="/franchise">← Back to franchise opportunities</Link>
          </p>
        </div>
      </section>

      {/* the four image cards, shown on their own under the calculator */}
      <section className="wb wb-solo" aria-label="Why Brunch Bakers">
        <div className="wb-in">
          <HighlightCards />
        </div>
      </section>
    </div>
  );
}
