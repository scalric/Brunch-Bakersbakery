import { describe, expect, it } from "vitest";
import { WHY_HIGHLIGHTS, WHY_STATS } from "./franchise";

describe("Why Brunch Bakers data", () => {
  it("has four highlight cards, each with a real image, a title and text", () => {
    expect(WHY_HIGHLIGHTS).toHaveLength(4);
    for (const h of WHY_HIGHLIGHTS) {
      expect(typeof h.img).toBe("string");
      expect(h.title.length).toBeGreaterThan(0);
      expect(h.text.length).toBeGreaterThan(0);
      expect(h.pos).toMatch(/^\d+% \d+%$/);
    }
  });

  it("derives its figures from the site data and never leaves a blank value", () => {
    expect(WHY_STATS.length).toBeGreaterThan(0);
    for (const [value, label] of WHY_STATS) {
      expect(value.length).toBeGreaterThan(0);
      expect(label.length).toBeGreaterThan(0);
    }
  });
});
