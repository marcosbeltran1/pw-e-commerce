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

// Para uso desde Client Components: consume la API interna
export async function obtenerProductosClient() {
  const res = await fetch("/api/productos");
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}
