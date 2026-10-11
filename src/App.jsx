import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import ProductManager from './components/ProductManager.jsx'
import Cart from './components/Cart.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [terminoAplicado, setTerminoAplicado] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intentoCarga, setIntentoCarga] = useState(0)
  const [mensajeCompra, setMensajeCompra] = useState('')
  const [mensajeCatalogo, setMensajeCatalogo] = useState('')

  // Carga el catálogo al iniciar la aplicación y actualiza su estado con los datos obtenidos.
  useEffect(() => {
    const controlador = new AbortController()

    async function cargarProductos() {
      setCargando(true)
      setError('')

      try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}assets/data/productos.json`, {
          signal: controlador.signal,
        })

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`)
        }

        const datos = await respuesta.json()
        if (!Array.isArray(datos)) {
          throw new Error('El formato del catálogo no es válido')
        }

        setProductos(datos)
      } catch (errorCarga) {
        if (errorCarga.name !== 'AbortError') {
          setError('No fue posible cargar el catálogo. Intenta nuevamente en unos momentos.')
          setProductos([])
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }

    cargarProductos()
    return () => controlador.abort()
  }, [intentoCarga])

  const categorias = [...new Set(productos.map((producto) => producto.categoria))].sort((a, b) => a.localeCompare(b, 'es'))
  const termino = terminoAplicado.trim().toLocaleLowerCase('es')
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria
    const coincideBusqueda = !termino
      || producto.nombre.toLocaleLowerCase('es').includes(termino)
      || producto.categoria.toLocaleLowerCase('es').includes(termino)
    const coincideOferta = !soloOfertas || producto.precioOferta < producto.precioNormal

    return coincideCategoria && coincideBusqueda && coincideOferta
  })

  const totalUnidades = carrito.reduce((total, producto) => total + producto.cantidad, 0)
  const totalPrecio = carrito.reduce((total, producto) => total + producto.precioOferta * producto.cantidad, 0)

  // Agrega productos al carrito o incrementa la cantidad cuando ya existe una unidad seleccionada.
  const agregarAlCarrito = (producto) => {
    setMensajeCompra('')
    setCarrito((carritoActual) => {
      const existente = carritoActual.find((item) => item.id === producto.id)

      if (existente) {
        return carritoActual.map((item) => (
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ))
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  const quitarUnidad = (id) => {
    setCarrito((carritoActual) => carritoActual
      .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
      .filter((item) => item.cantidad > 0))
  }

  const eliminarProducto = (id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id))
  }

  // Los cambios del catálogo se mantienen en memoria; el JSON inicial se conserva intacto.
  const agregarAlCatalogo = (nuevoProducto) => {
    const nombreRepetido = productos.some((producto) =>
      producto.nombre.toLocaleLowerCase('es') === nuevoProducto.nombre.toLocaleLowerCase('es'))
    if (nombreRepetido) return false

    setProductos((actuales) => [...actuales, {
      ...nuevoProducto,
      id: Math.max(0, ...actuales.map((producto) => Number(producto.id))) + 1,
      precioNormal: nuevoProducto.precio,
      precioOferta: nuevoProducto.precio,
      imagen: 'assets/img/banner-gaming.svg',
      alt: `Ilustración genérica para ${nuevoProducto.nombre}`,
    }])
    setMensajeCatalogo(`Se agregó «${nuevoProducto.nombre}» al catálogo.`)
    mostrarTodos()
    return true
  }

  const quitarDelCatalogo = (producto) => {
    setProductos((actuales) => actuales.filter((item) => item.id !== producto.id))
    // Evita conservar en el carrito productos que ya no están disponibles.
    setCarrito((actuales) => actuales.filter((item) => item.id !== producto.id))
    setMensajeCompra('')
    setMensajeCatalogo(`Se eliminó «${producto.nombre}» del catálogo.`)
    // Si la categoría seleccionada queda sin juegos, retorna al filtro general.
    if (categoria === producto.categoria && !productos.some((item) =>
      item.id !== producto.id && item.categoria === categoria)) {
      setCategoria('Todas')
    }
  }

  const comprar = () => {
    if (carrito.length === 0) return
    setCarrito([])
    setMensajeCompra('Compra simulada realizada correctamente. ¡Gracias por elegir Pixel Zone!')
  }

  const buscar = (event) => {
    event.preventDefault()
    setCategoria('Todas')
    setTerminoAplicado(busqueda)
  }

  const filtrarCategoria = (nuevaCategoria) => {
    setCategoria(nuevaCategoria)
    setBusqueda('')
    setTerminoAplicado('')
  }

  const mostrarTodos = () => {
    setCategoria('Todas')
    setBusqueda('')
    setTerminoAplicado('')
    setSoloOfertas(false)
  }

  return (
    <>
      <Navbar
        onCategoria={filtrarCategoria}
        onMostrarTodos={mostrarTodos}
        totalUnidades={totalUnidades}
      />

      <main>
        <Hero />

        <section className="py-5" id="productos" aria-labelledby="titulo-productos">
          <div className="container">
            <div className="row align-items-end g-3 mb-4">
              <div className="col-lg-7">
                <p className="etiqueta mb-1">Catálogo de juegos</p>
                <h2 id="titulo-productos" className="mb-1">Productos</h2>
                <p className="texto-suave mb-3">Catálogo cargado dinámicamente con React.</p>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <label className="visually-hidden" htmlFor="filtro-categoria">Filtrar por categoría</label>
                  <select
                    id="filtro-categoria"
                    className="form-select campo-busqueda filtro-categoria"
                    value={categoria}
                    onChange={(event) => filtrarCategoria(event.target.value)}
                    aria-label="Filtrar videojuegos por categoría"
                  >
                    <option value="Todas">Todas las categorías</option>
                    {categorias.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}
                  </select>
                  <button
                    type="button"
                    className={`btn btn-sm ${soloOfertas ? 'btn-pixel' : 'btn-outline-light'}`}
                    onClick={() => setSoloOfertas((estado) => !estado)}
                  >
                    {soloOfertas ? 'Ver todos los productos' : 'Ver solo ofertas'}
                  </button>
                  <a className="btn btn-sm btn-outline-info" href="#administrar">Administrar catálogo</a>
                  {categoria !== 'Todas' && <span className="badge filtro-activo">Categoría: {categoria}</span>}
                </div>
              </div>
              <div className="col-lg-5">
                <SearchBar busqueda={busqueda} onBusqueda={setBusqueda} onSubmit={buscar} />
              </div>
            </div>

            <ProductList
              productos={productosFiltrados}
              carrito={carrito}
              cargando={cargando}
              error={error}
              onAgregar={agregarAlCarrito}
              onQuitarCatalogo={quitarDelCatalogo}
              onReintentar={() => setIntentoCarga((valor) => valor + 1)}
            />
            <ProductManager
              categorias={categorias}
              onAgregar={agregarAlCatalogo}
              mensajeCatalogo={mensajeCatalogo}
            />
          </div>
        </section>

        <Cart
          carrito={carrito}
          totalUnidades={totalUnidades}
          totalPrecio={totalPrecio}
          onAgregar={agregarAlCarrito}
          onQuitar={quitarUnidad}
          onEliminar={eliminarProducto}
          onComprar={comprar}
          mensajeCompra={mensajeCompra}
        />

        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
