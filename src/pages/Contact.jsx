import { Link } from "react-router-dom";
import Icon from "@/components/franchise/Icons";
import { VALUES } from "@/data/constants";
import { DEMO_FORM } from "@/data/franchise";
import { useDeliveryLocation } from "@/context/LocationContext";
import "@/styles/contact.css";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useForm from "@/hooks/useForm";
import { email, minLength, required } from "@/utils/validators";

const INITIAL = { name: "", email: "", message: "" };
const SCHEMA = {
  name: [required("Enter your name")],
  email: [email({ invalid: "Enter a valid email, like name@example.com" })],
  message: [minLength(10, "Message must be at least 10 characters")],
};

export default function Contact() {
  useDocumentTitle("Contact Us");
  const { openModal } = useDeliveryLocation();
  const { errors, hasErrors, attempted, sent, setSent, doneRef, onSubmit, fieldProps } = useForm({
    initial: INITIAL,
    schema: SCHEMA,
    idPrefix: "ct",
    // Front-end only: nothing is sent anywhere yet. Connect an API or email service here.
    onValid: (values) => ({ name: values.name.trim().split(/\s+/)[0] }),
  });

  const field = (k, label, props = {}, Tag = "input") => (
    <div className={`ct-field${errors[k] ? " bad" : ""}`}>
      <label htmlFor={`ct-${k}`}>{label}</label>
      <Tag {...fieldProps(k)} {...props} />
      {errors[k] && <small className="ct-err" id={`ct-${k}-e`}>{errors[k]}</small>}
    </div>
  );

  const cardBody = (icon, title, text) => (
    <>
      <span className="ct-ic"><Icon name={icon} size={22} /></span>
      <span className="ct-card-txt"><b>{title}</b><small>{text}</small></span>
      <span className="ct-go"><Icon name="arrow" size={20} /></span>
    </>
  );

  return (
    <div className="ct-page">
      <section className="ct-sec" aria-labelledby="ct-title">
        <div className="ct-grid">
          <div className="ct-copy">
            <p className="ct-kicker">Get in touch</p>
            <h1 id="ct-title">We'd Love to Hear From You</h1>
            <p className="ct-lead">Questions about an order, feedback on something you tasted, or a celebration to plan? Send us a note and our team will get back to you soon.</p>

            <ul className="ct-cards">
              <li><button type="button" className="ct-card" onClick={openModal}>{cardBody("pin", "Find a store", "Locate your nearest Brunch Bakers.")}</button></li>
              <li><Link className="ct-card" to="/products">{cardBody("cake", "Browse the menu", "Cakes, desserts, pizza and sandwiches.")}</Link></li>
              <li><Link className="ct-card" to="/franchise#enquire">{cardBody("headset", "Franchise enquiries", "Bring Brunch Bakers to your city.")}</Link></li>
            </ul>
          </div>

          {sent ? (
            <div className="ct-form ct-done" role="status" tabIndex={-1} ref={doneRef}>
              <span className="ct-done-ic"><Icon name="check" size={28} /></span>
              <h2>Thank you, {sent.name}.</h2>
              <p>Your message is in. We'll get back to you soon.</p>
              {DEMO_FORM && <p className="ct-demo">Demo form: this message has not been sent anywhere yet. A backend or email service needs to be connected before launch.</p>}
              <button type="button" className="ct-btn ghost" onClick={() => setSent(null)}>Send another message</button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={onSubmit} noValidate>
              <h2 className="ct-form-title">Send us a message</h2>
              {attempted && hasErrors && <p className="ct-summary" role="alert">Please fix the highlighted fields.</p>}
              {field("name", "Name", { autoComplete: "name" })}
              {field("email", "Email", { type: "email", autoComplete: "email" })}
              {field("message", "Message", { rows: 5, maxLength: 1000 }, "textarea")}
              <button type="submit" className="ct-btn">Send message <Icon name="arrow" size={18} /></button>
              {DEMO_FORM && <p className="ct-demo">Demo form: details are not sent anywhere yet.</p>}
            </form>
          )}
        </div>

        <ul className="ct-values" aria-label="What we stand for">
          {VALUES.map(([, title, text]) => (
            <li key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
