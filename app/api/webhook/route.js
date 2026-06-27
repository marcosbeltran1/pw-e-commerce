import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    // MP envía notificaciones con distintos formatos
    const tipo = body.type || body.topic;
    const paymentId = body.data?.id || body.resource || null;

    // Solo nos interesan notificaciones de tipo payment
    if (tipo && tipo !== "payment") {
      return NextResponse.json({ ok: true, ignored: true });
    }
    if (!paymentId) {
      return NextResponse.json({ ok: true, noPaymentId: true });
    }

    // Consultar el pago real a MP (no confiar en la notificación)
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    const payment = new Payment(client);
    const pago = await payment.get({ id: paymentId });

    const estadoPago = pago.status;
    const ordenId = pago.external_reference;

    if (!ordenId) {
      return NextResponse.json({ ok: true, sinOrden: true });
    }

    // Mapear estado de MP al estado de nuestra orden
    let nuevoEstado = "pendiente";
    if (estadoPago === "approved") nuevoEstado = "pagado";
    else if (estadoPago === "rejected") nuevoEstado = "cancelado";

    // Actualizar con cliente admin que salta RLS (sin sesión de usuario)
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ estado: nuevoEstado })
      .eq("id", Number(ordenId));

    if (error) {
      console.error("Error al actualizar orden:", error.message);
      return NextResponse.json({ error: "update failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, ordenId, nuevoEstado });
  } catch (e) {
    console.error("Error en webhook:", e);
    // Respondemos 200 para que MP no reintente en casos no recuperables
    return NextResponse.json({ ok: false, error: "webhook error" });
  }
}

// MP a veces hace un GET de verificación
export async function GET() {
  return NextResponse.json({ ok: true });
}
