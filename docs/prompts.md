# Documentación de prompts utilizados con IA
Materia: 71.38 Programación Web
Proyecto: Mundo Suplemento
Alumno: MARCOS BELTRAN

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
Creó la estructura de carpetas (css/, js/, docs/, img/), 
generó index.html con HTML semántico (header, nav, main, 
section, article, footer) y la home completa con hero, 
6 productos hardcodeados y contacto. Generó el CSS con 
variables en :root, una grilla responsive con CSS Grid 
(repeat auto-fit minmax) y un media query para mobile. 
También creó .gitignore, README.md y dejó main.js casi 
vacío con un console.log para verificar el linkeo.

### Qué entendí yo
- HTML, CSS y JS van en archivos separados — eso es 
  separación de responsabilidades.
- HTML define la estructura, CSS los estilos, JS el 
  comportamiento.
- Las etiquetas semánticas (header, nav, main, section, 
  article, footer) le dicen al navegador y a los 
  buscadores qué rol cumple cada zona, no son <div> 
  decorados.
- Las variables CSS (--color-primary, etc.) en :root 
  permiten cambiar la paleta entera desde un solo lugar.
- La grilla con repeat(auto-fit, minmax(250px, 1fr)) 
  acomoda automáticamente las cards: a más ancho, más 
  columnas; a menos ancho, columnas que se reordenan 
  solas. Por eso mi sitio es responsive sin que yo 
  escriba un breakpoint manual para cada caso.
- El .gitignore evita subir cosas que no deben estar 
  en GitHub: claves, configuración local, basura del 
  sistema operativo, dependencias que se reinstalan 
  con un comando.


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
Creó el archivo js/productos.js con un array de 6 objetos 
(id, nombre, descripcion, precio, imagen) exportado como 
módulo ES6. Vació la sección productos del HTML dejando 
solo un <div id="contenedor-productos"> y cambió la etiqueta 
script a type="module" para habilitar imports. Reescribió 
js/main.js para importar los productos, recorrerlos con 
forEach, generar el HTML de cada card con template 
literals, y pegarlo todo de una sola vez con innerHTML. 
Agregó la función formatearPrecio con toLocaleString 
para mostrar los precios como "$ 28.000".

### Qué entendí yo
- Pasé de tener los datos pegados al HTML a tenerlos 
  en un array de JavaScript. Esto se llama separar 
  datos de presentación.
- El JS ahora "lee" el array y arma el HTML solo. Eso 
  es renderizado dinámico.
- Lo verifiqué cambiando el precio de la Whey Protein 
  en productos.js: la card actualizó el precio sin que 
  yo tocara nada del HTML. La fuente de verdad es el 
  array.
- Los template literals (con backticks y ${variable}) 
  permiten armar strings con datos adentro de forma 
  legible.
- innerHTML reemplaza todo el contenido del contenedor 
  de una sola vez, en lugar de ir agregando elementos 
  uno por uno.
- Cada botón "Agregar" tiene un atributo data-id con el 
  id del producto, que después uso para identificar a 
  qué producto pertenece el click.
- Los módulos ES6 (import/export) me dejan partir el 
  código en archivos chicos con responsabilidades 
  claras.

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
Modificó index.html agregando el botón de carrito en el 
header, el sidebar con su header/items/footer y el overlay 
oscuro. Agregó al CSS los estilos del sidebar con position 
fixed, transform translateX para la animación, transition 
de 0.3s, y el overlay con opacity controlada. Creó 
js/carrito.js con el array carrito y las funciones 
agregarAlCarrito, quitarUnaUnidad, eliminarItem, 
obtenerCarrito, obtenerCantidadTotal y obtenerTotal. 
Reescribió main.js como orquestador, con event delegation 
en los contenedores de productos y de items, y los 
listeners para abrir/cerrar el sidebar.

### Qué entendí yo
- El carrito es un array que vive en memoria. Eso es 
  el "estado" de mi aplicación.
- El ciclo es: evento (click) → cambio de estado 
  (modifico el array) → re-render (llamo a 
  actualizarUI() que redibuja la UI). Ese mismo ciclo 
  es la base de React, solo que en React el re-render 
  es automático.
- Event delegation: en lugar de poner un listener en 
  cada uno de los 6 botones "Agregar", pongo uno solo 
  en el contenedor padre. Cuando alguien clickea, miro 
  con event.target qué se clickeó. Esto es más eficiente 
  y funciona aunque el HTML sea generado dinámicamente.
- data-id es el puente entre el DOM y los datos. El 
  botón solo sabe su id; con Number(target.dataset.id) 
  recupero el id y voy a buscar el producto al array. 
  El precio o el nombre nunca viven en el DOM.
- reduce sirve para acumular: empieza en un valor 
  inicial (0) y por cada item del array suma algo al 
  acumulador. Así calculo cantidad total y precio total.
- transform: translateX(100%) deja el sidebar fuera de 
  la pantalla. Cuando JS le agrega la clase .abierto, 
  el CSS lo trae a translateX(0). La animación la 
  hace 100% el CSS con transition; JS solo agrega o 
  quita una clase.
- aria-label y aria-hidden son atributos de 
  accesibilidad. aria-label le dice a los lectores 
  de pantalla qué hace un botón sin texto descriptivo. 
  aria-hidden le dice si el contenido está visible o 
  no. Son los conceptos básicos de accesibilidad que 
  evalúa el parcial.

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
Inicializó un proyecto Vite con React JS en la misma 
carpeta, eliminando los archivos anteriores 
y conservando docs/, README, .gitignore y .git. Creó 
8 componentes (Header, Hero, Productos, ProductoCard, 
Contacto, Footer, CarritoSidebar, ItemCarrito), movió 
productos.js a src/data y formatearPrecio a src/utils. 
Centralizó todo el estado en App.jsx con dos useState 
(carrito y sidebarAbierto), implementó las mismas 
funciones de antes pero usando set inmutable (spread, 
map, filter), y pasó todo a los hijos por props. Reusó 
el styles.css importándolo una vez en main.jsx.

### Qué entendí yo
- Un componente React es una función que devuelve JSX, 
  que se ve como HTML pero es JavaScript.
- Las props son los datos que un padre le pasa a un 
  hijo. El hijo no las puede modificar, solo leerlas. 
  Por eso cuando el hijo necesita "avisar" algo, el 
  padre le pasa funciones (onAgregar, onCerrar) y el 
  hijo las llama.
- El estado (state) vive dentro de un componente. Lo 
  declaro con useState. Cuando uso setState, React 
  detecta el cambio y vuelve a ejecutar la función del 
  componente, generando una UI nueva.
- "Lifting state up": el carrito vive en App porque 
  varios componentes lo necesitan (Header muestra el 
  contador, CarritoSidebar muestra los items). Si 
  viviera en un solo hijo, el otro no podría verlo.
- Inmutabilidad: en React no hago carrito.push(...) 
  porque React compara referencias y no detectaría el 
  cambio. Uso siempre copias nuevas: [...prev, nuevo], 
  prev.map(...), prev.filter(...).
- key en listas: cuando renderizo varios elementos con 
  .map(), cada uno necesita una prop key única. Le 
  sirve a React para saber qué elementos del DOM 
  reusar y cuáles recrear cuando el array cambia.
- La diferencia más fuerte con vanilla: en vanilla yo 
  llamaba actualizarUI() a mano después de cada cambio. 
  En React, con setState alcanza, el re-render es 
  automático

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


---

## Prompt 007 — Productos desde Supabase (data-fetching)
**Fecha:** 2026-06-10
**Herramienta:** Claude Code en VS Code

### Qué pedí
Conectar la app a Supabase con @supabase/supabase-js, crear el
cliente en lib/supabaseClient.js y una función obtenerProductos()
que consulta la tabla products. Cambiar app/page.jsx, app/layout.jsx
y la página de detalle para que sean Server Components async que
leen los productos desde la base. Adaptar el CarritoContext para
recibir los productos por prop en lugar de importar el array.

### Por qué lo pedí así
Para mover los productos del código a la base de datos (data-fetching
real). Hago la consulta desde Server Components, en el servidor, para
que el HTML llegue ya con los productos y mejorar rendimiento y SEO.
El CarritoContext, que es Client, recibe los productos por prop
porque no puede hacer consultas async de servidor.

### Conceptos involucrados (para la presentación)
- Cliente de Supabase configurado con variables de entorno.
- Data-fetching desde Server Components (async/await).
- Diferencia Server vs Client para acceso a datos.
- supabase.from("products").select() — consulta a la base.
- Paso de datos del servidor al cliente vía props.
- RLS: la política de lectura pública permite esta consulta.


---

## Prompt 008 — Autenticación con email/contraseña y validación
**Fecha:** 2026-06-10
**Herramienta:** Claude Code en VS Code

### Qué pedí
Implementar autenticación con Supabase Auth (email + contraseña, sin
confirmación por mail): un AuthContext que mantiene la sesión, páginas
/registro y /login con formularios de validación robusta (formato de
email, longitud de contraseña, coincidencia, mensajes de error por
campo y manejo de errores del servidor), y mostrar el estado de
sesión en el Header (email + cerrar sesión, o links ingresar/registrarse).

### Por qué lo pedí así
Para cubrir la autenticación de usuarios (base para órdenes y panel
admin) y, al mismo tiempo, el entregable de formularios dinámicos con
validación y fetch integrado. Centralicé la sesión en un Context para
que cualquier componente pueda saber si hay un usuario logueado, igual
que el patrón del carrito.


## Prompt 009 — API interna (route handlers) para productos
**Fecha:** 2026-06-10
**Herramienta:** Claude Code en VS Code

### Qué pedí
Crear route handlers de Next en app/api/productos (GET de todos) y
app/api/productos/[id] (GET por id), que consultan Supabase y
devuelven JSON con manejo de errores y códigos de estado HTTP
adecuados. Agregar una función obtenerProductosClient() que consume
esta API interna vía fetch desde el cliente.

### Por qué lo pedí así
Para cumplir el entregable de API interna: una capa propia entre el
frontend y la base de datos, en lugar de consultar Supabase
directamente desde todos lados. Centraliza la lógica de acceso a
datos y expone endpoints REST internos reutilizables.

---

## Prompt 010 — Checkout: crear órdenes en la base
**Fecha:** 2026-06-10
**Herramienta:** Claude Code en VS Code

### Qué pedí
Crear el endpoint POST /api/ordenes que recibe los items del carrito,
valida el usuario por su token, recalcula el total en el servidor con
los precios reales de la base, e inserta la orden en "orders" y sus
renglones en "order_items". Conectar el botón "Finalizar compra" para
que, si el usuario está logueado, llame a ese endpoint enviando el
token; si no, lo redirija a /login. Vaciar el carrito tras la compra.

### Por qué lo pedí así
Para tener persistencia real de las compras (CRUD de órdenes) con la
lógica de creación centralizada en la API interna. Recalculo el total
en el servidor en lugar de confiar en el precio que manda el cliente,
por seguridad. El token del usuario se envía en el header Authorization
para que las políticas RLS de Supabase autoricen la inserción.

---

## Prompt 011 — Vista "Mis órdenes"
**Fecha:** 2026-06-26
**Herramienta:** Claude Code en VS Code

### Qué pedí
Crear la página /mis-ordenes (Client Component) que consulta con un
join las órdenes del usuario logueado junto con sus items y los datos
de cada producto, y las muestra como tarjetas con fecha, estado, lista
de productos y total. Manejar los casos de no logueado, sin órdenes,
carga y error. Agregar el link "Mis órdenes" en el header para usuarios
autenticados.

### Por qué lo pedí así
Para que el usuario tenga visibilidad de su historial de compras
(entregable de vista de órdenes). Aproveché las políticas RLS: la
consulta devuelve automáticamente solo las órdenes del usuario
autenticado, sin filtrar manualmente, lo que es más seguro. Usé un
join de Supabase para traer órdenes, items y productos en una sola
consulta.

---

## Prompt 012 — Panel de administración con edición de órdenes
**Fecha:** 2026-06-27
**Herramienta:** Claude Code en VS Code

### Qué pedí
Crear la página /admin protegida por email de administrador (variable
de entorno + verificación con helper esAdmin). El admin ve todas las
órdenes de todos los usuarios con sus items y productos, y puede
cambiar el estado de cada orden mediante un select que ejecuta un
update en Supabase. Mostrar el link "Admin" en el header solo para el
administrador. La autorización real la garantizan las políticas RLS
que permiten al admin (por su email) ver y actualizar todas las órdenes.

### Por qué lo pedí así
Para completar el CRUD de órdenes con la operación Update (cambio de
estado) y tener un panel de administración funcional, como pide el
entregable. La protección es doble: en el frontend se oculta la vista
a no-admins, y en la base las políticas RLS impiden que un usuario
común vea o modifique órdenes ajenas aunque intente saltear el frontend.

---

## Prompt 013 — Mercado Pago: preferencia de pago y checkout
**Fecha:** 2026-06-27
**Herramienta:** Claude Code en VS Code

### Qué pedí
Integrar Mercado Pago en sandbox: un endpoint /api/checkout que crea
una preferencia de pago con el SDK de MP usando el access token del
servidor, con los items de la orden y back_urls de retorno. Modificar
"Finalizar compra" para que cree la orden en estado pendiente, genere
la preferencia, y redirija al usuario al init_point del checkout de MP.
Crear las páginas de retorno (exitoso, fallido, pendiente). Guardar el
id de la orden como external_reference para vincular el pago con la orden.

### Por qué lo pedí así
Para integrar la pasarela de pago en modo test. El access token es
secreto y se usa solo en el servidor (route handler), nunca en el
navegador. Uso external_reference con el id de la orden para que, en
el paso del webhook, pueda identificar qué orden actualizar cuando MP
confirme el pago.

---

## Prompt 014 — Corrección checkout: auto_return en producción
**Fecha:** 2026-06-27
**Herramienta:** Claude Code en VS Code

### Qué pedí
Corregir el endpoint de checkout para que auto_return solo se incluya
en producción, porque Mercado Pago rechaza auto_return cuando las
back_urls usan localhost (error invalid_auto_return).

### Por qué lo pedí así
auto_return exige URLs públicas válidas que MP pueda validar. En local
(localhost) no es posible, así que se omite y MP muestra un botón
manual de retorno; en producción (Vercel) se activa la redirección
automática.

---

## Prompt 015 — Webhook de Mercado Pago
**Fecha:** 2026-06-27
**Herramienta:** Claude Code en VS Code

### Qué pedí
Crear el endpoint /api/webhook que recibe las notificaciones de Mercado
Pago, consulta el pago real a MP con el access token, identifica la orden
por el external_reference, y actualiza su estado (approved→pagado,
rejected→cancelado) usando un cliente admin de Supabase con la
service_role key, que salta el RLS porque la actualización la hace el
servidor sin sesión de usuario.

### Por qué lo pedí así
El webhook lo llama Mercado Pago, no el usuario, así que no hay sesión:
por eso uso la service_role key (solo en el servidor) para poder
actualizar la orden saltando el RLS. Consulto el estado real del pago
a MP en lugar de confiar en la notificación, por seguridad. El
external_reference vincula el pago con la orden correcta.

---

## Prompt 016 — notification_url en la preferencia de pago
**Fecha:** 2026-06-27
**Herramienta:** Claude Code en VS Code

### Qué pedí
Agregar el campo notification_url a la preferencia de pago de Mercado
Pago, apuntando al endpoint /api/webhook del mismo dominio, para que
MP envíe la notificación de pago al webhook.

### Por qué lo pedí así
La notificación de los pagos reales de Checkout Pro se dispara a partir
de la notification_url incluida en la preferencia. Sin ese campo, MP no
registraba ningún intento de notificación. Pasarla en la preferencia
garantiza que cada pago notifique a la URL correcta del dominio de Vercel.

---

## Prompt 017 — Descuento automático de stock al comprar
**Fecha:** 2026-06-29
**Herramienta:** Claude Code en VS Code

### Qué pedí
Modificar el endpoint de creación de órdenes para que, antes de crear la
orden, verifique y descuente el stock de cada producto usando una función
RPC de Supabase (descontar_stock) que hace el descuento de forma atómica
con bloqueo de fila. Si algún producto no tiene stock suficiente, se
rechaza la compra con código 409 y un mensaje claro.

### Por qué lo pedí así
El control de stock debe hacerse en el servidor para que sea confiable y
no manipulable desde el cliente. Uso una función en la base de datos con
bloqueo de fila (for update) para evitar condiciones de carrera cuando dos
compras ocurren a la vez. Así el stock refleja las ventas reales.

---

## Prompt 018 — Panel admin ampliado: Productos y Usuarios
**Fecha:** 2026-06-29
**Herramienta:** Claude Code en VS Code

### Qué pedí
Ampliar /admin con tres pestañas: Órdenes (existente), Productos (editar
stock y precio) y Usuarios (lista de registrados). Crear dos endpoints
protegidos por email de admin: GET /api/admin/usuarios (lista usuarios
con el cliente admin de Supabase) y PATCH /api/admin/productos (actualiza
stock/precio). Ambos verifican el token del usuario y que sea el admin
antes de operar.

### Por qué lo pedí así
Los usuarios viven en auth.users, que solo es accesible con el cliente
admin (service_role) desde el servidor, nunca desde el navegador; por eso
la lista se sirve desde un endpoint protegido que valida que quien llama
sea el admin. La edición de productos usa el mismo patrón de endpoint
protegido. Las pestañas organizan el panel sin multiplicar páginas.

### Conceptos involucrados
- Cliente admin (service_role) solo en el servidor.
- Endpoints protegidos por verificación de token + email de admin.
- listUsers de la API de administración de Supabase Auth.

---
## Prompt 019 — Rediseño premium de header y hero + feedback de carrito
**Fecha:** 2026-06-29
**Herramienta:** Claude Code en VS Code

### Qué pedí
Rediseñar header y hero con una estética elegante y premium (acento
dorado sobrio, fondos profundos, mejor jerarquía y transiciones suaves),
sin tocar las tarjetas de producto ni la lógica. Agregar un feedback
visual en el botón del carrito: cuando aumenta la cantidad de items, el
botón pulsa en dorado un instante para que el usuario note el cambio.

### Por qué lo pedí así
El cambio de "0 a 1" en el carrito pasaba desapercibido; el pulso dirige
la atención al carrito. El rediseño premium mejora la imagen del sitio
manteniendo la paleta y sin alterar funcionalidad.
---