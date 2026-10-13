import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CITIES } from "@/data/constants";
import { BENEFITS, DEMO_FORM } from "@/data/franchise";
import useForm from "@/hooks/useForm";
import { email, phone, required } from "@/utils/validators";
import Icon from "./Icons";

const INITIAL = { name: "", phone: "", email: "", city: "", budget: "", message: "" };
const SCHEMA = {
  name: [required("Enter your full name")],
  phone: [phone({ required: "Enter your phone number", invalid: "Enter a valid phone number, 10 to 13 digits" })],
  email: [email({ required: "Enter your email address", invalid: "Enter a valid email, like name@example.com" })],
  city: [required("Tell us the city you would like to open in")],
};

export default function EnquiryForm({ prefill }) {
  const { values, setValues, errors, hasErrors, attempted, sent, setSent, doneRef, onChange, onSubmit, fieldProps } = useForm({
    initial: INITIAL,
    schema: SCHEMA,
    idPrefix: "fr",
    // Front-end only: nothing is sent anywhere yet. Connect an API or email service here.
    onValid: (v) => ({ name: v.name.trim().split(/\s+/)[0], city: v.city.trim() }),
  });

  // "Discuss these numbers" on the calculator page fills the optional budget field
  useEffect(() => {
    if (!prefill) return;
    setSent(null);
    setValues((v) => ({ ...v, budget: prefill.text }));
  }, [prefill, setSent, setValues]);

  const field = (k, label, props = {}, hint) => (
    <div className={`fr-field${errors[k] ? " bad" : ""}`}>
      <label htmlFor={`fr-${k}`}>{label}</label>
      <input {...fieldProps(k, hint ? `fr-${k}-h` : undefined)} {...props} />
      {hint && !errors[k] && <small className="fr-hint" id={`fr-${k}-h`}>{hint}</small>}
      {errors[k] && <small className="fr-err" id={`fr-${k}-e`}>{errors[k]}</small>}
    </div>
  );

  return (
    <section className="sec fr-cocoa fr-dark fr-enq" id="enquire" aria-labelledby="enq-title">
      <div className="sec-in fr-enq-grid">
        <div className="fr-enq-copy">
          <p className="kicker">Become a franchise partner</p>
          <h2 id="enq-title">Make Every Moment Sweeter, in Your Own Store</h2>
          <p className="sec-lead">Tell us where you would like to open and a little about your plans, and we will talk through the next steps.</p>
          <ul className="fr-benefits">
            {BENEFITS.map(([i, t, d]) => (
              <li key={t}><span className="fr-ic"><Icon name={i} size={20} /></span><div><b>{t}</b><small>{d}</small></div></li>
            ))}
          </ul>
          <p className="fr-hint">Not ready yet? <Link to="/products">Browse the menu</Link> or try the <Link to="/investment-calculator">calculator</Link> first.</p>
        </div>

        {sent ? (
          <div className="fr-card fr-done" role="status" tabIndex={-1} ref={doneRef}>
            <span className="fr-done-ic"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
            <h3>Thank you, {sent.name}.</h3>
            <p>We have noted your interest in opening a Brunch Bakers in {sent.city}.</p>
            {DEMO_FORM && <p className="fr-demo">Demo form: this enquiry has not been sent anywhere yet. A backend or email service needs to be connected before launch.</p>}
            <button type="button" className="btn" onClick={() => setSent(null)}>Send another enquiry</button>
          </div>
        ) : (
          <form className="fr-card fr-form" onSubmit={onSubmit} noValidate>
            {attempted && hasErrors && <p className="fr-summary" role="alert">Please fix the highlighted fields.</p>}
            {field("name", "Full name", { autoComplete: "name" })}
            <div className="fr-row2">
              {field("phone", "Phone", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
              {field("email", "Email", { type: "email", autoComplete: "email" })}
            </div>
            {field("city", "Preferred city", { autoComplete: "off", list: "fr-cities" })}
            <datalist id="fr-cities">{CITIES.map((c) => <option key={c} value={c} />)}</datalist>
            {field("budget", "Investment budget (optional)", { autoComplete: "off", placeholder: "e.g. ₹40 lakh" }, "A rough figure is fine.")}
            <div className="fr-field">
              <label htmlFor="fr-message">Message (optional)</label>
              <textarea id="fr-message" rows="3" maxLength="500" value={values.message} onChange={onChange("message")} />
            </div>
            <button type="submit" className="btn dark">Submit enquiry</button>
            {DEMO_FORM && <p className="fr-demo">Demo form: details are not sent anywhere yet.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
