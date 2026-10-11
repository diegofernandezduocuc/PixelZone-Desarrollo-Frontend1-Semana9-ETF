function Hero() {
  return (
    <section className="hero py-5" aria-labelledby="titulo-principal">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <p className="etiqueta mb-2">Tienda online</p>
            <h1 id="titulo-principal" className="display-5 fw-bold">Encuentra tu próxima aventura</h1>
            <p className="lead texto-suave">
              Explora nuestro catálogo de videojuegos, encuentra ofertas y administra tu carrito en tiempo real.
            </p>
            <a className="btn btn-pixel btn-lg" href="#productos">Ver productos</a>
          </div>
          <div className="col-lg-6">
            <img
              className="img-fluid hero-imagen"
              src={`${import.meta.env.BASE_URL}assets/img/banner-gaming.svg`}
              alt="Ilustración de un control de videojuegos y elementos digitales"
              width="620"
              height="360"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
