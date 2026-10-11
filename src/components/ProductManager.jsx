import { useState } from 'react'

const inicial = { nombre: '', categoria: 'Acción', precio: '', descripcion: '' }

function ProductManager({ categorias, onAgregar, mensajeCatalogo }) {
  const [campos, setCampos] = useState(inicial)
  const [error, setError] = useState('')
  const opciones = [...new Set([...categorias, 'Acción', 'Aventura', 'Carreras', 'Estrategia', 'Simulación'])]
    .sort((a, b) => a.localeCompare(b, 'es'))

  const actualizar = (event) => {
    setCampos((actuales) => ({ ...actuales, [event.target.name]: event.target.value }))
    setError('')
  }

  const guardar = (event) => {
    event.preventDefault()
    const nombre = campos.nombre.trim()
    const descripcion = campos.descripcion.trim()
    const precio = Number(campos.precio)

    if (nombre.length < 2 || descripcion.length < 10 || !Number.isSafeInteger(precio) || precio <= 0 || precio > 9999999) {
      setError('Ingresa un nombre de al menos 2 caracteres, una descripción de 10 y un precio entero entre $1 y $9.999.999.')
      return
    }
    if (!onAgregar({ nombre, categoria: campos.categoria, descripcion, precio })) {
      setError('Ya existe un videojuego con ese nombre.')
      return
    }
    setCampos(inicial)
    setError('')
  }

  return (
    <section className="gestor-catalogo mt-5 p-4" id="administrar" aria-labelledby="titulo-administrar">
      <h3 className="h4" id="titulo-administrar">Agregar un videojuego</h3>
      <p className="texto-suave small">Puedes agregar o eliminar juegos del catálogo durante esta sesión. Al recargar la página se restaura el listado original.</p>
      <form noValidate onSubmit={guardar}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="nuevo-nombre">Nombre</label>
            <input className="form-control campo-busqueda" id="nuevo-nombre" name="nombre" value={campos.nombre} onChange={actualizar} maxLength="70" required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="nueva-categoria">Categoría</label>
            <select className="form-select campo-busqueda" id="nueva-categoria" name="categoria" value={campos.categoria} onChange={actualizar}>
              {opciones.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="nuevo-precio">Precio (CLP)</label>
            <input className="form-control campo-busqueda" id="nuevo-precio" name="precio" type="number" min="1" max="9999999" step="1" value={campos.precio} onChange={actualizar} required />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="nueva-descripcion">Descripción</label>
            <textarea className="form-control campo-busqueda" id="nueva-descripcion" name="descripcion" rows="2" maxLength="200" value={campos.descripcion} onChange={actualizar} required />
          </div>
          <div className="col-12 d-flex flex-wrap align-items-center gap-3">
            <button className="btn btn-pixel" type="submit">Agregar al catálogo</button>
            <span className="texto-suave small">Los juegos agregados usan una imagen ilustrativa de Pixel Zone.</span>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
      {mensajeCatalogo && <div className="alert alerta-pixel mt-3 mb-0" role="status">{mensajeCatalogo}</div>}
    </section>
  )
}

export default ProductManager
