function SearchBar({ busqueda, onBusqueda, onSubmit }) {
  return (
    <form className="d-flex gap-2" role="search" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="busqueda">Buscar videojuego</label>
      <input
        className="form-control campo-busqueda"
        id="busqueda"
        type="search"
        placeholder="Buscar por nombre o categoría"
        autoComplete="off"
        value={busqueda}
        onChange={(event) => onBusqueda(event.target.value)}
      />
      <button className="btn btn-pixel" type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar
