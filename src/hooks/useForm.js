import { useEffect, useRef, useState } from "react";
import { validate } from "@/utils/validators";

/**
 * State for the front-end-only forms (contact, franchise enquiry).
 *
 * - An error appears when a field is left with text in it, or after the first submit attempt,
 *   and from then on it updates live while the person types.
 * - A failed submit moves focus to the first invalid field (in schema order).
 * - A valid submit calls `onValid(values)`, resets the form and stores what it returns in `sent`
 *   (used to show the confirmation). `doneRef` goes on the confirmation element so it receives focus.
 *
 * `idPrefix` makes field ids unique per form: the "email" field of a form with idPrefix "ct" gets id "ct-email".
 */
export default function useForm({ initial, schema, idPrefix, onValid }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(null);
  const doneRef = useRef(null);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const onChange = (name) => (e) => {
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validate(schema, next));
  };

  const onBlur = (name) => () => {
    if (!attempted && !values[name].trim()) return;
    const message = validate(schema, values)[name];
    setErrors((prev) => {
      const { [name]: _old, ...rest } = prev;
      return message ? { ...rest, [name]: message } : rest;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(schema, values);
    setAttempted(true);
    setErrors(found);
    const first = Object.keys(schema).find((name) => found[name]);
    if (first) {
      document.getElementById(`${idPrefix}-${first}`)?.focus();
      return;
    }
    setSent(onValid(values));
    setValues(initial);
    setErrors({});
    setAttempted(false);
  };

  // everything an <input> needs; `hintId` is the id of helper text to announce while there is no error
  const fieldProps = (name, hintId) => ({
    id: `${idPrefix}-${name}`,
    value: values[name],
    onChange: onChange(name),
    onBlur: onBlur(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${idPrefix}-${name}-e` : hintId,
  });

  return {
    values,
    setValues,
    errors,
    hasErrors: Object.keys(errors).length > 0,
    attempted,
    sent,
    setSent,
    doneRef,
    onChange,
    onSubmit,
    fieldProps,
  };
}
