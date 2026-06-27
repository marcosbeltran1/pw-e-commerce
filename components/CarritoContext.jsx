"use client";

import { createContext, useContext, useState } from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ productos, children }) {
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

  function vaciarCarrito() { setCarrito([]); }
  function abrirSidebar() { setSidebarAbierto(true); }
  function cerrarSidebar() { setSidebarAbierto(false); }

  const cantidadTotal = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  const total = carrito.reduce((acc, i) => {
    const producto = productos.find((p) => p.id === i.id);
    return acc + (producto ? producto.precio * i.cantidad : 0);
  }, 0);

  const value = {
    carrito,
    productos,
    sidebarAbierto,
    cantidadTotal,
    total,
    agregarAlCarrito,
    quitarUnaUnidad,
    eliminarItem,
    vaciarCarrito,
    abrirSidebar,
    cerrarSidebar,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return ctx;
}
