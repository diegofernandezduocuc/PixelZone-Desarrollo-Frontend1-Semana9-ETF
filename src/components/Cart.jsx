import { formatearPrecio } from '../utils/formato'

function Cart({ carrito, totalUnidades, totalPrecio, onAgregar, onQuitar, onEliminar, onComprar, mensajeCompra }) {
  const vacio = carrito.length === 0

  return (
    <section className="py-5 seccion-carrito" id="carrito" aria-labelledby="titulo-carrito">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <p className="etiqueta mb-1">Tu compra</p>
            <h2 id="titulo-carrito">Carrito de compras</h2>
            <p className="texto-suave">Productos seleccionados: <strong>{totalUnidades}</strong></p>

            {vacio ? (
              <div className="alert alerta-pixel" role="status">Tu carrito está vacío.</div>
            ) : (
              <ul className="list-group lista-carrito" aria-live="polite">
                {carrito.map((producto) => (
                  <li className="list-group-item" key={producto.id}>
                    <div>
                      <strong>{producto.nombre}</strong>
                      <div className="texto-suave small">
                        {formatearPrecio(producto.precioOferta)} × {producto.cantidad}
                      </div>
                    </div>
                    <div className="acciones-carrito">
                      <div className="btn-group" role="group" aria-label={`Cantidad de ${producto.nombre}`}>
                        <button className="btn btn-outline-light btn-sm" type="button" onClick={() => onQuitar(producto.id)}>-</button>
                        <span className="cantidad-producto px-3 d-flex align-items-center">{producto.cantidad}</span>
                        <button className="btn btn-outline-light btn-sm" type="button" onClick={() => onAgregar(producto)}>+</button>
                      </div>
                      <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onEliminar(producto.id)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-lg-4">
            <div className="resumen-compra p-4">
              <h3 className="h5">Total</h3>
              <p className="display-6 fw-bold mb-1">{formatearPrecio(totalPrecio)}</p>
              <p className="texto-suave small mb-3">{totalUnidades} producto{totalUnidades === 1 ? '' : 's'} en el carrito</p>
              <button className="btn btn-pixel w-100" type="button" onClick={onComprar} disabled={vacio}>Comprar</button>
              {mensajeCompra && <div className="alert alert-success mt-3 mb-0" role="status">{mensajeCompra}</div>}
              <p className="texto-suave small mt-3 mb-0">Precios expresados en pesos chilenos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
