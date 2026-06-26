import { supabase } from "./supabaseClient";

export async function obtenerProductos() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al obtener productos:", error.message);
    return [];
  }
  return data;
}
