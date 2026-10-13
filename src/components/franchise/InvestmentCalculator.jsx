import { useState } from "react";
import { Link } from "react-router-dom";
import { CALC } from "@/data/franchise";
import Icon from "./Icons";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const lakh = (n) => (n >= 1e5 ? `₹${(n / 1e5).toFixed(1).replace(/\.0$/, "")} L` : inr(n));
const num = (s) => { const n = parseFloat(s); return Number.isFinite(n) && n >= 0 ? n : null; };
const defaultsFor = (c) => ({ cost: String(c.costPerSqft), rev: String(c.revenuePerSqft), opex: String(CALC.opexPct) });

// Illustrative calculator. Every output is derived from the inputs below and nothing is a promise of results.
// The calculator itself (inputs + illustrative result). The /investment-calculator page wraps it with a heading.
export default function InvestmentCalculator() {
  const [size, setSize] = useState(CALC.sizeDefault);
  const [cityId, setCityId] = useState(CALC.cityDefault);
  const city = CALC.cityTypes.find((c) => c.id === cityId);
  const [a, setA] = useState(() => defaultsFor(city));
  const setField = (k) => (e) => setA((p) => ({ ...p, [k]: e.target.value }));
  const pickCity = (c) => { setCityId(c.id); setA(defaultsFor(c)); };

  const cost = num(a.cost), rev = num(a.rev), opex = num(a.opex);
  const errs = {
    cost: cost === null ? "Enter a number, 0 or more" : "",
    rev: rev === null ? "Enter a number, 0 or more" : "",
    opex: opex === null || opex > 100 ? "Enter a percentage from 0 to 100" : "",
  };
  const valid = !errs.cost && !errs.rev && !errs.opex;

  const setup = valid ? size * cost : null;
  const revenue = valid ? size * rev : null;
  const opCost = valid ? (revenue * opex) / 100 : null;
  const profit = valid ? revenue - opCost : null;
  const months = valid && profit > 0 ? setup / profit : null;

  const breakEven = !valid ? "Check the inputs"
    : months === null ? "Not reached with these inputs"
    : months > 120 ? "10+ years"
    : `≈ ${Math.round(months)} months`;

  return (
    <div className="fr-calc-grid">
      <div className="fr-card fr-calc-inputs">
        <div className="fr-field">
          <div className="fr-field-row">
            <label htmlFor="calc-size">Shop size</label>
            <output htmlFor="calc-size" className="fr-big-val">{size.toLocaleString("en-IN")} sq ft</output>
          </div>
          <input id="calc-size" type="range" min={CALC.sizeMin} max={CALC.sizeMax} step={CALC.sizeStep} value={size} onChange={(e) => setSize(Number(e.target.value))} aria-valuetext={`${size} square feet`} />
          <div className="fr-range-ends"><span>{CALC.sizeMin.toLocaleString("en-IN")}</span><span>{CALC.sizeMax.toLocaleString("en-IN")}</span></div>
        </div>

        <fieldset className="fr-field fr-seg">
          <legend>City type</legend>
          <div className="fr-seg-row">
            {CALC.cityTypes.map((c) => (
              <label key={c.id} className={c.id === cityId ? "on" : ""}>
                <input type="radio" name="city-type" value={c.id} checked={c.id === cityId} onChange={() => pickCity(c)} />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="fr-assump">
          <div className="fr-assump-head">
            <h3>Assumptions <span className="fr-pill">Placeholder values</span></h3>
            <button type="button" className="fr-link" onClick={() => setA(defaultsFor(city))}>Reset</button>
          </div>
          <div className="fr-assump-grid">
            <div className="fr-field">
              <label htmlFor="calc-cost">Setup cost per sq ft (₹)</label>
              <input id="calc-cost" type="number" inputMode="decimal" min="0" value={a.cost} onChange={setField("cost")} aria-invalid={!!errs.cost} aria-describedby={errs.cost ? "calc-cost-e" : undefined} />
              {errs.cost && <small className="fr-err" id="calc-cost-e">{errs.cost}</small>}
            </div>
            <div className="fr-field">
              <label htmlFor="calc-rev">Monthly revenue per sq ft (₹)</label>
              <input id="calc-rev" type="number" inputMode="decimal" min="0" value={a.rev} onChange={setField("rev")} aria-invalid={!!errs.rev} aria-describedby={errs.rev ? "calc-rev-e" : undefined} />
              {errs.rev && <small className="fr-err" id="calc-rev-e">{errs.rev}</small>}
            </div>
            <div className="fr-field">
              <label htmlFor="calc-opex">Operating cost (% of revenue)</label>
              <input id="calc-opex" type="number" inputMode="decimal" min="0" max="100" value={a.opex} onChange={setField("opex")} aria-invalid={!!errs.opex} aria-describedby={errs.opex ? "calc-opex-e" : undefined} />
              {errs.opex && <small className="fr-err" id="calc-opex-e">{errs.opex}</small>}
            </div>
          </div>
          <p className="fr-hint">Operating cost is one placeholder percentage for all running costs. Replace these values with figures from the franchise team.</p>
        </div>
      </div>

      <div className="fr-calc-out" aria-labelledby="calc-out-title">
        <h3 id="calc-out-title">Illustrative result</h3>
        <dl>
          <div><dt>Estimated setup cost</dt><dd>{valid ? <>{lakh(setup)}<small>{inr(setup)}</small></> : "–"}</dd></div>
          <div><dt>Monthly revenue</dt><dd>{valid ? inr(revenue) : "–"}</dd></div>
          <div><dt>Monthly operating cost</dt><dd>{valid ? inr(opCost) : "–"}</dd></div>
          <div className="key"><dt>Projected monthly operating profit</dt><dd>{valid ? inr(profit) : "–"}</dd></div>
          <div className="key hl"><dt>Indicative break-even</dt><dd aria-live="polite">{breakEven}{months !== null && months <= 120 && <small>about {(months / 12).toFixed(1)} years</small>}</dd></div>
        </dl>
        <p className="fr-disclaimer"><Icon name="alert" size={18} /><span>Illustrative only. Not a forecast or a guarantee of revenue, profit or payback. Real results depend on location, footfall and how the store is run.</span></p>
        <Link
          className="btn dark"
          to={{ pathname: "/franchise", hash: "#enquire" }}
          state={valid ? { budget: `About ${lakh(setup)} (illustrative calculator estimate)` } : undefined}
        >
          Discuss these numbers
        </Link>
      </div>
    </div>
  );
}
