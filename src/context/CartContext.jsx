import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { PROMOS, calcDiscount } from "@/data/promos";
import { LEGACY_KEYS, STORAGE_KEYS, readJSON, removeKey, writeJSON } from "@/utils/storage";
import { cartReducer, sanitizeCart } from "./cartReducer";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);
const PRODUCTS_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

const loadCart = () =>
  sanitizeCart(readJSON(STORAGE_KEYS.cart, null) ?? readJSON(LEGACY_KEYS.cart, null), (id) => PRODUCTS_BY_ID.has(id));

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(cartReducer, null, loadCart);
  const [promoCode, setPromoCode] = useState(() => readJSON(STORAGE_KEYS.promo, ""));
  const showToast = useToast();

  useEffect(() => {
    writeJSON(STORAGE_KEYS.cart, lines);
  }, [lines]);

  useEffect(() => {
    if (promoCode) writeJSON(STORAGE_KEYS.promo, promoCode);
    else removeKey(STORAGE_KEYS.promo);
  }, [promoCode]);

  const addItem = useCallback(
    (product) => {
      dispatch({ type: "add", id: product.id });
      showToast(`${product.name} added to cart`);
    },
    [showToast]
  );
  const decrease = useCallback((id) => dispatch({ type: "dec", id }), []);
  const remove = useCallback((id) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const clearPromo = useCallback(() => setPromoCode(""), []);

  const applyPromo = useCallback((raw) => {
    const found = PROMOS.find((p) => p.code === String(raw).trim().toUpperCase());
    if (!found) return null;
    setPromoCode(found.code);
    return found;
  }, []);

  // saved lines + catalog data = what the cart page shows
  const items = useMemo(() => lines.map((line) => ({ ...PRODUCTS_BY_ID.get(line.id), qty: line.qty })), [lines]);
  const promo = useMemo(() => PROMOS.find((p) => p.code === promoCode) || null, [promoCode]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);
  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      promo,
      discount: calcDiscount(promo, subtotal),
      addItem,
      decrease,
      remove,
      clear,
      applyPromo,
      clearPromo,
    }),
    [items, count, subtotal, promo, addItem, decrease, remove, clear, applyPromo, clearPromo]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
