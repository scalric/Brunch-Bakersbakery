import { Link } from "react-router-dom";

// Shown inside the layout if a page throws or a lazily loaded chunk fails (for example after a new deploy).
export default function ErrorPage() {
  return (
    <section className="wrap center" role="alert">
      <h1 className="page-title">Something went wrong</h1>
      <p>This page didn't load properly. Reloading usually fixes it.</p>
      <p>
        <button type="button" className="btn dark" onClick={() => window.location.reload()}>Reload page</button>{" "}
        <Link className="btn" to="/">Back to home</Link>
      </p>
    </section>
  );
}
