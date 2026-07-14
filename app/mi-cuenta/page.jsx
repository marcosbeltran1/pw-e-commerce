"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function MiCuenta() {
  const { usuario, cargando, actualizarDireccion } = useAuth();

  const [calle, setCalle] = useState("");
  const [pisoDepto, setPisoDepto] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [exito, setExito] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Precarga la dirección guardada en los metadatos del usuario.
  useEffect(() => {
    const direccion = usuario?.user_metadata?.direccion;
    if (direccion) {
      setCalle(direccion.calle ?? "");
      setPisoDepto(direccion.pisoDepto ?? "");
      setCiudad(direccion.ciudad ?? "");
      setProvincia(direccion.provincia ?? "");
      setCodigoPostal(direccion.codigoPostal ?? "");
    }
  }, [usuario]);

  function validar() {
    const nuevosErrores = {};

    if (!calle.trim()) {
      nuevosErrores.calle = "La calle y número son obligatorios.";
    }

    if (!ciudad.trim()) {
      nuevosErrores.ciudad = "La ciudad es obligatoria.";
    }

    if (!provincia.trim()) {
      nuevosErrores.provincia = "La provincia es obligatoria.";
    }

    if (!codigoPostal.trim()) {
      nuevosErrores.codigoPostal = "El código postal es obligatorio.";
    }

    return nuevosErrores;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorGeneral("");
    setExito(false);

    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }
    setErrores({});

    setEnviando(true);
    const { error } = await actualizarDireccion({
      calle: calle.trim(),
      pisoDepto: pisoDepto.trim(),
      ciudad: ciudad.trim(),
      provincia: provincia.trim(),
      codigoPostal: codigoPostal.trim(),
    });
    setEnviando(false);

    if (error) {
      setErrorGeneral("No se pudo guardar la dirección. Intentá de nuevo.");
      return;
    }

    setExito(true);
  }

  if (cargando) {
    return <p className="estado-carga">Cargando...</p>;
  }

  if (!usuario) {
    return (
      <section className="auth-section">
        <p>
          <Link href="/login">Iniciá sesión</Link> para ver tu cuenta.
        </p>
      </section>
    );
  }

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Mi cuenta</h1>
        <p className="cuenta-email">{usuario.email}</p>

        <h2 className="form-subtitulo">Dirección de envío</h2>

        {errorGeneral && (
          <p className="error-general" role="alert">{errorGeneral}</p>
        )}

        {exito && (
          <p className="exito-mensaje" role="status">
            Dirección guardada correctamente.
          </p>
        )}

        <div className="campo-form">
          <label htmlFor="calle">Calle y número</label>
          <input
            id="calle"
            type="text"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
            aria-describedby={errores.calle ? "error-calle" : undefined}
            autoComplete="street-address"
          />
          {errores.calle && (
            <p id="error-calle" className="error-mensaje" role="alert">
              {errores.calle}
            </p>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="pisoDepto">Piso y departamento</label>
          <input
            id="pisoDepto"
            type="text"
            value={pisoDepto}
            onChange={(e) => setPisoDepto(e.target.value)}
            placeholder="Piso 4, depto B (opcional)"
            autoComplete="address-line2"
          />
        </div>

        <div className="campo-form">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            id="ciudad"
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            aria-describedby={errores.ciudad ? "error-ciudad" : undefined}
            autoComplete="address-level2"
          />
          {errores.ciudad && (
            <p id="error-ciudad" className="error-mensaje" role="alert">
              {errores.ciudad}
            </p>
          )}
        </div>

        <div className="form-fila">
          <div className="campo-form">
            <label htmlFor="provincia">Provincia</label>
            <input
              id="provincia"
              type="text"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              aria-describedby={errores.provincia ? "error-provincia" : undefined}
              autoComplete="address-level1"
            />
            {errores.provincia && (
              <p id="error-provincia" className="error-mensaje" role="alert">
                {errores.provincia}
              </p>
            )}
          </div>

          <div className="campo-form">
            <label htmlFor="codigoPostal">Código postal</label>
            <input
              id="codigoPostal"
              type="text"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              aria-describedby={
                errores.codigoPostal ? "error-codigoPostal" : undefined
              }
              autoComplete="postal-code"
            />
            {errores.codigoPostal && (
              <p id="error-codigoPostal" className="error-mensaje" role="alert">
                {errores.codigoPostal}
              </p>
            )}
          </div>
        </div>

        <button type="submit" className="btn-auth" disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar dirección"}
        </button>
      </form>
    </section>
  );
}
