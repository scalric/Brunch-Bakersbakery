import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

// Two contexts on purpose: components that only *show* a toast (the cart) read the stable `show` function and do not
// re-render when the message changes; only the <Toast> that displays the message does.
const ToastMessageContext = createContext("");
const ToastActionsContext = createContext(null);
const DURATION_MS = 1600;

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const timer = useRef(0);

  const show = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const actions = useMemo(() => ({ show }), [show]);
  return (
    <ToastActionsContext.Provider value={actions}>
      <ToastMessageContext.Provider value={message}>{children}</ToastMessageContext.Provider>
    </ToastActionsContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastActionsContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx.show;
};

export const useToastMessage = () => useContext(ToastMessageContext);
