"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function Registro() {
  const { registrar } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [calle, setCalle] = useState("");
  const [pisoDepto, setPisoDepto] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function validar() {
    const nuevosErrores = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!emailValido) {
      nuevosErrores.email = "Ingresá un email válido.";
    }

    if (!password) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!confirmar) {
      nuevosErrores.confirmar = "Confirmá tu contraseña.";
    } else if (confirmar !== password) {
      nuevosErrores.confirmar = "Las contraseñas no coinciden.";
    }

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

    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }
    setErrores({});

    setEnviando(true);
    const { error } = await registrar(email, password, {
      calle: calle.trim(),
      pisoDepto: pisoDepto.trim(),
      ciudad: ciudad.trim(),
      provincia: provincia.trim(),
      codigoPostal: codigoPostal.trim(),
    });
    setEnviando(false);

    if (error) {
      setErrorGeneral(
        error.message === "User already registered"
          ? "Este email ya está registrado. Intentá iniciar sesión."
          : error.message
      );
      return;
    }

    router.push("/");
  }

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Crear cuenta</h1>

        {errorGeneral && (
          <p className="error-general" role="alert">{errorGeneral}</p>
        )}

        <div className="campo-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby={errores.email ? "error-email" : undefined}
            autoComplete="email"
          />
          {errores.email && (
            <p id="error-email" className="error-mensaje" role="alert">
              {errores.email}
            </p>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={errores.password ? "error-password" : undefined}
            autoComplete="new-password"
          />
          {errores.password && (
            <p id="error-password" className="error-mensaje" role="alert">
              {errores.password}
            </p>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="confirmar">Confirmar contraseña</label>
          <input
            id="confirmar"
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            aria-describedby={errores.confirmar ? "error-confirmar" : undefined}
            autoComplete="new-password"
          />
          {errores.confirmar && (
            <p id="error-confirmar" className="error-mensaje" role="alert">
              {errores.confirmar}
            </p>
          )}
        </div>

        <h2 className="form-subtitulo">Dirección de envío</h2>

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
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="auth-link-texto">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login">Iniciá sesión</Link>
        </p>
      </form>
    </section>
  );
}
