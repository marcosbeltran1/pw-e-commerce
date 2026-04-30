import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Productos from "./components/Productos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import CarritoSidebar from "./components/CarritoSidebar";
import { productos } from "./data/productos";

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  function agregarAlCarrito(id) {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === id);
      if (existe) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { id, cantidad: 1 }];
    });
  }

  function quitarUnaUnidad(id) {
    setCarrito((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.cantidad === 1) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) =>
        i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
      );
    });
  }

  function eliminarItem(id) {
    setCarrito((prev) => prev.filter((i) => i.id !== id));
  }

  const cantidadTotal = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  const total = carrito.reduce((acc, i) => {
    const producto = productos.find((p) => p.id === i.id);
    return acc + producto.precio * i.cantidad;
  }, 0);

  return (
    <>
      <Header
        cantidadTotal={cantidadTotal}
        onAbrirCarrito={() => setSidebarAbierto(true)}
      />
      <main>
        <Hero />
        <Productos
          productos={productos}
          onAgregar={agregarAlCarrito}
        />
        <Contacto />
      </main>
      <Footer />
      <CarritoSidebar
        abierto={sidebarAbierto}
        onCerrar={() => setSidebarAbierto(false)}
        carrito={carrito}
        productos={productos}
        total={total}
        cantidadTotal={cantidadTotal}
        onSumar={agregarAlCarrito}
        onRestar={quitarUnaUnidad}
        onEliminar={eliminarItem}
      />
    </>
  );
}
