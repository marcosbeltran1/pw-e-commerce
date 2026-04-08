import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "DarkFuel Supplements",
  description: "E-commerce de suplementos fitness"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="container nav">
          <Link className="brand" href="/">
            DarkFuel
          </Link>
          <nav>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="#">Carrito</Link>
            <Link href="#">Ingresar</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
