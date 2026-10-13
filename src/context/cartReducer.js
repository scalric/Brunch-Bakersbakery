// Cart state is a list of { id, qty }. Name, price and icon are looked up from the catalog when the cart is shown,
// so a price edited in products.js also applies to carts that were saved earlier.
export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return state.some((line) => line.id === action.id)
        ? state.map((line) => (line.id === action.id ? { ...line, qty: line.qty + 1 } : line))
        : [...state, { id: action.id, qty: 1 }];
    case "dec":
      return state.map((line) => (line.id === action.id ? { ...line, qty: line.qty - 1 } : line)).filter((line) => line.qty > 0);
    case "remove":
      return state.filter((line) => line.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

// Turns whatever was saved (including the old format that stored full product copies) into valid { id, qty } lines.
// Unknown products, bad quantities and duplicate ids are dropped or merged.
export function sanitizeCart(saved, isKnownId) {
  if (!Array.isArray(saved)) return [];
  const merged = new Map();
  for (const line of saved) {
    const id = Number(line?.id);
    const qty = Math.floor(Number(line?.qty));
    if (!Number.isFinite(id) || !isKnownId(id) || !(qty > 0)) continue;
    merged.set(id, (merged.get(id) || 0) + qty);
  }
  return [...merged].map(([id, qty]) => ({ id, qty }));
}
