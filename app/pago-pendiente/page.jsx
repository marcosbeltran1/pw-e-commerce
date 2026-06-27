"use client";

import Link from "next/link";

export default function PagoPendiente() {
  return (
    <section className="pago-resultado">
      <div className="pago-resultado-card">
        <span className="pago-icono pago-icono-pendiente" aria-hidden="true">⏳</span>
        <h1>Tu pago está pendiente</h1>
        <p>Estamos esperando la confirmación de tu pago. Te avisaremos cuando se acredite.</p>
        <div className="pago-acciones">
          <Link href="/mis-ordenes" className="btn-pago-primary">
            Ver mis órdenes
          </Link>
          <Link href="/" className="btn-pago-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
