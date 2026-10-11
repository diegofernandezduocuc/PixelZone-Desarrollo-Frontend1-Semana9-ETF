import { useState } from 'react'

const inicial = { nombre: '', email: '', mensaje: '' }

function Contact() {
  const [datos, setDatos] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [confirmacion, setConfirmacion] = useState('')

  const actualizar = (event) => {
    setDatos((actuales) => ({ ...actuales, [event.target.name]: event.target.value }))
    setErrores((actuales) => ({ ...actuales, [event.target.name]: '' }))
    setConfirmacion('')
  }

  // Valida los tres campos antes de simular el envío; no se utiliza un servidor.
  const enviar = (event) => {
    event.preventDefault()
    const nuevosErrores = {}
    if (datos.nombre.trim().length < 2) nuevosErrores.nombre = 'Ingresa tu nombre (al menos 2 caracteres).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
      nuevosErrores.email = 'Ingresa un correo electrónico válido.'
    }
    if (datos.mensaje.trim().length < 10) nuevosErrores.mensaje = 'Escribe un mensaje de al menos 10 caracteres.'

    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) {
      setDatos(inicial)
      setConfirmacion('Formulario validado correctamente. Envío simulado: no se ha enviado ningún correo.')
    }
  }

  return (
    <section className="py-5" id="contacto" aria-labelledby="titulo-contacto">
      <div className="container">
        <div className="contacto-bloque p-4 p-md-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <p className="etiqueta mb-1">Contacto</p>
              <h2 id="titulo-contacto">¿Necesitas ayuda para elegir?</h2>
              <p className="texto-suave">Completa el formulario para realizar una consulta.</p>
              <p className="texto-suave small">Esta demostración valida los datos sin enviar información a un servidor.</p>
            </div>
            <div className="col-lg-8">
              <form noValidate onSubmit={enviar}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="contacto-nombre">Nombre</label>
                    <input className={`form-control campo-busqueda ${errores.nombre ? 'is-invalid' : ''}`} id="contacto-nombre" name="nombre" type="text" maxLength="80" autoComplete="name" value={datos.nombre} onChange={actualizar} aria-invalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? 'error-nombre' : undefined} required />
                    {errores.nombre && <div className="invalid-feedback" id="error-nombre">{errores.nombre}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="contacto-email">Correo electrónico</label>
                    <input className={`form-control campo-busqueda ${errores.email ? 'is-invalid' : ''}`} id="contacto-email" name="email" type="email" maxLength="120" autoComplete="email" value={datos.email} onChange={actualizar} aria-invalid={Boolean(errores.email)} aria-describedby={errores.email ? 'error-email' : undefined} required />
                    {errores.email && <div className="invalid-feedback" id="error-email">{errores.email}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="contacto-mensaje">Mensaje</label>
                    <textarea className={`form-control campo-busqueda ${errores.mensaje ? 'is-invalid' : ''}`} id="contacto-mensaje" name="mensaje" rows="4" maxLength="1000" value={datos.mensaje} onChange={actualizar} aria-invalid={Boolean(errores.mensaje)} aria-describedby={errores.mensaje ? 'error-mensaje' : undefined} required />
                    {errores.mensaje && <div className="invalid-feedback" id="error-mensaje">{errores.mensaje}</div>}
                  </div>
                  <div className="col-12">
                    <button className="btn btn-pixel" type="submit">Enviar consulta</button>
                  </div>
                </div>
              </form>
              {confirmacion && <div className="alert alert-success mt-3 mb-0" role="status">{confirmacion}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
