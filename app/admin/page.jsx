"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { esAdmin } from "@/lib/admin";
import { supabase } from "@/lib/supabaseClient";
import { formatearPrecio } from "@/utils/formato";

const ESTADOS = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];

function formatearFecha(isoString) {
  return new Date(isoString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPanel() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    if (!usuario || !esAdmin(usuario)) return;

    async function cargarOrdenes() {
      setCargando(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("orders")
        .select(`
          id, total, estado, created_at, user_id,
          order_items ( id, cantidad, precio_unitario, products ( nombre, imagen ) )
        `)
        .order("created_at", { ascending: false });

      if (err) {
        setError("No se pudieron cargar las órdenes.");
      } else {
        setOrdenes(data);
      }
      setCargando(false);
    }

    cargarOrdenes();
  }, [usuario]);

  async function actualizarEstado(ordenId, nuevoEstado) {
    const { error: err } = await supabase
      .from("orders")
      .update({ estado: nuevoEstado })
      .eq("id", ordenId);

    if (err) {
      alert("Error al actualizar el estado: " + err.message);
      return;
    }

    setOrdenes((prev) =>
      prev.map((o) => (o.id === ordenId ? { ...o, estado: nuevoEstado } : o))
    );

    setFeedbacks((prev) => ({ ...prev, [ordenId]: true }));
    setTimeout(() => {
      setFeedbacks((prev) => ({ ...prev, [ordenId]: false }));
    }, 2000);
  }

  if (cargandoAuth) {
    return <p className="estado-carga">Cargando...</p>;
  }

  if (!usuario || !esAdmin(usuario)) {
    return (
      <section className="admin-container">
        <p>
          Acceso restringido. Esta página es solo para administradores.{" "}
          <Link href="/">Volver al inicio</Link>
        </p>
      </section>
    );
  }

  if (cargando) {
    return <p className="estado-carga">Cargando órdenes...</p>;
  }

  if (error) {
    return <p className="estado-carga error-mensaje">{error}</p>;
  }

  return (
    <section className="admin-container">
      <h1>Panel de administración</h1>
      <p className="admin-subtitulo">
        {ordenes.length === 0
          ? "No hay órdenes todavía."
          : `${ordenes.length} orden${ordenes.length !== 1 ? "es" : ""} en total`}
      </p>

      <ul className="lista-admin-ordenes">
        {ordenes.map((orden) => (
          <li key={orden.id} className="admin-orden-card">
            <div className="admin-orden-header">
              <div>
                <h2>Orden #{orden.id}</h2>
                <time dateTime={orden.created_at} className="orden-fecha">
                  {formatearFecha(orden.created_at)}
                </time>
                <p className="admin-user-id">
                  Usuario: <code>{orden.user_id}</code>
                </p>
              </div>
              <div className="admin-estado-control">
                <label
                  htmlFor={`estado-${orden.id}`}
                  className="label-estado"
                >
                  Estado
                </label>
                <select
                  id={`estado-${orden.id}`}
                  className="select-estado"
                  value={orden.estado}
                  onChange={(e) => actualizarEstado(orden.id, e.target.value)}
                >
                  {ESTADOS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                {feedbacks[orden.id] && (
                  <span className="feedback-guardado">Guardado ✓</span>
                )}
              </div>
            </div>

            <ul className="admin-items">
              {orden.order_items.map((item) => (
                <li key={item.id} className="admin-item">
                  {item.products?.imagen && (
                    <img
                      src={item.products.imagen}
                      alt={item.products?.nombre ?? "Producto"}
                      className="orden-item-img"
                    />
                  )}
                  <span className="orden-item-nombre">
                    {item.products?.nombre ?? "Producto eliminado"}
                  </span>
                  <span className="orden-item-detalle">
                    {item.cantidad} x {formatearPrecio(item.precio_unitario)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="orden-total">
              Total: <strong>{formatearPrecio(orden.total)}</strong>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
