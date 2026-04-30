"use client";

import Link from "next/link";
import { useCarrito } from "./CarritoContext";
import { formatearPrecio } from "@/utils/formato";

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  return (
    <article className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">{formatearPrecio(producto.precio)}</p>
      <Link href={`/producto/${producto.id}`} className="btn-detalle">Ver detalle</Link>
      <button
        className="btn-agregar"
        onClick={() => agregarAlCarrito(producto.id)}
      >
        Agregar al carrito
      </button>
    </article>
  );
}
