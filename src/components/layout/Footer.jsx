import { Link } from "react-router-dom";
import { CITIES } from "@/data/constants";
import { DEMO_FORM } from "@/data/franchise";
import useForm from "@/hooks/useForm";
import { email } from "@/utils/validators";
import logo from "@/assets/logo-header.webp";

// A null target means the page does not exist yet: it is shown as plain text with a "Soon" tag instead of a dead link.
const EXPLORE = [["Menu", "/products"], ["Franchise", "/franchise"], ["Coupons & Offers", "/#offers"], ["Investment Calculator", "/investment-calculator"], ["Find a Store", "/#find-store"]];
const BRAND = [["Our Story", "/about"], ["Contact Us", "/contact"], ["Become a Franchisee", "/franchise"]];
const LEGAL = [["FAQs", null], ["Refund Policy", null], ["Privacy Policy", null], ["Terms & Conditions", null]];

// Paste the supplied profile URLs here. Only entries with a URL are shown, so there are no dead icons.
const SOCIAL_URLS = { Facebook: "", Instagram: "", X: "", YouTube: "" };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const SOCIAL_ICONS = {
  Facebook: <svg viewBox="0 0 24 24"><path {...stroke} d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>,
  Instagram: <svg viewBox="0 0 24 24"><rect {...stroke} x="3" y="3" width="18" height="18" rx="5" /><circle {...stroke} cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>,
  X: <svg viewBox="0 0 24 24"><path {...stroke} d="M4 4l16 16M20 4L4 20" /></svg>,
  YouTube: <svg viewBox="0 0 24 24"><rect {...stroke} x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>,
};

const Arrow = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const NEWS_SCHEMA = { email: [email({ required: "Enter your email address", invalid: "Enter a valid email, like name@example.com" })] };

function Newsletter() {
  const { errors, sent, setSent, doneRef, onSubmit, fieldProps } = useForm({
    initial: { email: "" },
    schema: NEWS_SCHEMA,
    idPrefix: "nl",
    // Front-end only: nothing is sent anywhere yet. Connect an API or email service here.
    onValid: () => ({ done: true }),
  });
  return (
    <div className="foot-news">
      <h3>Brunch Bakers Newsletter</h3>
      <p className="foot-lead">Sign up to discover our new bakes, upcoming store openings and the latest Brunch Bakers news.</p>
      {sent ? (
        <div className="foot-done" ref={doneRef} tabIndex={-1} role="status">
          <p>Thank you, you are on the list.</p>
          {DEMO_FORM && <small>Demo form: your email has not been sent anywhere yet.</small>}
          <button type="button" onClick={() => setSent(null)}>Use another email</button>
        </div>
      ) : (
        <form className="foot-nl" onSubmit={onSubmit} noValidate>
          <div className={`foot-nl-row${errors.email ? " bad" : ""}`}>
            <label htmlFor="nl-email" className="sr-only">Your email</label>
            <input {...fieldProps("email", "nl-fine")} type="email" placeholder="Your email" autoComplete="email" />
            <button type="submit" aria-label="Subscribe"><Arrow size={20} /></button>
          </div>
          {errors.email && <small className="foot-err" id="nl-email-e" role="alert">{errors.email}</small>}
          <small className="foot-fine" id="nl-fine">Your address is only used to send you the newsletter. {DEMO_FORM && "Demo form: nothing is sent yet."}</small>
        </form>
      )}
    </div>
  );
}

const List = ({ title, links }) => (
  <nav className="foot-col" aria-label={title}>
    <h3>{title}</h3>
    <ul>{links.map(([label, to]) => <li key={label}><Link to={to}>{label}</Link></li>)}</ul>
  </nav>
);

export default function Footer() {
  const socials = Object.entries(SOCIAL_URLS).filter(([, url]) => url);
  return (
    <footer className="site-foot">
      <div className="foot-body">
        <div className="foot-in">
          <ul className="foot-cities" aria-label="Cities we bake for">
            {CITIES.map((c) => <li key={c}>{c}<i aria-hidden="true" /></li>)}
          </ul>

          <div className="foot-main">
            <div className="foot-brand">
              <Link to="/" aria-label="Brunch Bakers home"><img src={logo} alt="Brunch Bakers" width="640" height="210" loading="lazy" decoding="async" /></Link>
              <Link to="/products" className="foot-order">Order <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg></Link>
              <p className="foot-lead">Pure veg, baked fresh every day.</p>
            </div>

            <Newsletter />
            <List title="Explore" links={EXPLORE} />
            <List title="Brunch Bakers" links={BRAND} />

            <div className="foot-contact">
              <h3>Contact</h3>
              <p className="foot-lead">A question, a store enquiry, a wish to work with us?</p>
              <Link to="/contact" className="foot-touch">Get in touch <Arrow /></Link>
              {socials.length > 0 && (
                <>
                  <h3 className="foot-follow">Follow us</h3>
                  <div className="socials">
                    {socials.map(([n, url]) => <a key={n} href={url} target="_blank" rel="noopener noreferrer"><span className="sr-only">{n}</span>{SOCIAL_ICONS[n]}<em aria-hidden="true">{n}</em></a>)}
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="foot-about"><b>Brunch Bakers, a pure veg bakery.</b> Cakes, desserts, pizza and sandwiches. Made by our own teams, every day, no shortcuts. Baking for {CITIES.length} cities across India.</p>

          <div className="foot-bottom">
            <p>© 2026 Brunch Bakers. All rights reserved.</p>
            <ul className="foot-legal">
              {LEGAL.map(([label, to]) => <li key={label}>{to ? <Link to={to}>{label}</Link> : <span className="soon" title="Coming soon">{label}</span>}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
