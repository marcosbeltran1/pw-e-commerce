"use client";
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart, formatPriceARS }) {
  return (
    <section id="productos" className="products-section" aria-labelledby="products-title">
      <h2 id="products-title" className="section-title">Productos destacados</h2>
      <div id="products-grid" className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            formatPriceARS={formatPriceARS}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
