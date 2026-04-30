import { productos } from "./productos.js";
import {
  agregarAlCarrito,
  quitarUnaUnidad,
  eliminarItem,
  obtenerCarrito,
  obtenerCantidadTotal,
  obtenerTotal
} from "./carrito.js";

function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-AR");
}

function renderizarProductos() {
  const contenedor = document.getElementById("contenedor-productos");

  let html = "";

  productos.forEach(function (producto) {
    html += `
      <article class="producto-card">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">${formatearPrecio(producto.precio)}</p>
        <button type="button" data-id="${producto.id}" class="btn-agregar">Agregar al carrito</button>
      </article>
    `;
  });

  contenedor.innerHTML = html;
}

function renderizarItemsCarrito() {
  const contenedor = document.getElementById("items-carrito");
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    return;
  }

  let html = "";

  carrito.forEach(function (item) {
    const producto = productos.find(function (p) { return p.id === item.id; });
    html += `
      <div class="item-carrito" data-id="${item.id}">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <div class="item-info">
          <h4>${producto.nombre}</h4>
          <p class="item-precio">${formatearPrecio(producto.precio)}</p>
        </div>
        <div class="item-controles">
          <button class="btn-cantidad btn-restar" data-id="${item.id}" aria-label="Restar uno">−</button>
          <span class="cantidad">${item.cantidad}</span>
          <button class="btn-cantidad btn-sumar" data-id="${item.id}" aria-label="Sumar uno">+</button>
          <button class="btn-eliminar" data-id="${item.id}" aria-label="Eliminar producto">🗑</button>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}

function actualizarUI() {
  document.getElementById("contador-carrito").textContent = obtenerCantidadTotal();
  renderizarItemsCarrito();
  document.getElementById("total-carrito").textContent = formatearPrecio(obtenerTotal());
}

// ── Eventos: productos ──────────────────────────────────────
const contenedorProductos = document.getElementById("contenedor-productos");
contenedorProductos.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-agregar")) {
    const id = Number(event.target.dataset.id);
    agregarAlCarrito(id);
    actualizarUI();
  }
});

// ── Eventos: items del carrito ──────────────────────────────
const itemsCarrito = document.getElementById("items-carrito");
itemsCarrito.addEventListener("click", function (event) {
  const target = event.target;
  const id = Number(target.dataset.id);
  if (!id) return;

  if (target.classList.contains("btn-sumar")) {
    agregarAlCarrito(id);
  } else if (target.classList.contains("btn-restar")) {
    quitarUnaUnidad(id);
  } else if (target.classList.contains("btn-eliminar")) {
    eliminarItem(id);
  } else {
    return;
  }

  actualizarUI();
});

// ── Abrir / cerrar sidebar ──────────────────────────────────
const sidebar = document.getElementById("sidebar-carrito");
const overlay = document.getElementById("overlay");
const btnCarrito = document.getElementById("btn-carrito");
const btnCerrar = document.getElementById("btn-cerrar-carrito");

function abrirCarrito() {
  sidebar.classList.add("abierto");
  overlay.classList.add("activo");
  sidebar.setAttribute("aria-hidden", "false");
}

function cerrarCarrito() {
  sidebar.classList.remove("abierto");
  overlay.classList.remove("activo");
  sidebar.setAttribute("aria-hidden", "true");
}

btnCarrito.addEventListener("click", abrirCarrito);
btnCerrar.addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);

// ── Finalizar compra ────────────────────────────────────────
document.getElementById("btn-finalizar").addEventListener("click", function () {
  if (obtenerCantidadTotal() === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  alert("Compra simulada. Total: " + formatearPrecio(obtenerTotal()));
});

// ── Inicialización ──────────────────────────────────────────
renderizarProductos();
actualizarUI();
