import Hero from "@/components/Hero";
import Productos from "@/components/Productos";
import Contacto from "@/components/Contacto";
import { productos } from "@/data/productos";

export default function Home() {
  return (
    <>
      <Hero />
      <Productos productos={productos} />
      <Contacto />
    </>
  );
}
