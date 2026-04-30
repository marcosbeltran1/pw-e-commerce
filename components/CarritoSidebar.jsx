"use client";

import { useCarrito } from "./CarritoContext";
import { productos } from "@/data/productos";
import { formatearPrecio } from "@/utils/formato";
import ItemCarrito from "./ItemCarrito";

export default function CarritoSidebar() {
  const { carrito, sidebarAbierto, total, cantidadTotal, cerrarSidebar } = useCarrito();

  function finalizar() {
    if (cantidadTotal === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    alert("Compra simulada. Total: " + formatearPrecio(total));
  }

  return (
    <>
      <aside
        className={"sidebar-carrito" + (sidebarAbierto ? " abierto" : "")}
        aria-hidden={!sidebarAbierto}
      >
        <div className="sidebar-header">
          <h2>Tu carrito</h2>
          <button
            className="btn-cerrar"
            onClick={cerrarSidebar}
            aria-label="Cerrar carrito"
          >✕</button>
        </div>
        <div className="items-carrito">
          {carrito.length === 0
            ? <p className="carrito-vacio">Tu carrito está vacío</p>
            : carrito.map((item) => {
                const producto = productos.find((p) => p.id === item.id);
                return (
                  <ItemCarrito key={item.id} item={item} producto={producto} />
                );
              })
          }
        </div>
        <div className="sidebar-footer">
          <p className="total">Total: <span>{formatearPrecio(total)}</span></p>
          <button className="btn-finalizar" onClick={finalizar}>
            Finalizar compra
          </button>
        </div>
      </aside>

      <div
        className={"overlay" + (sidebarAbierto ? " activo" : "")}
        onClick={cerrarSidebar}
      ></div>
    </>
  );
}
