// Small, pure form validators. A rule takes the field's text and returns an error message, or "" when it passes.
// `validate` runs a schema of rules over the form values and returns { field: message } for failing fields only.
export const EMAIL_RE = /^\S+@\S+\.\S+$/;

export const required = (message) => (value) => (value.trim() ? "" : message);

// `required` is optional: without it an empty email gets the `invalid` message.
export const email =
  ({ required: missing, invalid }) =>
  (value) => {
    const text = value.trim();
    if (!text) return missing ?? invalid;
    return EMAIL_RE.test(text) ? "" : invalid;
  };

// Counts digits only, so "+91 98765 43210" and "98765-43210" both pass.
export const phone =
  ({ required: missing, invalid }) =>
  (value) => {
    if (!value.trim()) return missing;
    const digits = value.replace(/\D/g, "").length;
    return digits >= 10 && digits <= 13 ? "" : invalid;
  };

export const minLength = (min, message) => (value) => (value.trim().length >= min ? "" : message);

// schema: { fieldName: [rule, rule, ...] }. The first failing rule's message wins for each field.
export function validate(schema, values) {
  const errors = {};
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const message = rule(values[field] ?? "");
      if (message) {
        errors[field] = message;
        break;
      }
    }
  }
  return errors;
}
