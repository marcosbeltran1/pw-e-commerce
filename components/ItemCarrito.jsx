"use client";

import { useCarrito } from "./CarritoContext";
import { formatearPrecio } from "@/utils/formato";

export default function ItemCarrito({ item, producto }) {
  const { agregarAlCarrito, quitarUnaUnidad, eliminarItem } = useCarrito();
  return (
    <div className="item-carrito">
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="item-info">
        <h4>{producto.nombre}</h4>
        <p className="item-precio">{formatearPrecio(producto.precio)}</p>
      </div>
      <div className="item-controles">
        <button
          className="btn-cantidad btn-restar"
          onClick={() => quitarUnaUnidad(item.id)}
          aria-label="Restar uno"
        >−</button>
        <span className="cantidad">{item.cantidad}</span>
        <button
          className="btn-cantidad btn-sumar"
          onClick={() => agregarAlCarrito(item.id)}
          aria-label="Sumar uno"
        >+</button>
        <button
          className="btn-eliminar"
          onClick={() => eliminarItem(item.id)}
          aria-label="Eliminar producto"
        >🗑</button>
      </div>
    </div>
  );
}
