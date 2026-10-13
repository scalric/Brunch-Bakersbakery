export const PROMOS = [
  { code: "COMBO15", label: "15% OFF", desc: "on all orders", min: 0, percent: 15 },
  { code: "SAVE50", label: "₹50 OFF", desc: "orders above ₹500", min: 500, flat: 50 },
  { code: "SAVE80", label: "₹80 OFF", desc: "orders above ₹800", min: 800, flat: 80 },
  { code: "SAVE125", label: "₹125 OFF", desc: "orders above ₹1000", min: 1000, flat: 125 },
  { code: "SAVE200", label: "₹200 OFF", desc: "orders above ₹1500", min: 1500, flat: 200 },
];
export const calcDiscount = (promo, subtotal) => {
  if (!promo || subtotal < promo.min) return 0;
  return promo.percent ? Math.round((subtotal * promo.percent) / 100) : promo.flat;
};
