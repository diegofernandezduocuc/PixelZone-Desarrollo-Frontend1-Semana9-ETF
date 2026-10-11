function Navbar({ onCategoria, onMostrarTodos, totalUnidades }) {
  const irAProductos = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
  }

  const filtrar = (categoria) => {
    onCategoria(categoria)
    irAProductos()
  }

  const mostrarTodos = () => {
    onMostrarTodos()
    irAProductos()
  }

  return (
    <header id="inicio">
      <nav className="navbar navbar-expand-lg navbar-dark barra-principal" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand marca" href="#inicio" aria-label="Ir al inicio de Pixel Zone">
            <img src={`${import.meta.env.BASE_URL}assets/img/logo-pixel-zone.svg`} alt="Logotipo de Pixel Zone" width="52" height="52" />
            <span>
              <strong>Pixel Zone</strong>
              <small>Videojuegos para todos los estilos</small>
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Mostrar navegación"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
              <li className="nav-item">
                <button className="nav-link boton-nav" type="button" onClick={mostrarTodos}>Productos</button>
              </li>
              <li className="nav-item">
                <button className="nav-link boton-nav" type="button" onClick={() => filtrar('Acción')}>Acción</button>
              </li>
              <li className="nav-item">
                <button className="nav-link boton-nav" type="button" onClick={() => filtrar('Estrategia')}>Estrategia</button>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#carrito">
                  Carrito <span className="badge contador-carrito ms-1">{totalUnidades}</span>
                </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
