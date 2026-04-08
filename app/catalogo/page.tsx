import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export default function CatalogPage() {
  return (
    <section>
      <h1>Catálogo de suplementos</h1>
      <p>Moneda: ARS · Variantes por sabor/tamaño · Control de stock ficticio.</p>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
