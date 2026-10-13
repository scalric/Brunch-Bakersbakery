import { describe, expect, it } from "vitest";
import { LOGIN_PAGE, TRACK_PAGE } from "./account";
import { validate } from "@/utils/validators";

describe("Login and Track forms", () => {
  it("rejects empty login fields and accepts a valid email with a password", () => {
    expect(Object.keys(validate(LOGIN_PAGE.schema, LOGIN_PAGE.initial))).toEqual(["email", "password"]);
    expect(validate(LOGIN_PAGE.schema, { email: "name@example.com", password: "secret" })).toEqual({});
  });

  it("rejects a bad email on the login form", () => {
    expect(validate(LOGIN_PAGE.schema, { email: "not-an-email", password: "x" }).email).toBeTruthy();
  });

  it("rejects empty tracking fields and accepts an order ID with a 10-digit phone", () => {
    expect(Object.keys(validate(TRACK_PAGE.schema, TRACK_PAGE.initial))).toEqual(["orderId", "phone"]);
    expect(validate(TRACK_PAGE.schema, { orderId: "BB1024", phone: "98765 43210" })).toEqual({});
  });

  it("has a schema rule and an input for every field, and a unique id prefix per page", () => {
    for (const page of [LOGIN_PAGE, TRACK_PAGE]) {
      for (const [name] of page.fields) {
        expect(page.schema[name]).toBeDefined();
        expect(name in page.initial).toBe(true);
      }
    }
    expect(LOGIN_PAGE.idPrefix).not.toBe(TRACK_PAGE.idPrefix);
  });
});
