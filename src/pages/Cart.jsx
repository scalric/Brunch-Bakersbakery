import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "@/components/common/SectionTitle";
import { useCart } from "@/context/CartContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";


export default function Cart() {
  useDocumentTitle("Your Cart");
  const { items, addItem, decrease, remove, clear, subtotal, promo, applyPromo, clearPromo, discount } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [placed, setPlaced] = useState(false);

  const total = subtotal - discount;

  const apply = () => {
    const p = applyPromo(code);
    if (!p) return setMsg("Invalid code");
    setMsg(subtotal < p.min ? `${p.code} saved. Add items worth ₹${p.min - subtotal} more to unlock it` : `${p.code} applied`);
  };
  const checkout = () => { clear(); clearPromo(); setCode(""); setMsg(""); setPlaced(true); };

  if (placed) return <section className="wrap center"><SectionTitle as="h1">Order placed 🎉</SectionTitle><p>Thanks! Your treats are on the way.</p><Link className="btn dark" to="/products">Order more</Link></section>;
  if (!items.length) return <section className="wrap center"><SectionTitle as="h1">Your cart is empty</SectionTitle><Link className="btn dark" to="/products">Browse products</Link></section>;

  return (
    <section className="wrap">
      <SectionTitle as="h1">Your Cart</SectionTitle>
      <div className="cart-grid">
        <div>
          {items.map((i) => (
            <div key={i.id} className="crow">
              <span className="cicon">{i.icon}</span>
              <div className="cname"><b>{i.name}</b><small>₹{i.price}</small></div>
              <div className="qty"><button type="button" onClick={() => decrease(i.id)} aria-label={`Decrease quantity of ${i.name}`}>−</button><span aria-live="polite">{i.qty}</span><button type="button" onClick={() => addItem(i)} aria-label={`Increase quantity of ${i.name}`}>+</button></div>
              <b>₹{i.price * i.qty}</b>
              <button type="button" className="x" onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`}>✕</button>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="coupon"><input placeholder="Promo code" aria-label="Promo code" value={code} onChange={(e) => setCode(e.target.value)} /><button type="button" onClick={apply}>Apply</button></div>
          {(msg || promo) && <small className="muted" role="status">{msg || `${promo.code} applied`}</small>}
          <p className="srow"><span>Subtotal</span><span>₹{subtotal}</span></p>
          <p className="srow"><span>Discount</span><span>− ₹{discount}</span></p>
          <p className="srow total"><span>Total</span><span>₹{total}</span></p>
          <button type="button" className="btn dark full" onClick={checkout}>Place Order</button>
        </aside>
      </div>
    </section>
  );
}
