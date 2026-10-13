import { describe, expect, it } from "vitest";
import { MAP_H, MAP_W, projectX, projectY } from "./mapProjection";

describe("mapProjection", () => {
  it("maps the west and east edges of the box to 0 and MAP_W", () => {
    expect(projectX(67)).toBe(0);
    expect(projectX(98)).toBe(MAP_W);
  });

  it("maps the north and south edges of the box to 0 and MAP_H (north is up)", () => {
    expect(projectY(33)).toBe(0);
    expect(projectY(11)).toBe(MAP_H);
  });

  it("puts a place further east to the right and further north higher up", () => {
    expect(projectX(86.2)).toBeGreaterThan(projectX(77.2));
    expect(projectY(28.6)).toBeLessThan(projectY(13.1));
  });
});
