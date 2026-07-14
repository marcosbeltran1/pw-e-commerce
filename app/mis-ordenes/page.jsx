"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { formatearPrecio, formatearDireccion } from "@/utils/formato";

function formatearFecha(isoString) {
  return new Date(isoString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MisOrdenes() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!usuario) return;

    async function cargarOrdenes() {
      setCargando(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("orders")
        .select(`
          id,
          total,
          estado,
          created_at,
          direccion_envio,
          order_items (
            id,
            cantidad,
            precio_unitario,
            products ( nombre, imagen )
          )
        `)
        .order("created_at", { ascending: false });

      if (err) {
        setError("No se pudieron cargar tus órdenes.");
      } else {
        setOrdenes(data);
      }
      setCargando(false);
    }

    cargarOrdenes();
  }, [usuario]);

  if (cargandoAuth) {
    return <p className="estado-carga">Cargando...</p>;
  }

  if (!usuario) {
    return (
      <section className="mis-ordenes-container">
        <p>
          <Link href="/login">Iniciá sesión</Link> para ver tus órdenes.
        </p>
      </section>
    );
  }

  if (cargando) {
    return <p className="estado-carga">Cargando tus órdenes...</p>;
  }

  if (error) {
    return <p className="estado-carga error-mensaje">{error}</p>;
  }

  return (
    <section className="mis-ordenes-container">
      <h1>Mis órdenes</h1>

      {ordenes.length === 0 ? (
        <p className="sin-ordenes">
          Todavía no realizaste ninguna compra.{" "}
          <Link href="/">Ver productos</Link>
        </p>
      ) : (
        <ul className="lista-ordenes">
          {ordenes.map((orden) => (
            <li key={orden.id} className="orden-card">
              <div className="orden-header">
                <div>
                  <h2>Orden #{orden.id}</h2>
                  <time dateTime={orden.created_at} className="orden-fecha">
                    {formatearFecha(orden.created_at)}
                  </time>
                </div>
                <span className={`badge-estado badge-${orden.estado}`}>
                  {orden.estado}
                </span>
              </div>

              <p className="orden-direccion">
                <span className="orden-direccion-label">Envío a:</span>{" "}
                {formatearDireccion(orden.direccion_envio) ??
                  "Sin dirección registrada"}
              </p>

              <ul className="orden-items">
                {orden.order_items.map((item) => (
                  <li key={item.id} className="orden-item">
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
      )}
    </section>
  );
}
