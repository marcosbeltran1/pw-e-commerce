import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request) {
  try {
    const body = await request.json();
    const { ordenId, items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Sin items" }, { status: 400 });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    const preference = new Preference(client);

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const esLocal = origin.includes("localhost");

    const prefBody = {
      items: items.map((item) => ({
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: item.precio,
        currency_id: "ARS",
      })),
      external_reference: String(ordenId),
      notification_url: `${origin}/api/webhook`,
      back_urls: {
        success: `${origin}/pago-exitoso`,
        failure: `${origin}/pago-fallido`,
        pending: `${origin}/pago-pendiente`,
      },
    };

    // auto_return solo en producción (MP no lo acepta con localhost)
    if (!esLocal) {
      prefBody.auto_return = "approved";
    }

    const result = await preference.create({ body: prefBody });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (e) {
    console.error("Error al crear preferencia:", e);
    return NextResponse.json(
      { error: "No se pudo crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
