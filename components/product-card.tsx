import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.variants.map((v) => v.priceArs));

  return (
    <article className="card">
      <span className="chip">{product.category.toUpperCase()}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">Desde {formatter.format(minPrice)}</p>
      <small>{product.variants.length} variante(s)</small>
      <button type="button" className="button">
        Ver detalle
      </button>
    </article>
  );
}
