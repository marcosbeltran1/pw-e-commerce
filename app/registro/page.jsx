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
    const { error } = await registrar(email, password);
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
