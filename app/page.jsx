import Hero from "@/components/Hero";
import Productos from "@/components/Productos";
import Contacto from "@/components/Contacto";
import { obtenerProductos } from "@/lib/productos";

export const revalidate = 60;

export default async function Home() {
  const productos = await obtenerProductos();
  return (
    <>
      <Hero />
      <Productos productos={productos} />
      <Contacto />
    </>
  );
}
