import { formatearPrecio } from "../utils/formato";
import ItemCarrito from "./ItemCarrito";

export default function CarritoSidebar({
  abierto,
  onCerrar,
  carrito,
  productos,
  total,
  cantidadTotal,
  onSumar,
  onRestar,
  onEliminar,
}) {
  return (
    <>
      <aside
        className={"sidebar-carrito" + (abierto ? " abierto" : "")}
        aria-hidden={!abierto}
      >
        <div className="sidebar-header">
          <h2>Tu carrito</h2>
          <button
            className="btn-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar carrito"
          >✕</button>
        </div>

        <div className="items-carrito">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            carrito.map((item) => {
              const producto = productos.find((p) => p.id === item.id);
              return (
                <ItemCarrito
                  key={item.id}
                  item={item}
                  producto={producto}
                  onSumar={onSumar}
                  onRestar={onRestar}
                  onEliminar={onEliminar}
                />
              );
            })
          )}
        </div>

        <div className="sidebar-footer">
          <p className="total">Total: <span>{formatearPrecio(total)}</span></p>
          <button
            className="btn-finalizar"
            onClick={() => {
              if (cantidadTotal === 0) {
                alert("Tu carrito está vacío");
                return;
              }
              alert("Compra simulada. Total: " + formatearPrecio(total));
            }}
          >
            Finalizar compra
          </button>
        </div>
      </aside>

      <div
        className={"overlay" + (abierto ? " activo" : "")}
        onClick={onCerrar}
      ></div>
    </>
  );
}
