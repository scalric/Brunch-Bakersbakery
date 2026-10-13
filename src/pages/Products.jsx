import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/common/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "All";
  const q = (params.get("q") || "").trim();
  const byCat = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  useDocumentTitle(q ? `Search: ${q}` : cat === "All" ? "Menu" : cat);
  const list = q ? byCat.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : byCat;
  const choose = (c) => (c === "All" ? setParams(q ? { q } : {}) : setParams(q ? { cat: c, q } : { cat: c }));
  return (
    <section className="wrap">
      <SectionTitle as="h1">{q ? `Results for "${q}"` : cat === "All" ? "Our Menu" : cat}</SectionTitle>
      <div className="chips">
        {["All", ...CATEGORIES.map(({ name }) => name)].map((c) => (
          <button key={c} className={c === cat ? "chip on" : "chip"} onClick={() => choose(c)}>{c}</button>
        ))}
      </div>
      {list.length ? (
        <div className="products">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <p className="center muted">Nothing here yet. Try another category.</p>
      )}
    </section>
  );
}
