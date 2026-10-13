import { useDeliveryLocation } from "@/context/LocationContext";

// Store finder (homepage): a short prompt that opens the same store / location picker as the header and hero.
export default function CallToAction() {
  const { openModal } = useDeliveryLocation();
  return (
    <section className="sec mint findstore" id="find-store" aria-labelledby="findstore-title">
      <div className="sec-in findstore-in">
        <h2 id="findstore-title">Find a Bakery Near You</h2>
        <p className="sec-lead">Enter your area to find your nearest Brunch Bakers store.</p>
        <button type="button" className="btn" onClick={openModal}>Find a Store</button>
      </div>
    </section>
  );
}
