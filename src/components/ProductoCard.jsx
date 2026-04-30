import { formatearPrecio } from "../utils/formato";

export default function ProductoCard({ producto, onAgregar }) {
  return (
    <article className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">{formatearPrecio(producto.precio)}</p>
      <button
        className="btn-agregar"
        onClick={() => onAgregar(producto.id)}
      >
        Agregar al carrito
      </button>
    </article>
  );
}
