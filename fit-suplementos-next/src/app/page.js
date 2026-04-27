import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductList />
        <Cart />
      </main>
      <Footer />
    </>
  );
}