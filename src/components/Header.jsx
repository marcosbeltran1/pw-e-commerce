export default function Header({ cantidadTotal, onAbrirCarrito }) {
  return (
    <header>
      <a href="#inicio" className="logo">Mundo Suplemento</a>
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li>
            <button
              className="btn-carrito"
              onClick={onAbrirCarrito}
              aria-label="Abrir carrito"
            >
              Carrito ({cantidadTotal})
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
