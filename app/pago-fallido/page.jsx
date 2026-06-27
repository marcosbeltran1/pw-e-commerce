"use client";

import Link from "next/link";

export default function PagoFallido() {
  return (
    <section className="pago-resultado">
      <div className="pago-resultado-card">
        <span className="pago-icono pago-icono-error" aria-hidden="true">✕</span>
        <h1>El pago no se pudo completar</h1>
        <p>Hubo un problema con tu pago. Podés intentarlo de nuevo.</p>
        <div className="pago-acciones">
          <Link href="/" className="btn-pago-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
