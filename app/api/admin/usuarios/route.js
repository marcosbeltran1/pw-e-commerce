import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
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

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      return NextResponse.json({ error: "Error al listar usuarios" }, { status: 500 });
    }

    const usuarios = data.users.map((u) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
    }));

    return NextResponse.json(usuarios);
  } catch (e) {
    console.error("Error en /api/admin/usuarios:", e);
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
