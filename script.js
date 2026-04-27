const products = [
  {
    id: 1,
    name: 'Whey Protein Vainilla 1kg',
    price: 42500,
    image: 'https://acdn-us.mitiendanube.com/stores/003/435/390/products/product-platinum-whey-protein-vainilla-star-1-f6b8c531e9325b345a17341382541541-1024-1024.webp',
    alt: 'Whey Protein sabor vainilla',
  },
  {
    id: 2,
    name: 'Creatina Monohidratada 300g',
    price: 29900,
    image: 'https://www.enasport.com/cdn/shop/files/CreaPure_2.png?v=1761763735&width=2048',
    alt: 'Creatina monohidratada micronizada',
  },
  {
    id: 3,
    name: 'Pre-Entreno Energy Boost 400g',
    price: 25700,
    image: 'https://matchday-nutrition.es/cdn/shop/files/BOOSTEnergyEditionMockup_1080x.jpg?v=1723746667',
    alt: 'Suplemento pre-entreno energía máxima',
  },
  {
    id: 4,
    name: 'BCAA Recovery 2:1:1 250g',
    price: 18300,
    image: 'https://acdn-us.mitiendanube.com/stores/003/703/137/products/limon-hd-64d6e23371b7ee660217323000961751-480-0.webp',
    alt: 'BCAA sabor frutas',
  },
  {
    id: 5,
    name: 'L-Glutamina Pure 500g',
    price: 21800,
    image: 'https://essentialsmx.com/cdn/shop/files/glutamina-500g-5035535.png?v=1768405691',
    alt: 'L-Glutamina en polvo',
  },
  {
    id: 6,
    name: 'ZMA Recovery 90 cápsulas',
    price: 14900,
    image: 'https://www.enasport.com/cdn/shop/files/ZMA.jpg?v=1739376633&width=1000',
    alt: 'Suplemento ZMA en cápsulas',
  },
];

const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartMessage = document.getElementById('cart-empty-message');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const clearCartButton = document.getElementById('clear-cart-button');
const CART_STORAGE_KEY = 'fit_suplementos_cart';

const cart = [];

const formatPriceARS = (value) => new Intl.NumberFormat('es-AR').format(value);

const getCartItemsCount = () => cart.reduce((total, item) => total + item.quantity, 0);

const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

// Guarda el estado actual del carrito en localStorage.
const saveCartToStorage = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Recupera el carrito guardado al abrir o recargar la página.
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedCart) {
    return;
  }

  try {
    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return;
    }

    cart.length = 0;
    parsedCart.forEach((item) => {
      if (item && typeof item.id === 'number' && typeof item.name === 'string' && typeof item.price === 'number' && typeof item.quantity === 'number') {
        cart.push(item);
      }
    });
  } catch (error) {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
};

const renderCartItems = () => {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    return;
  }

  const cartItemsMarkup = cart
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">$${formatPriceARS(item.price)} ARS</p>
          </div>
          <p class="cart-item-quantity">Cantidad: ${item.quantity}</p>
        </article>
      `
    )
    .join('');

  cartItemsContainer.innerHTML = cartItemsMarkup;
};

const updateCartUI = () => {
  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();

  cartCount.textContent = cartItemsCount;
  cartTotalAmount.textContent = `$${formatPriceARS(cartTotal)} ARS`;

  if (cartItemsCount === 0) {
    cartMessage.textContent = 'Tu carrito está vacío. ¡Sumá tus suplementos favoritos!';
    clearCartButton.disabled = true;
  } else {
    cartMessage.textContent = `Tenés ${cartItemsCount} producto${cartItemsCount > 1 ? 's' : ''} en el carrito.`;
    clearCartButton.disabled = false;
  }

  renderCartItems();
};

const handleBuyClick = (product) => {
  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  // Se persiste cada alta de producto.
  saveCartToStorage();
  updateCartUI();
};

const renderProducts = () => {
  const productsMarkup = products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.alt}" class="product-image" />
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${formatPriceARS(product.price)} ARS</p>
          <button type="button" class="product-buy-button" data-product-id="${product.id}">Comprar</button>
        </article>
      `
    )
    .join('');

  productsGrid.innerHTML = productsMarkup;
};

productsGrid.addEventListener('click', (event) => {
  const buyButton = event.target.closest('.product-buy-button');

  if (!buyButton) {
    return;
  }

  const productId = Number(buyButton.dataset.productId);
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  handleBuyClick(selectedProduct);
});

clearCartButton.addEventListener('click', () => {
  cart.length = 0;
  // Vaciar carrito también limpia localStorage.
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartUI();
});

renderProducts();
loadCartFromStorage();
updateCartUI();
