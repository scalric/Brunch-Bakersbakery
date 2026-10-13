import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";


export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <section className="wrap center">
      <h1 className="page-title">404 - Page not found</h1>
      <Link className="btn dark" to="/">Back to home</Link>
    </section>
  );
}
