import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <article className="prod">
      <div className="pimg" aria-hidden="true">
        {product.image ? <img src={product.image} alt="" width="640" height="640" loading="lazy" decoding="async" draggable="false" /> : product.icon}
      </div>
      <h3>{product.name}</h3>
      <div className="prow">
        <b>₹{product.price}</b>
        <button type="button" onClick={() => addItem(product)} aria-label={`Add ${product.name} to cart`}>Add +</button>
      </div>
    </article>
  );
}
