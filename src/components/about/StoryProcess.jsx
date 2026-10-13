import { PROCESS_STEPS } from "@/data/story";
import "@/styles/story.css";

// "How a bake is born": four numbered steps, each with one photo and a one-line caption (content in data/story.js).
export default function StoryProcess() {
  return (
    <div className="sp">
      <section className="sp-in" aria-labelledby="sp-title">
        <div className="sj-head">
          <h2 id="sp-title" className="sj-light">How a Bake Is Born</h2>
          <span className="sj-rule" aria-hidden="true" />
          <span className="sj-tag">Four steps</span>
        </div>
        <ol className="sp-steps">
          {PROCESS_STEPS.map(([title, img, alt, line, pos], i) => (
            <li key={title} className="sp-step">
              <div className="sp-num" aria-hidden="true">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b />
              </div>
              <h3 className="sp-title">{title}<i aria-hidden="true" /></h3>
              <figure className="sp-card">
                <img src={img} alt={alt} style={{ objectPosition: pos }} loading="lazy" decoding="async" />
                <figcaption>{line}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
