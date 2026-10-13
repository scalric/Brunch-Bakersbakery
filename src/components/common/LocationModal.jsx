import { useEffect, useRef, useState } from "react";
import { useDeliveryLocation } from "@/context/LocationContext";

export default function LocationModal() {
  const { open, closeModal, setLocation } = useDeliveryLocation();
  const [pin, setPin] = useState("");
  const input = useRef(null);

  // Escape closes the dialog; the field is focused when it opens
  useEffect(() => {
    if (!open) return undefined;
    input.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  if (!open) return null;
  const save = (v) => { setLocation(v); setPin(""); closeModal(); };
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="loc-title" onClick={(e) => e.stopPropagation()}>
        <h3 id="loc-title">Let's find a store near you</h3>
        <button type="button" className="btn dark" onClick={() => save("Current location")}>Use current location</button>
        <p className="center">OR</p>
        <form onSubmit={(e) => { e.preventDefault(); if (pin.trim()) save(pin.trim()); }}>
          <input ref={input} placeholder="Enter pincode, locality, area..." aria-label="Pincode, locality or area" value={pin} onChange={(e) => setPin(e.target.value)} />
          <button type="submit" className="btn dark" disabled={!pin.trim()}>Confirm</button>
        </form>
      </div>
    </div>
  );
}
