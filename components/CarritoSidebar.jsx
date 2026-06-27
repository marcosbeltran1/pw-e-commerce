"use client";

import { useState } from "react";
import { useCarrito } from "./CarritoContext";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { formatearPrecio } from "@/utils/formato";
import ItemCarrito from "./ItemCarrito";

export default function CarritoSidebar() {
  const { carrito, productos, sidebarAbierto, total, cantidadTotal, cerrarSidebar, vaciarCarrito } =
    useCarrito();
  const { usuario } = useAuth();
  const [procesando, setProcesando] = useState(false);

  async function finalizarCompra() {
    if (!usuario) {
      cerrarSidebar();
      window.location.href = "/login";
      return;
    }

    if (cantidadTotal === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    setProcesando(true);
    try {
      // 1. Obtener token de sesión
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      // 2. Crear la orden en la base
      const resOrden = await fetch("/api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: carrito }),
      });
      const dataOrden = await resOrden.json();

      if (!resOrden.ok) {
        alert("Error al registrar la orden: " + (dataOrden.error ?? "Error inesperado"));
        return;
      }

      const { ordenId } = dataOrden;

      // 3. Armar items para Mercado Pago con precios del contexto
      const itemsMP = carrito.map((item) => {
        const prod = productos.find((p) => p.id === item.id);
        return {
          nombre: prod.nombre,
          precio: prod.precio,
          cantidad: item.cantidad,
        };
      });

      // 4. Crear preferencia de pago
      const resCheckout = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordenId, items: itemsMP }),
      });
      const dataCheckout = await resCheckout.json();

      if (!resCheckout.ok || !dataCheckout.init_point) {
        alert("Error al iniciar el pago: " + (dataCheckout.error ?? "Error inesperado"));
        return;
      }

      // 5. Vaciar carrito y redirigir a MP
      vaciarCarrito();
      cerrarSidebar();
      window.location.href = dataCheckout.init_point;
    } catch {
      alert("Error de conexión. Intentá nuevamente.");
    } finally {
      setProcesando(false);
    }
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
          >
            ✕
          </button>
        </div>
        <div className="items-carrito">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            carrito.map((item) => {
              const producto = productos.find((p) => p.id === item.id);
              return <ItemCarrito key={item.id} item={item} producto={producto} />;
            })
          )}
        </div>
        <div className="sidebar-footer">
          <p className="total">
            Total: <span>{formatearPrecio(total)}</span>
          </p>
          <button
            className="btn-finalizar"
            onClick={finalizarCompra}
            disabled={procesando}
          >
            {procesando ? "Procesando..." : "Finalizar compra"}
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
