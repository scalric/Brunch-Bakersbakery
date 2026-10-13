// Page-level titles render an h1 (as="h1"); section titles stay h2. Both share one look.
export default function SectionTitle({ children, id, as: Tag = "h2" }) {
  return <Tag id={id} className={Tag === "h1" ? "page-title" : undefined}>{children}</Tag>;
}
