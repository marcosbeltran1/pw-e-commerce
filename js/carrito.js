import { productos } from "./productos.js";

let carrito = [];

export function agregarAlCarrito(id) {
  const item = carrito.find(function (i) { return i.id === id; });
  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ id: id, cantidad: 1 });
  }
}

export function quitarUnaUnidad(id) {
  const item = carrito.find(function (i) { return i.id === id; });
  if (!item) return;
  if (item.cantidad > 1) {
    item.cantidad -= 1;
  } else {
    carrito = carrito.filter(function (i) { return i.id !== id; });
  }
}

export function eliminarItem(id) {
  carrito = carrito.filter(function (i) { return i.id !== id; });
}

export function obtenerCarrito() {
  return carrito;
}

export function obtenerCantidadTotal() {
  return carrito.reduce(function (total, item) { return total + item.cantidad; }, 0);
}

export function obtenerTotal() {
  return carrito.reduce(function (total, item) {
    const producto = productos.find(function (p) { return p.id === item.id; });
    return total + producto.precio * item.cantidad;
  }, 0);
}
