import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <p className="badge">Suplementación inteligente</p>
      <h1>Potenciá tu rendimiento con suplementos de calidad.</h1>
      <p>
        Bienvenido al e-commerce de tu Trabajo Práctico. Desde acá vamos a construir
        catálogo, carrito, autenticación, órdenes y pagos con Mercado Pago sandbox.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/catalogo">
          Ver catálogo
        </Link>
        <a className="button ghost" href="#roadmap">
          Ver roadmap
        </a>
      </div>

      <section id="roadmap" className="panel">
        <h2>Roadmap inicial</h2>
        <ul>
          <li>Semana 1-2: repositorio, CI/CD y buenas prácticas.</li>
          <li>Semana 3-4: base visual responsive con estilo fitness oscuro.</li>
          <li>Semana 5-9: lógica JS + React/Next + API interna.</li>
          <li>Semana 10-12: Supabase con órdenes persistentes.</li>
          <li>Semana 13-16: Mercado Pago sandbox, webhooks y demo final.</li>
        </ul>
      </section>
    </section>
  );
}
