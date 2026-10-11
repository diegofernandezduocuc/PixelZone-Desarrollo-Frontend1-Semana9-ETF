# Pixel Zone — Desarrollo Frontend I (PFY2201), ETF Semana 9

Sitio web de una tienda de videojuegos desarrollado con HTML5, CSS3, JavaScript, React 19, Vite 7 y Bootstrap 5. Los componentes funcionales utilizan estado y props para coordinar el catálogo, el carrito y los formularios. El catálogo se carga desde un archivo JSON local mediante fetch y useEffect y se presenta mediante tarjetas responsivas.

## Requisitos y ejecución

- Node.js 20.x desde 20.19, o Node.js 22.12 o superior, y npm.
- En la carpeta raíz, ejecutar `npm ci` para instalar las dependencias del proyecto.
- Ejecutar `npm run dev` y abrir la dirección local que indique Vite (habitualmente `http://localhost:5173/`).
- Para generar la versión de producción, ejecutar `npm run build` y, opcionalmente, `npm run preview` para visualizarla.

La aplicación utiliza archivos JSON mediante `fetch`, por lo que debe ejecutarse a través del servidor de desarrollo o de un servidor web; no debe abrirse el archivo `index.html` directamente desde el explorador.

## Funcionalidades

- Catálogo de videojuegos con imagen, nombre, categoría, descripción y precios en pesos chilenos.
- Filtros por categoría, búsqueda y visualización de ofertas.
- Gestión dinámica del catálogo mediante un formulario para agregar videojuegos y controles para eliminarlos.
- Carrito con cantidades, eliminación de productos, total calculado y compra simulada.
- Formulario de contacto que comprueba nombre, correo electrónico y mensaje, con errores por campo y confirmación de validación.
- Navegación, tarjetas y formularios con Bootstrap 5; estilos propios y diseño responsivo.

Los cambios del catálogo y del carrito se mantienen en memoria durante la sesión. Recargar la página restaura los datos originales del archivo JSON. El formulario de contacto y la compra son demostraciones locales: no procesan pedidos ni envían datos a un servidor.

## Estructura

- `src/App.jsx`: composición de componentes, estado compartido, carga de datos, filtros y carrito.
- `src/components/`: componentes de navegación, catálogo, gestión, carrito y contacto.
- `src/index.css`: estilos personalizados y ajustes responsivos.
- `src/utils/formato.js`: formato monetario.
- `public/assets/data/productos.json`: catálogo inicial.
- `public/assets/img/`: imágenes e identidad gráfica.
- `vite.config.js`: configuración de Vite y rutas relativas para el despliegue.

## Repositorio

- Código fuente e historial: [Repositorio en GitHub](https://github.com/diegofernandezduocuc/PixelZone-Desarrollo-Frontend1-Semana9-ETF).
- Sitio publicado: [Pixel Zone en GitHub Pages](https://diegofernandezduocuc.github.io/PixelZone-Desarrollo-Frontend1-Semana9-ETF/).
