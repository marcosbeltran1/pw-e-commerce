import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");

    // Cliente con el token del usuario para que RLS aplique
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    const user = userData.user;

    const body = await request.json();
    const items = body.items;
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    // Traer precios reales desde la base (no confiar en el cliente)
    const ids = items.map((i) => i.id);
    const { data: productos, error: prodError } = await supabase
      .from("products")
      .select("id, precio")
      .in("id", ids);
    if (prodError) {
      return NextResponse.json(
        { error: "Error al validar productos" },
        { status: 500 }
      );
    }

    // Verificar y descontar stock ANTES de crear la orden
    // NOTA: en producción real esto debería ser una transacción atómica.
    for (const item of items) {
      const { data: ok, error: stockError } = await supabase.rpc(
        "descontar_stock",
        { p_product_id: item.id, p_cantidad: item.cantidad }
      );
      if (stockError) {
        return NextResponse.json(
          { error: "Error al verificar stock" },
          { status: 500 }
        );
      }
      if (ok === false) {
        return NextResponse.json(
          { error: "Sin stock suficiente para uno de los productos" },
          { status: 409 }
        );
      }
    }

    // Calcular total en el servidor
    let total = 0;
    const itemsParaInsertar = items.map((item) => {
      const prod = productos.find((p) => p.id === item.id);
      const precio = prod ? prod.precio : 0;
      total += precio * item.cantidad;
      return {
        product_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: precio,
      };
    });

    // Crear la orden
    const { data: orden, error: ordenError } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total, estado: "pendiente" })
      .select()
      .single();
    if (ordenError) {
      return NextResponse.json(
        { error: "Error al crear la orden" },
        { status: 500 }
      );
    }

    // Insertar los items con el order_id
    const itemsConOrden = itemsParaInsertar.map((it) => ({
      ...it,
      order_id: orden.id,
    }));
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsConOrden);
    if (itemsError) {
      return NextResponse.json(
        { error: "Error al guardar los items" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, ordenId: orden.id, total });
  } catch {
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
