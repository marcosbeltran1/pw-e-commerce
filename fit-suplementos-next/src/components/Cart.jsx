"use client";
function Cart({ cart, totalItems, totalAmount, onClearCart, formatPriceARS }) {
    return (
      <section id="carrito" className="cart-section" aria-labelledby="cart-title">
        <h2 id="cart-title" className="section-title">Carrito</h2>
  
        {totalItems === 0 ? (
          <p id="cart-empty-message" className="cart-empty-message">Tu carrito está vacío. ¡Sumá tus suplementos favoritos!</p>
        ) : (
          <p id="cart-empty-message" className="cart-empty-message">
            Tenés {totalItems} producto{totalItems > 1 ? 's' : ''} en el carrito.
          </p>
        )}
  
        <div id="cart-items" className="cart-items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${formatPriceARS(item.price)} ARS</p>
              </div>
              <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
            </article>
          ))}
        </div>
  
        <div className="cart-summary">
          <p className="cart-total">
            Total: <span id="cart-total-amount">${formatPriceARS(totalAmount)} ARS</span>
          </p>
          <button
            id="clear-cart-button"
            type="button"
            className="clear-cart-button"
            onClick={onClearCart}
            disabled={totalItems === 0}
          >
            Vaciar carrito
          </button>
        </div>
      </section>
    );
  }
  
  export default Cart;
  