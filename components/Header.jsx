"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCarrito } from "./CarritoContext";
import { useAuth } from "./AuthContext";
import { esAdmin } from "@/lib/admin";

export default function Header() {
  const { cantidadTotal, abrirSidebar } = useCarrito();
  const { usuario, salir } = useAuth();

  // Feedback visual: el botón del carrito pulsa cuando aumenta la cantidad.
  const [pulsoCarrito, setPulsoCarrito] = useState(false);
  const cantidadPrevia = useRef(cantidadTotal);

  useEffect(() => {
    if (cantidadTotal > cantidadPrevia.current) {
      cantidadPrevia.current = cantidadTotal;
      // Reinicia la animación aunque ya estuviera activa (varios "agregar" seguidos).
      setPulsoCarrito(false);
      const raf = requestAnimationFrame(() => setPulsoCarrito(true));
      return () => cancelAnimationFrame(raf);
    }
    cantidadPrevia.current = cantidadTotal;
  }, [cantidadTotal]);

  return (
    <header>
      <Link href="/" className="logo">Mundo Suplemento</Link>
      <nav>
        <ul>
          <li><Link href="/#inicio">Inicio</Link></li>
          <li><Link href="/#productos">Productos</Link></li>
          <li><Link href="/#contacto">Contacto</Link></li>
          <li>
            <button
              className={`btn-carrito${pulsoCarrito ? " pulso" : ""}`}
              onClick={abrirSidebar}
              onAnimationEnd={() => setPulsoCarrito(false)}
              aria-label="Abrir carrito"
            >
              Carrito ({cantidadTotal})
            </button>
          </li>
          {usuario ? (
            <>
              <li className="usuario-email">{usuario.email}</li>
              <li><Link href="/mis-ordenes">Mis órdenes</Link></li>
              <li><Link href="/mi-cuenta">Mi cuenta</Link></li>
              {esAdmin(usuario) && (
                <li><Link href="/admin">Admin</Link></li>
              )}
              <li>
                <button className="btn-salir" onClick={salir}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className="auth-links">
              <Link href="/login">Ingresar</Link>
              <Link href="/registro">Registrarse</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
