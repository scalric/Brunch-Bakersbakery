import { Link } from "react-router-dom";
import { MILESTONES, PILLARS, ROAD_PHOTO, STORY_STATS } from "@/data/story";
import useStoryScroll from "@/hooks/useStoryScroll";
import RoadMap from "./RoadMap";
import SectionHead from "./SectionHead";
import "@/styles/story.css";

// Editorial timeline, road travelled, brand pillars and a closing call to action; sits under the Our Story split.
export default function StoryJourney() {
  const { root, list } = useStoryScroll();

  return (
    <div className="sj" ref={root}>
      <section className="sj-sec" aria-labelledby="sj-journey">
        <SectionHead title="Our Story" tag="2017 — 2026" />
        <h3 id="sj-journey" className="sr-only">Our journey, 2017 to today</h3>
        <ol className="sj-time" ref={list}>
          {MILESTONES.map((m) => (
            <li key={m.year} className="sj-m">
              <div className="sj-yr"><p className="sj-year">{m.year}</p></div>
              <div className="sj-body">
                <h3 className="sj-h sj-rv">{m.title}<i aria-hidden="true" /></h3>
                {m.text.map((t, i) => <p key={t} className="sj-rv" style={{ "--d": `${(i + 1) * 70}ms` }}>{t}</p>)}
                {m.pics.length > 0 && (
                  <div className="sj-pics">
                    {m.pics.map((pic, i) => (
                      <div key={i} className={`sj-pic sj-rv${pic?.[2] ? ` ${pic[2].split(" ").map((m) => `sj-pic-${m}`).join(" ")}` : ""}`} style={{ "--d": `${(i % 2) * 90}ms` }}>
                        {pic ? <img src={pic[0]} alt={pic[1]} style={pic[3] ? { objectPosition: pic[3] } : undefined} loading="lazy" decoding="async" /> : <span className="sj-ph" aria-hidden="true">{m.year}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sj-sec sj-scale" aria-labelledby="sj-scale-t">
        <h2 id="sj-scale-t" className="sj-big sj-rv">
          We changed scale.
          <span>Not who we are<i aria-hidden="true" /></span>
        </h2>
        <ul className="sj-pillars">
          {PILLARS.map(([t, d], i) => (
            <li key={t} className="sj-rv" style={{ "--d": `${i * 90}ms` }}>
              <h3 className="sj-h">{t}<i aria-hidden="true" /></h3>
              <span className="sj-dash" aria-hidden="true" />
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="sj-sec" aria-labelledby="sj-road-t">
        <SectionHead title="The Road Travelled" tag="2017 — 2026" />
        <h3 id="sj-road-t" className="sr-only">The road travelled</h3>
        <div className="sj-road">
          <figure className="sj-photo sj-rv">
            <img src={ROAD_PHOTO.src} alt={ROAD_PHOTO.alt} loading="lazy" decoding="async" />
            <figcaption><small>2017</small>One bakery.<br />One city.</figcaption>
          </figure>
          <div className="sj-right sj-rv" style={{ "--d": "100ms" }}>
            <p className="sj-by">By end-2026</p>
            <RoadMap />
            <ul className="sj-stats">
              {STORY_STATS.map(([n, l]) => (
                <li key={l}>
                  <p className="sj-num">{n}<i aria-hidden="true" /></p>
                  <p className="sj-lab">{l}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sj-close">
        <h2 className="sj-big sj-center sj-rv">
          The story
          <span>is just getting started<i aria-hidden="true" /></span>
        </h2>
        <Link to="/franchise" className="sj-join">Join us <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
      </section>
    </div>
  );
}
