import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { PROMOS } from "@/data/promos";

// Header popover: type a promo code or pick one of the sample codes. `innerRef` lets the header close it on outside click.
export default function PromoPopover({ innerRef }) {
  const { subtotal, applyPromo } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const tryCode = (raw) => {
    const p = applyPromo(raw);
    if (!p) return setMsg("That code isn't valid. Pick one below.");
    setCode(p.code);
    setMsg(
      subtotal < p.min
        ? `${p.code} saved. Add ₹${p.min - subtotal} more to unlock ${p.label}.`
        : `${p.code} applied: ${p.label} ${p.desc}.`
    );
  };

  return (
    <div className="hdr-pop" ref={innerRef} role="dialog" aria-label="Apply promo code">
      <h4>Have a promo code?</h4>
      <form onSubmit={(e) => { e.preventDefault(); tryCode(code); }}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" aria-label="Promo code" autoFocus />
        <button type="submit" className="hdr-btn">Apply</button>
      </form>
      {msg && <small role="status">{msg}</small>}
      <div className="codes">
        {PROMOS.map((p) => (
          <button type="button" key={p.code} onClick={() => tryCode(p.code)}>{p.code}</button>
        ))}
      </div>
    </div>
  );
}
