export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-orbe hero-orbe-1" />
        <span className="hero-orbe hero-orbe-2" />
        <span className="hero-grid" />
      </div>
      <div className="hero-inner">
        <span className="hero-kicker">Nutrición deportiva premium</span>
        <h2>
          Suplementos deportivos para tu{" "}
          <span className="hero-destacado">mejor versión</span>
        </h2>
        <p>Calidad premium, precios accesibles. Todo lo que necesitás para alcanzar tus objetivos.</p>
        <div className="hero-acciones">
          <a href="#productos" className="btn-hero">
            Ver productos
            <span className="btn-hero-flecha" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
