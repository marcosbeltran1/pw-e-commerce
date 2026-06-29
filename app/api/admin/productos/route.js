import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");

    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    const { data: userData, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !userData?.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (userData.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body = await request.json();
    const { id, stock, precio } = body;
    if (!id) {
      return NextResponse.json({ error: "Falta id" }, { status: 400 });
    }

    const cambios = {};
    if (stock !== undefined) cambios.stock = Number(stock);
    if (precio !== undefined) cambios.precio = Number(precio);

    const { error } = await supabaseAdmin
      .from("products")
      .update(cambios)
      .eq("id", Number(id));

    if (error) {
      return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
