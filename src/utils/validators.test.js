import { describe, expect, it } from "vitest";
import { email, minLength, phone, required, validate } from "./validators";

describe("required", () => {
  it("fails on empty or whitespace-only text", () => {
    const rule = required("needed");
    expect(rule("")).toBe("needed");
    expect(rule("   ")).toBe("needed");
    expect(rule("Asha")).toBe("");
  });
});

describe("email", () => {
  const rule = email({ required: "missing", invalid: "invalid" });

  it("distinguishes empty from malformed", () => {
    expect(rule("")).toBe("missing");
    expect(rule("asha@")).toBe("invalid");
    expect(rule("asha example.com")).toBe("invalid");
    expect(rule(" asha@example.com ")).toBe("");
  });

  it("uses the invalid message for empty input when no required message is given", () => {
    expect(email({ invalid: "invalid" })("")).toBe("invalid");
  });
});

describe("phone", () => {
  const rule = phone({ required: "missing", invalid: "invalid" });

  it("counts digits only, between 10 and 13", () => {
    expect(rule("")).toBe("missing");
    expect(rule("12345")).toBe("invalid");
    expect(rule("98765 43210")).toBe("");
    expect(rule("+91 98765-43210")).toBe("");
    expect(rule("12345678901234")).toBe("invalid");
  });
});

describe("minLength", () => {
  it("measures trimmed length", () => {
    const rule = minLength(10, "too short");
    expect(rule("         hi         ")).toBe("too short");
    expect(rule("1234567890")).toBe("");
  });
});

describe("validate", () => {
  const schema = {
    name: [required("name?")],
    email: [email({ required: "email?", invalid: "bad email" })],
  };

  it("returns only the failing fields", () => {
    expect(validate(schema, { name: "Asha", email: "" })).toEqual({ email: "email?" });
    expect(validate(schema, { name: "Asha", email: "asha@example.com" })).toEqual({});
  });

  it("stops at the first failing rule of a field", () => {
    const rules = { code: [required("first"), minLength(5, "second")] };
    expect(validate(rules, { code: "" })).toEqual({ code: "first" });
    expect(validate(rules, { code: "abc" })).toEqual({ code: "second" });
  });

  it("treats a missing value as empty text", () => {
    expect(validate(schema, {})).toEqual({ name: "name?", email: "email?" });
  });
});
