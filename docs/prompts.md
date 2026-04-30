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