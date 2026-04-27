function ProductCard({ product, onAddToCart, formatPriceARS }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.alt} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${formatPriceARS(product.price)} ARS</p>
      <button type="button" className="product-buy-button" onClick={() => onAddToCart(product)}>
        Comprar
      </button>
    </article>
  );
}

export default ProductCard;
