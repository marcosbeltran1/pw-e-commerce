"use client";

import Link from "next/link";

export default function PagoExitoso() {
  return (
    <section className="pago-resultado">
      <div className="pago-resultado-card">
        <span className="pago-icono pago-icono-ok" aria-hidden="true">✓</span>
        <h1>¡Pago exitoso!</h1>
        <p>Tu orden fue registrada y está siendo procesada.</p>
        <div className="pago-acciones">
          <Link href="/mis-ordenes" className="btn-pago-primary">
            Ver mis órdenes
          </Link>
          <Link href="/" className="btn-pago-secondary">
            Seguir comprando
          </Link>
        </div>
      </div>
    </section>
  );
}
