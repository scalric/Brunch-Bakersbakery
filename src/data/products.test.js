import { describe, expect, it } from "vitest";
import { CATEGORIES, PRODUCTS } from "./products";

// Catches typos in products.js before they reach the menu: a wrong image name makes img() return undefined
// (the card would silently fall back to the emoji), and a wrong category would hide the item from every chip.
describe("PRODUCTS data", () => {
  it("has unique ids", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a name, a positive whole-rupee price and an emoji fallback for every product", () => {
    for (const p of PRODUCTS) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(Number.isInteger(p.price) && p.price > 0).toBe(true);
      expect(p.icon.length).toBeGreaterThan(0);
    }
  });

  it("uses only categories that exist", () => {
    const names = new Set(CATEGORIES.map((c) => c.name));
    for (const p of PRODUCTS) expect(names.has(p.category)).toBe(true);
  });

  it("never points at an image file that is missing", () => {
    for (const p of PRODUCTS) {
      if ("image" in p) expect(typeof p.image).toBe("string");
    }
  });
});
