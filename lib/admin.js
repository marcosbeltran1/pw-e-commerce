export function esAdmin(usuario) {
  if (!usuario) return false;
  return usuario.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}
