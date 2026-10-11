import { formatearPrecio } from '../utils/formato'

function ProductCard({ producto, cantidadEnCarrito, onAgregar, onQuitarCatalogo }) {
  const enCarrito = cantidadEnCarrito > 0

  return (
    <article className="card producto-card h-100">
      <img
        src={`${import.meta.env.BASE_URL}${producto.imagen}`}
        className="card-img-top"
        alt={producto.alt}
        width="600"
        height="360"
      />
      <div className="card-body">
        <p className="categoria mb-2">{producto.categoria}</p>
        <h3 className="h5 card-title">{producto.nombre}</h3>
        <p className="card-text texto-suave">{producto.descripcion}</p>

        <div className="mt-auto">
          {producto.precioOferta < producto.precioNormal && (
            <p className="precio-normal mb-0">
              <span className="visually-hidden">Precio normal: </span>
              {formatearPrecio(producto.precioNormal)}
            </p>
          )}
          <p className="precio-oferta mb-3">
            <span className="visually-hidden">Precio oferta: </span>
            {formatearPrecio(producto.precioOferta)}
          </p>
          <button
            type="button"
            className={`btn w-100 ${enCarrito ? 'btn-en-carrito' : 'btn-pixel'}`}
            onClick={() => onAgregar(producto)}
            aria-label={`${enCarrito ? 'Agregar otra unidad de' : 'Agregar al carrito'} ${producto.nombre}`}
          >
            {enCarrito ? `En el carrito (${cantidadEnCarrito}) · +1` : 'Agregar al carrito'}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm w-100 mt-2"
            onClick={() => onQuitarCatalogo(producto)}
            aria-label={`Eliminar ${producto.nombre} del catálogo`}
          >
            Eliminar del catálogo
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
