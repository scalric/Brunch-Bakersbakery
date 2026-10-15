import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SNAPSHOT, STEPS, SUPPORT } from "@/data/franchise";
import Icon from "@/components/franchise/Icons";
import Faq from "@/components/franchise/Faq";
import EnquiryForm from "@/components/franchise/EnquiryForm";
import WhyBrunch from "@/components/franchise/WhyBrunch";
import "@/styles/franchise.css";
import useDocumentTitle from "@/hooks/useDocumentTitle";
 
 
const IMG = "/franchise/storefront";
const STRIP = [
  ["Investment Range", SNAPSHOT[0].value, "Illustrative estimate"],
  ["Recommended Store Size", SNAPSHOT[1].value, "Illustrative estimate"],
  [SNAPSHOT[2].label, SNAPSHOT[2].value, SNAPSHOT[2].note],
  [SNAPSHOT[3].label, SNAPSHOT[3].value, SNAPSHOT[3].note],
];
 
export default function Franchise() {
  useDocumentTitle("Franchise Opportunities");
  // "Discuss these numbers" on the calculator page sends the estimate here through the router state
  const { state, key } = useLocation();
  const prefill = useMemo(() => (state?.budget ? { text: state.budget, id: key } : null), [state, key]);
 
  return (
    <div className="fr-page">
      {/* Hero: the real storefront is the background; copy sits on a restrained cocoa gradient at the left */}
      <section className="fr-hero" aria-labelledby="fr-title">
        <div className="fr-hero-media">
          <picture>
            <source type="image/avif" srcSet={`${IMG}-828.avif 828w, ${IMG}-1280.avif 1280w, ${IMG}-1932.avif 1932w`} sizes="100vw" />
            <source type="image/webp" srcSet={`${IMG}-828.webp 828w, ${IMG}-1280.webp 1280w, ${IMG}-1932.webp 1932w`} sizes="100vw" />
            <img src={`${IMG}-1932.webp`} alt="The Brunch Bakers storefront: a cream awning with the Brunch Bakers Pure Veg Bakery sign above an open shopfront filled with cakes and fresh bakes" width="1932" height="814" fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <div className="fr-hero-in">
          <div className="fr-hero-copy">
            <p className="kicker">Your next business chapter</p>
            <h1 id="fr-title">Bring Brunch Bakers to Your City.</h1>
            <p className="fr-lead">Build a bakery business around freshly baked favourites, thoughtful design and a brand experience customers love.</p>
            <div className="fr-hero-btns">
              <a className="btn dark" href="#process">Explore Franchise Opportunities <span aria-hidden="true">→</span></a>
              <Link className="btn" to="/investment-calculator">Calculate Your Investment</Link>
            </div>
          </div>
        </div>
      </section>
 
      {/* Why Brunch Bakers: statement, figures and four image cards, straight under the hero */}
      <WhyBrunch />
 
      {/* Investor trust strip: figures come from data/franchise.js and stay labelled as estimates */}
      <section className="fr-strip" aria-label="Franchise at a glance">
        <div className="fr-strip-wrap">
          <div className="fr-strip-head">
            <h2 className="fr-strip-title">The Opportunity</h2>
            <span className="fr-strip-rule" aria-hidden="true" />
            <span className="fr-strip-tag">Illustrative estimates</span>
          </div>
          <ul className="fr-strip-in">
            {STRIP.map(([label, value, note]) => (
              <li key={label}>
                <p className="fr-strip-val">{value}<i aria-hidden="true" /></p>
                <p className="fr-strip-label">{label}</p>
                <p className="fr-strip-note">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
 
      {/* Joining process */}
      <section className="sec fr-beige fr-process" id="process" aria-labelledby="proc-title">
        <div className="sec-in">
          <header className="sec-head">
            <p className="kicker">How it works</p>
            <h2 id="proc-title">Your Joining Process</h2>
          </header>
          <ol className="fr-journey">
            {STEPS.map((step, i) => (
              <li key={step.title} className="fr-j">
                <span className="fr-badge" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="fr-j-text">
                  <h3><span className="sr-only">Step {i + 1}: </span>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                {step.image?.src ? (
                  <div className="fr-j-media">
                    <img src={step.image.src} alt={step.image.alt} width="1120" height="700" loading="lazy" decoding="async" />
                  </div>
                ) : step.image ? (
                  <div className="fr-j-media">
                    <picture>
                      <source type="image/avif" srcSet={`${step.image.base}-828.avif 828w, ${step.image.base}-1280.avif 1280w`} sizes="(max-width: 900px) 46vw, 420px" />
                      <source type="image/webp" srcSet={`${step.image.base}-828.webp 828w, ${step.image.base}-1280.webp 1280w`} sizes="(max-width: 900px) 46vw, 420px" />
                      <img src={`${step.image.base}-828.webp`} alt={step.image.alt} width="828" height="349" loading="lazy" decoding="async" style={{ objectPosition: step.image.position }} />
                    </picture>
                  </div>
                ) : (
                  <div className="fr-j-media fr-j-panel" aria-hidden="true">
                    <span className="fr-ic"><Icon name={step.icon} size={32} /></span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
 
      {/* Support */}
      <section className="sec fr-cocoa fr-dark fr-support-sec" id="support" aria-labelledby="sup-title">
        <div className="sec-in">
          <header className="sec-head">
            <p className="kicker">We're with you</p>
            <h2 id="sup-title">Support We Provide</h2>
          </header>
          <ul className="fr-support">
            {SUPPORT.map(([i, t, d]) => (
              <li key={t} className="fr-dcard fr-sup-card">
                <span className="fr-ic"><Icon name={i} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
 
      <Faq />
      <EnquiryForm prefill={prefill} />
    </div>
  );
}