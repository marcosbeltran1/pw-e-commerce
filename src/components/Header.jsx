function Header({ cartCount }) {
  return (
    <header className="site-header">
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#inicio" className="nav-logo">FitSuplementos AR</a>
        <ul className="nav-links">
          <li className="nav-item"><a href="#inicio" className="nav-link">Inicio</a></li>
          <li className="nav-item"><a href="#productos" className="nav-link">Productos</a></li>
          <li className="nav-item">
            <a href="#carrito" className="nav-link">
              Carrito
              <span id="cart-count" className="cart-count" aria-live="polite">{cartCount}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
