"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { esAdmin } from "@/lib/admin";
import { supabase } from "@/lib/supabaseClient";
import { formatearPrecio, formatearDireccion } from "@/utils/formato";

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

async function getToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
}

/* ── Pestaña Órdenes ── */
function TabOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("orders")
        .select(`
          id, total, estado, created_at, user_id, direccion_envio,
          order_items ( id, cantidad, precio_unitario, products ( nombre, imagen ) )
        `)
        .order("created_at", { ascending: false });
      if (err) setError("No se pudieron cargar las órdenes.");
      else setOrdenes(data);
      setCargando(false);
    }
    cargar();
  }, []);

  async function actualizarEstado(ordenId, nuevoEstado) {
    const { error: err } = await supabase
      .from("orders")
      .update({ estado: nuevoEstado })
      .eq("id", ordenId);
    if (err) { alert("Error al actualizar el estado: " + err.message); return; }
    setOrdenes((prev) =>
      prev.map((o) => (o.id === ordenId ? { ...o, estado: nuevoEstado } : o))
    );
    setFeedbacks((prev) => ({ ...prev, [ordenId]: true }));
    setTimeout(() => setFeedbacks((prev) => ({ ...prev, [ordenId]: false })), 2000);
  }

  if (cargando) return <p className="estado-carga">Cargando órdenes...</p>;
  if (error) return <p className="estado-carga error-mensaje">{error}</p>;

  return (
    <>
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
                <label htmlFor={`estado-${orden.id}`} className="label-estado">
                  Estado
                </label>
                <select
                  id={`estado-${orden.id}`}
                  className="select-estado"
                  value={orden.estado}
                  onChange={(e) => actualizarEstado(orden.id, e.target.value)}
                >
                  {ESTADOS.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
                {feedbacks[orden.id] && (
                  <span className="feedback-guardado">Guardado ✓</span>
                )}
              </div>
            </div>
            <p className="orden-direccion">
              <span className="orden-direccion-label">Envío a:</span>{" "}
              {formatearDireccion(orden.direccion_envio) ??
                "Sin dirección registrada"}
            </p>
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
    </>
  );
}

/* ── Pestaña Productos ── */
function TabProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [edits, setEdits] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      const { data, error: err } = await supabase
        .from("products")
        .select("*")
        .order("id");
      if (err) setError("No se pudieron cargar los productos.");
      else {
        setProductos(data);
        const inicial = {};
        data.forEach((p) => { inicial[p.id] = { precio: p.precio, stock: p.stock }; });
        setEdits(inicial);
      }
      setCargando(false);
    }
    cargar();
  }, []);

  function handleChange(id, campo, valor) {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [campo]: valor } }));
  }

  async function guardar(id) {
    const token = await getToken();
    const res = await fetch("/api/admin/productos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        stock: edits[id]?.stock,
        precio: edits[id]?.precio,
      }),
    });
    if (!res.ok) { alert("Error al guardar"); return; }
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: Number(edits[id].stock), precio: Number(edits[id].precio) }
          : p
      )
    );
    setFeedbacks((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setFeedbacks((prev) => ({ ...prev, [id]: false })), 2000);
  }

  if (cargando) return <p className="estado-carga">Cargando productos...</p>;
  if (error) return <p className="estado-carga error-mensaje">{error}</p>;

  return (
    <ul className="lista-admin-productos">
      {productos.map((prod) => (
        <li key={prod.id} className="admin-producto-row">
          {prod.imagen && (
            <img src={prod.imagen} alt={prod.nombre} className="orden-item-img" />
          )}
          <span className="admin-prod-nombre">{prod.nombre}</span>
          {prod.stock === 0 && (
            <span className="badge-agotado">Agotado</span>
          )}
          <div className="admin-prod-campos">
            <label htmlFor={`precio-${prod.id}`} className="label-estado">
              Precio
            </label>
            <input
              id={`precio-${prod.id}`}
              type="number"
              min="0"
              className="input-admin"
              value={edits[prod.id]?.precio ?? prod.precio}
              onChange={(e) => handleChange(prod.id, "precio", e.target.value)}
            />
            <label htmlFor={`stock-${prod.id}`} className="label-estado">
              Stock
            </label>
            <input
              id={`stock-${prod.id}`}
              type="number"
              min="0"
              className="input-admin"
              value={edits[prod.id]?.stock ?? prod.stock}
              onChange={(e) => handleChange(prod.id, "stock", e.target.value)}
            />
            <button className="btn-guardar-prod" onClick={() => guardar(prod.id)}>
              Guardar
            </button>
            {feedbacks[prod.id] && (
              <span className="feedback-guardado">Guardado ✓</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Pestaña Usuarios ── */
function TabUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      const token = await getToken();
      const res = await fetch("/api/admin/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { setError("No se pudieron cargar los usuarios."); setCargando(false); return; }
      setUsuarios(await res.json());
      setCargando(false);
    }
    cargar();
  }, []);

  if (cargando) return <p className="estado-carga">Cargando usuarios...</p>;
  if (error) return <p className="estado-carga error-mensaje">{error}</p>;

  return (
    <>
      <p className="admin-subtitulo">{usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}</p>
      <table className="admin-usuarios-tabla">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Fecha de registro</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{formatearFecha(u.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ── Panel principal ── */
export default function AdminPanel() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [tab, setTab] = useState("ordenes");

  if (cargandoAuth) return <p className="estado-carga">Cargando...</p>;

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

  return (
    <section className="admin-container">
      <h1>Panel de administración</h1>

      <div className="admin-tabs" role="tablist">
        {[
          { id: "ordenes", label: "Órdenes" },
          { id: "productos", label: "Productos" },
          { id: "usuarios", label: "Usuarios" },
        ].map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={"admin-tab" + (tab === id ? " activo" : "")}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "ordenes" && <TabOrdenes />}
        {tab === "productos" && <TabProductos />}
        {tab === "usuarios" && <TabUsuarios />}
      </div>
    </section>
  );
}
