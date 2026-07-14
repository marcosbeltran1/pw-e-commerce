export function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-AR");
}

export function formatearDireccion(direccion) {
  if (!direccion) return null;
  const partes = [direccion.calle, direccion.ciudad, direccion.provincia]
    .map((p) => (p ?? "").trim())
    .filter(Boolean);
  let texto = partes.join(", ");
  if (direccion.codigoPostal) {
    texto += texto ? ` (CP ${direccion.codigoPostal})` : `CP ${direccion.codigoPostal}`;
  }
  return texto || null;
}
