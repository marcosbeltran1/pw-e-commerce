"use client";

import Link from "next/link";
import { useCarrito } from "./CarritoContext";
import { useAuth } from "./AuthContext";
import { esAdmin } from "@/lib/admin";

export default function Header() {
  const { cantidadTotal, abrirSidebar } = useCarrito();
  const { usuario, salir } = useAuth();

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
              className="btn-carrito"
              onClick={abrirSidebar}
              aria-label="Abrir carrito"
            >
              Carrito ({cantidadTotal})
            </button>
          </li>
          {usuario ? (
            <>
              <li className="usuario-email">{usuario.email}</li>
              <li><Link href="/mis-ordenes">Mis órdenes</Link></li>
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
