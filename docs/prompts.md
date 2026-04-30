# Documentación de prompts utilizados con IA
Materia: 71.38 Programación Web
Proyecto: Mundo Suplemento
Alumno: [nombre]

---

## Prompt 001 — Setup inicial + Home funcional
**Fecha:** 2026-04-30
**Herramienta:** Claude Code en VS Code

### Qué pedí
Crear estructura de carpetas del proyecto y la primera versión
funcional del index.html con HTML semántico, css/styles.css con
estilos responsivos usando CSS Grid y variables CSS, y un
js/main.js mínimo. Sin frameworks ni librerías externas.

### Por qué lo pedí así
Quería ver una página completa y funcional desde el primer paso
en lugar de archivos vacíos, para entender cómo se conectan HTML,
CSS y JS. Pedí HTML semántico (header/nav/main/section/article/
footer) porque es uno de los conceptos que evalúa el parcial.

### Qué hizo la IA
[completar después de revisar el resultado]

### Qué entendí yo
[completar con tus palabras después de leer la explicación]

---

## Prompt 002 — Refactor a renderizado dinámico con JS
**Fecha:** 2026-04-30
**Herramienta:** Claude Code en VS Code

### Qué pedí
Mover los 6 productos del HTML estático a un array de objetos en
js/productos.js, exportarlos como módulo ES6, e importarlos desde
js/main.js para generar las cards dinámicamente con innerHTML.
Modificar index.html dejando solo un contenedor vacío con id, y
cambiar el script a type="module".

### Por qué lo pedí así
Para separar datos de presentación, practicar manipulación del DOM,
y dejar la base lista para que el carrito (próximo paso) pueda
identificar productos por su id. Es también la base mental para
entender después cómo React renderiza componentes a partir de datos.

### Conceptos involucrados (para el oral)
- Array de objetos en JS.
- Módulos ES6 (import/export).
- DOM y document.getElementById.
- forEach + template literals + innerHTML.
- Atributo data-id en HTML para vincular elementos a datos.

### Qué hizo la IA
[completar después de revisar el resultado]

### Qué entendí yo
[completar con tus palabras]

---

## Prompt 003 — Carrito de compras (sidebar lateral)
**Fecha:** 2026-04-30
**Herramienta:** Claude Code en VS Code

### Qué pedí
Implementar un carrito de compras con: botón "Carrito (N)" en el
header, sidebar lateral que entra desde la derecha al hacer click,
items con botones +/- y eliminar, total calculado, y simulación
de finalizar compra. Lógica del carrito en archivo separado
(js/carrito.js) con funciones exportadas, y main.js como
orquestador que conecta UI con lógica.

### Por qué lo pedí así
Para implementar el ciclo evento → cambio de estado → re-render
de forma explícita en vanilla JS, antes de migrar a React donde
useState lo hace automáticamente. Separé la lógica del carrito
en su propio módulo para practicar import/export de ES6 y
mantener responsabilidades claras.

### Conceptos involucrados (para el oral)
- Estado en memoria (variable carrito como single source of truth).
- Event listeners y event delegation.
- event.target y dataset (data-id).
- Métodos de array: find, filter, reduce.
- Re-renderizado manual con función actualizarUI().
- Accesibilidad: aria-label, aria-hidden.
- Animación con CSS transition + clase agregada por JS.

### Qué hizo la IA
[completar después]

### Qué entendí yo
[completar después]

---

## Prompt 004 — Migración a React con Vite
**Fecha:** 2026-04-30
**Herramienta:** Claude Code en VS Code

### Qué pedí
Migrar la app vanilla a React con Vite, dividiendo la UI en
8 componentes (Header, Hero, Productos, ProductoCard, Contacto,
Footer, CarritoSidebar, ItemCarrito), con el estado del carrito
centralizado en App.jsx mediante useState y pasado a los hijos
por props. Reusé el CSS existente sin cambios y mantuve el array
de productos como módulo importable.

### Por qué lo pedí así
Para que cada concepto del Módulo 3 del parcial (componente,
props, state, re-renderizado) quede ejemplificado en el código
de la forma más limpia posible. Decidí mantener el estado en
App.jsx en vez de usar Context para poder explicar el flujo de
props sin agregar conceptos extra.

La versión vanilla previa quedó preservada como commit en el
repositorio de GitHub, así puedo mostrar la diferencia entre
ambas versiones en el oral.

### Conceptos involucrados (para el oral)
- Componente: función JS que devuelve JSX.
- JSX: sintaxis tipo HTML dentro de JS.
- Props: datos que un padre le pasa a un hijo.
- State (useState): datos que viven en un componente y al cambiar
  disparan un re-render automático.
- "Lifting state up": el estado del carrito está en App porque
  varios hijos lo necesitan.
- Re-render automático: a diferencia de vanilla, no llamo a
  ninguna función "actualizarUI"; React detecta el cambio de
  estado y redibuja lo necesario.
- Inmutabilidad: no muto el array carrito directamente. Uso
  setCarrito con copias nuevas (...prev, .map, .filter).
- Key en listas: la prop `key` ayuda a React a identificar
  elementos al re-renderizar listas.

### Qué hizo la IA
[completar después]

### Qué entendí yo
[completar después]

---

## Prompt 005 — Migración a Next.js con App Router
**Fecha:** 2026-04-30
**Herramienta:** Claude Code en VS Code

### Qué pedí
Migrar la app de React + Vite a Next.js usando App Router.
Estructura por carpetas en /app, con dos rutas: la home en `/`
y el detalle de producto en `/producto/[id]` (ruta dinámica).
Estado del carrito centralizado en un Context API (CarritoContext)
expuesto por un componente cliente intermedio (ClientLayout) que
envuelve la app dentro del Root Layout. Server Components por
defecto donde no hay interactividad (Hero, Footer, Contacto,
página de detalle); Client Components con "use client" donde
hace falta estado o eventos (Header, Productos, ProductoCard,
sidebar, items, botón agregar de detalle).

### Por qué lo pedí así
- Para cubrir el concepto de rutas en Next que evalúa el parcial,
  tanto rutas estáticas como dinámicas.
- Para poder explicar la diferencia entre Server y Client Components
  (Momento 3 del parcial).
- Decidí usar Context porque al haber múltiples rutas, prop drilling
  ya no escala (las rutas son archivos separados).
- Mantuve <img> plano en vez de next/image para no tener que
  configurar dominios externos remotos, lo cual excedía el alcance.

### Conceptos involucrados (para el oral)
- File-based routing: cada carpeta en /app es un segmento de URL,
  y page.jsx es el archivo que se renderiza.
- Ruta dinámica: [id] entre corchetes captura el valor del segmento
  como parámetro.
- Server Components: se renderizan en el servidor, mandan HTML al
  navegador, sin interactividad. Más rápidos y mejor SEO.
- Client Components: se ejecutan en el navegador, tienen estado y
  eventos. Marcados con "use client" en la primera línea.
- Root Layout (app/layout.jsx): envuelve toda la app, define el
  <html> y <body>, persiste entre navegaciones.
- Context API: permite compartir estado entre componentes sin pasar
  props explícitamente; necesario porque las rutas son archivos
  separados.
- next/link: navegación entre rutas sin recargar la página, con
  prefetch automático.

### Qué hizo la IA
[completar después]

### Qué entendí yo
[completar después]

---