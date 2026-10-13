import { useId, useState } from "react";
import { FAQS } from "@/data/franchise";
import Icon from "./Icons";

// Button-based accordion: each header is a real button with aria-expanded and aria-controls, several can be open at once.
export default function Faq() {
  const [open, setOpen] = useState(() => new Set([0]));
  const uid = useId();
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <section className="sec cream fr-faq-sec" id="faqs" aria-labelledby="fr-faq-title">
      <div className="sec-in">
        <header className="sec-head">
          <p className="kicker">Got questions?</p>
          <h2 id="fr-faq-title">Frequently Asked Questions</h2>
        </header>
        <div className="fr-faq">
          {FAQS.map(([q, ans], i) => {
            const isOpen = open.has(i);
            return (
              <div key={q} className={`fr-faq-item${isOpen ? " open" : ""}`}>
                <h3>
                  <button type="button" id={`${uid}-b${i}`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`} onClick={() => toggle(i)}>
                    <span>{q}</span><span className="fr-pm" aria-hidden="true"><Icon name={isOpen ? "minus" : "plus"} size={18} /></span>
                  </button>
                </h3>
                <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} hidden={!isOpen}><p>{ans}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
