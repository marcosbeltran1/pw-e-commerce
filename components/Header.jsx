"use client";

import Link from "next/link";
import { useCarrito } from "./CarritoContext";

export default function Header() {
  const { cantidadTotal, abrirSidebar } = useCarrito();
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
        </ul>
      </nav>
    </header>
  );
}
