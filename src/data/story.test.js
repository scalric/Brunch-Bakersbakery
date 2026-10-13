import { describe, expect, it } from "vitest";
import { MAP_HOME, MAP_PINS, MILESTONES, PILLARS, PROCESS_STEPS, ROAD_PHOTO, STORY_STATS } from "./story";
import { MAP_H, MAP_W, projectX, projectY } from "@/utils/mapProjection";

// Catches content slips on the Our Story page: a missing image import shows up as `undefined`,
// a photo without alt text is invisible to screen readers, and a pin outside the box would be clipped.
describe("Our Story data", () => {
  it("has a unique year, a title and at least one paragraph for every milestone", () => {
    const years = MILESTONES.map((m) => m.year);
    expect(new Set(years).size).toBe(years.length);
    for (const m of MILESTONES) {
      expect(m.title.length).toBeGreaterThan(0);
      expect(m.text.length).toBeGreaterThan(0);
    }
  });

  it("gives every timeline photo a real image and alt text (null is an allowed empty tile)", () => {
    for (const m of MILESTONES) {
      for (const pic of m.pics) {
        if (pic === null) continue;
        expect(typeof pic[0]).toBe("string");
        expect(pic[1].length).toBeGreaterThan(0);
      }
    }
  });

  it("has four process steps, each with a title, image, alt text and caption", () => {
    expect(PROCESS_STEPS).toHaveLength(4);
    for (const [title, img, alt, caption] of PROCESS_STEPS) {
      expect(title.length).toBeGreaterThan(0);
      expect(typeof img).toBe("string");
      expect(alt.length).toBeGreaterThan(0);
      expect(caption.length).toBeGreaterThan(0);
    }
  });

  it("keeps every map point inside the map and gives each city a name", () => {
    for (const p of [MAP_HOME, ...MAP_PINS]) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(projectX(p.lon)).toBeGreaterThanOrEqual(0);
      expect(projectX(p.lon)).toBeLessThanOrEqual(MAP_W);
      expect(projectY(p.lat)).toBeGreaterThanOrEqual(0);
      expect(projectY(p.lat)).toBeLessThanOrEqual(MAP_H);
    }
  });

  it("has pillars, figures and a road photo", () => {
    expect(PILLARS.length).toBeGreaterThan(0);
    expect(STORY_STATS.length).toBeGreaterThan(0);
    expect(typeof ROAD_PHOTO.src).toBe("string");
    expect(ROAD_PHOTO.alt.length).toBeGreaterThan(0);
  });
});
