"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function Login() {
  const { ingresar } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const { error } = await ingresar(email, password);
    setEnviando(false);

    if (error) {
      setErrorGeneral("Email o contraseña incorrectos.");
      return;
    }

    router.push("/");
  }

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Iniciar sesión</h1>

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
            autoComplete="current-password"
          />
          {errores.password && (
            <p id="error-password" className="error-mensaje" role="alert">
              {errores.password}
            </p>
          )}
        </div>

        <button type="submit" className="btn-auth" disabled={enviando}>
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="auth-link-texto">
          ¿No tenés cuenta?{" "}
          <Link href="/registro">Registrate</Link>
        </p>
      </form>
    </section>
  );
}
