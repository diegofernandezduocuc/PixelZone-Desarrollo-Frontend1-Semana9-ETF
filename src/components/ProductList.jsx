import ProductCard from './ProductCard.jsx'

function ProductList({ productos, carrito, cargando, error, onAgregar, onQuitarCatalogo, onReintentar }) {
  if (cargando) {
    return <div className="alert alerta-pixel" role="status">Cargando productos...</div>
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p className="mb-2">{error}</p>
        <button type="button" className="btn btn-sm btn-outline-light" onClick={onReintentar}>Reintentar carga</button>
      </div>
    )
  }

  if (productos.length === 0) {
    return <div className="alert alert-warning" role="status">No se encontraron productos con ese criterio.</div>
  }

  return (
    <div className="row g-4" aria-live="polite">
      {productos.map((producto) => {
        const item = carrito.find((elemento) => elemento.id === producto.id)
        return (
          <div className="col-12 col-md-6 col-xl-4 col-producto" key={producto.id}>
            <ProductCard
              producto={producto}
              cantidadEnCarrito={item?.cantidad ?? 0}
              onAgregar={onAgregar}
              onQuitarCatalogo={onQuitarCatalogo}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProductList
