import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request, { params }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
