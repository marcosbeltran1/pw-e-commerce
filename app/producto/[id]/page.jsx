import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { formatearPrecio } from "@/utils/formato";
import BotonAgregarDetalle from "@/components/BotonAgregarDetalle";
import { notFound } from "next/navigation";

export default async function DetalleProducto({ params }) {
  const { id } = await params;
  const { data: producto, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !producto) {
    notFound();
  }

  return (
    <section className="detalle-producto">
      <Link href="/" className="btn-volver">← Volver al catálogo</Link>
      <div className="detalle-grid">
        <img src={producto.imagen} alt={producto.nombre} />
        <div>
          <h2>{producto.nombre}</h2>
          <p className="descripcion-larga">{producto.descripcion}</p>
          <p className="precio precio-grande">{formatearPrecio(producto.precio)}</p>
          <BotonAgregarDetalle id={producto.id} />
        </div>
      </div>
    </section>
  );
}
