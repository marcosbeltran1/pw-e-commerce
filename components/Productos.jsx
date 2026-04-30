"use client";

import ProductoCard from "./ProductoCard";

export default function Productos({ productos }) {
  return (
    <section id="productos">
      <h2>Nuestros productos</h2>
      <div className="grilla-productos">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </section>
  );
}
