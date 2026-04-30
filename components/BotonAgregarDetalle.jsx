"use client";

import { useCarrito } from "./CarritoContext";

export default function BotonAgregarDetalle({ id }) {
  const { agregarAlCarrito, abrirSidebar } = useCarrito();

  function handleClick() {
    agregarAlCarrito(id);
    abrirSidebar();
  }

  return (
    <button className="btn-agregar btn-agregar-grande" onClick={handleClick}>
      Agregar al carrito
    </button>
  );
}
