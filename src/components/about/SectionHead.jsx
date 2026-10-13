// Light uppercase heading with a hairline rule and an optional tag on the right (Our Story sections).
export default function SectionHead({ title, tag }) {
  return (
    <div className="sj-head">
      <h2 className="sj-light">{title}</h2>
      <span className="sj-rule" aria-hidden="true" />
      {tag && <span className="sj-tag">{tag}</span>}
    </div>
  );
}
