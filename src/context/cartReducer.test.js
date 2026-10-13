import { describe, expect, it } from "vitest";
import { cartReducer, sanitizeCart } from "./cartReducer";

describe("cartReducer", () => {
  it("adds a new product with quantity 1", () => {
    expect(cartReducer([], { type: "add", id: 7 })).toEqual([{ id: 7, qty: 1 }]);
  });

  it("increments the quantity when the product is already in the cart", () => {
    const state = [{ id: 7, qty: 1 }, { id: 9, qty: 2 }];
    expect(cartReducer(state, { type: "add", id: 7 })).toEqual([{ id: 7, qty: 2 }, { id: 9, qty: 2 }]);
  });

  it("decreases the quantity and removes the line at zero", () => {
    const state = [{ id: 7, qty: 2 }];
    const once = cartReducer(state, { type: "dec", id: 7 });
    expect(once).toEqual([{ id: 7, qty: 1 }]);
    expect(cartReducer(once, { type: "dec", id: 7 })).toEqual([]);
  });

  it("removes a line and clears the cart", () => {
    const state = [{ id: 1, qty: 3 }, { id: 2, qty: 1 }];
    expect(cartReducer(state, { type: "remove", id: 1 })).toEqual([{ id: 2, qty: 1 }]);
    expect(cartReducer(state, { type: "clear" })).toEqual([]);
  });

  it("does not mutate the previous state", () => {
    const state = [{ id: 1, qty: 1 }];
    cartReducer(state, { type: "add", id: 1 });
    expect(state).toEqual([{ id: 1, qty: 1 }]);
  });

  it("ignores unknown actions", () => {
    const state = [{ id: 1, qty: 1 }];
    expect(cartReducer(state, { type: "nope" })).toBe(state);
  });
});

describe("sanitizeCart", () => {
  const known = (id) => id >= 1 && id <= 10;

  it("reads the old format that stored full product copies", () => {
    const old = [{ id: 4, name: "Cheesecake", price: 725, icon: "x", category: "Cakes", qty: 2 }];
    expect(sanitizeCart(old, known)).toEqual([{ id: 4, qty: 2 }]);
  });

  it("drops products that no longer exist", () => {
    expect(sanitizeCart([{ id: 99, qty: 1 }, { id: 2, qty: 1 }], known)).toEqual([{ id: 2, qty: 1 }]);
  });

  it("drops bad quantities and merges duplicate ids", () => {
    const saved = [{ id: 1, qty: 0 }, { id: 2, qty: -3 }, { id: 3, qty: "abc" }, { id: 4, qty: 1 }, { id: 4, qty: 2 }];
    expect(sanitizeCart(saved, known)).toEqual([{ id: 4, qty: 3 }]);
  });

  it("returns an empty cart for anything that is not a list", () => {
    expect(sanitizeCart(null, known)).toEqual([]);
    expect(sanitizeCart({ id: 1, qty: 1 }, known)).toEqual([]);
  });
});
