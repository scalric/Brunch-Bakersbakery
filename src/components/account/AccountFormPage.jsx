import { Link } from "react-router-dom";
import Icon from "@/components/franchise/Icons";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useForm from "@/hooks/useForm";
import "@/styles/contact.css";

// Shared layout for the Login and Track pages: copy and quick links on the left, a cream form card on the right.
// It reuses the Contact page styles, so all three pages look like one family. Content comes from data/account.js.
export default function AccountFormPage({ page }) {
  useDocumentTitle(page.title);
  const { errors, hasErrors, attempted, sent, setSent, doneRef, onSubmit, fieldProps } = useForm({
    initial: page.initial,
    schema: page.schema,
    idPrefix: page.idPrefix,
    // Front-end only: nothing is checked or sent anywhere, and nothing typed is kept.
    onValid: () => ({ done: true }),
  });

  return (
    <div className="ct-page">
      <section className="ct-sec" aria-labelledby={`${page.idPrefix}-title`}>
        <div className="ct-grid">
          <div className="ct-copy">
            <p className="ct-kicker">{page.kicker}</p>
            <h1 id={`${page.idPrefix}-title`}>{page.heading}</h1>
            <p className="ct-lead">{page.lead}</p>
            <ul className="ct-cards">
              {page.links.map(([icon, title, text, to]) => (
                <li key={to}>
                  <Link className="ct-card" to={to}>
                    <span className="ct-ic"><Icon name={icon} size={22} /></span>
                    <span className="ct-card-txt"><b>{title}</b><small>{text}</small></span>
                    <span className="ct-go"><Icon name="arrow" size={20} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {sent ? (
            <div className="ct-form ct-done" role="status" tabIndex={-1} ref={doneRef}>
              <span className="ct-done-ic"><Icon name="headset" size={28} /></span>
              <h2>{page.doneTitle}</h2>
              <p>{page.doneText}</p>
              <Link className="ct-btn" to={page.doneAction[1]}>{page.doneAction[0]} <Icon name="arrow" size={18} /></Link>
              <button type="button" className="ct-btn ghost" onClick={() => setSent(null)}>Back</button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={onSubmit} noValidate>
              <h2 className="ct-form-title">{page.formTitle}</h2>
              {attempted && hasErrors && <p className="ct-summary" role="alert">Please fix the highlighted fields.</p>}
              {page.fields.map(([name, label, props]) => (
                <div key={name} className={`ct-field${errors[name] ? " bad" : ""}`}>
                  <label htmlFor={`${page.idPrefix}-${name}`}>{label}</label>
                  <input {...fieldProps(name)} {...props} />
                  {errors[name] && <small className="ct-err" id={`${page.idPrefix}-${name}-e`}>{errors[name]}</small>}
                </div>
              ))}
              <button type="submit" className="ct-btn">{page.submitLabel} <Icon name="arrow" size={18} /></button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
