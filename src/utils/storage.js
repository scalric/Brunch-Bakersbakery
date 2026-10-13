// Safe localStorage access: private mode or blocked storage must never crash the app.
// Every key the site writes is listed here, so there is one place to see (and rename) them.
export const STORAGE_KEYS = {
  cart: "bb_cart",
  promo: "bb_promo",
  location: "bb_location",
  orderType: "bb_order_type",
};

// Keys used before the rename. Only read, so a cart saved by an earlier version is not lost.
export const LEGACY_KEYS = { cart: "cocoa_cart" };

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the app keeps working, it just will not remember */
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* storage unavailable */
  }
}
