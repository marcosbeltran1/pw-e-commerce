import "./styles.css";
import ClientLayout from "@/components/ClientLayout";
import { obtenerProductos } from "@/lib/productos";

export const metadata = {
  title: "Mundo Suplemento — Suplementos deportivos",
  description: "E-commerce de suplementos deportivos. Calidad premium para deportistas.",
};

export default async function RootLayout({ children }) {
  const productos = await obtenerProductos();
  return (
    <html lang="es">
      <body>
        <ClientLayout productos={productos}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
