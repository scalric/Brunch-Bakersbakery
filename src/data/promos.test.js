import { describe, expect, it } from "vitest";
import { PROMOS, calcDiscount } from "./promos";

const byCode = (code) => PROMOS.find((p) => p.code === code);

describe("calcDiscount", () => {
  it("is 0 without a promo", () => {
    expect(calcDiscount(null, 1000)).toBe(0);
  });

  it("applies a percentage promo and rounds to whole rupees", () => {
    expect(calcDiscount(byCode("COMBO15"), 1000)).toBe(150);
    expect(calcDiscount(byCode("COMBO15"), 333)).toBe(50); // 49.95 rounds up
  });

  it("applies a flat promo only at or above its minimum", () => {
    const save50 = byCode("SAVE50");
    expect(calcDiscount(save50, 499)).toBe(0);
    expect(calcDiscount(save50, 500)).toBe(50);
    expect(calcDiscount(save50, 2000)).toBe(50);
  });
});

describe("PROMOS data", () => {
  it("has unique upper-case codes, and each promo has exactly one kind of discount", () => {
    const codes = PROMOS.map((p) => p.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const p of PROMOS) {
      expect(p.code).toBe(p.code.toUpperCase());
      expect(Boolean(p.percent) !== Boolean(p.flat)).toBe(true);
    }
  });
});
