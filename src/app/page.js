'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Footer from '../components/Footer';

const CART_STORAGE_KEY = 'fit_suplementos_cart';

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

const formatPriceARS = (value) => new Intl.NumberFormat('es-AR').format(value);

export default function HomePage() {
  const [cart, setCart] = useState([]);

  // Se recupera el carrito guardado al montar el componente en cliente.
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return;
    }

    try {
      const parsedCart = JSON.parse(savedCart);
      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    } catch {
      setCart([]);
    }
  }, []);

  // Se guarda el carrito cada vez que cambia.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const totalAmount = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      // Si el producto ya está en el carrito, aumenta cantidad.
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header cartCount={totalItems} />

      <main className="site-main">
        <Hero />
        <ProductList products={products} onAddToCart={handleAddToCart} formatPriceARS={formatPriceARS} />
        <Cart
          cart={cart}
          totalItems={totalItems}
          totalAmount={totalAmount}
          onClearCart={handleClearCart}
          formatPriceARS={formatPriceARS}
        />
      </main>

      <Footer />
    </>
  );
}
