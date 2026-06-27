# Mundo Suplemento

E-commerce de suplementos deportivos desarrollado como proyecto académico de la materia Programación Web.
Permite explorar un catálogo de productos, agregar items al carrito, registrarse, realizar compras y pagar con Mercado Pago.

**Sitio en producción:** https://pw-e-commerce-vtu4.vercel.app

---

## Características

- **Catálogo dinámico** — productos leídos desde Supabase, renderizados como Server Components.
- **Carrito de compras** — sidebar lateral con estado global (Context API), persistido en sesión.
- **Autenticación** — registro e inicio de sesión con email y contraseña (Supabase Auth), con validación de formularios en el cliente.
- **Órdenes persistidas** — al finalizar la compra se crea una orden en la base de datos con sus items y precios calculados en el servidor.
- **Vista "Mis órdenes"** — historial de compras del usuario autenticado con join a productos.
- **Panel de administración** — el admin ve todas las órdenes de todos los usuarios y puede actualizar su estado (pendiente → pagado → enviado → entregado).
- **Checkout con Mercado Pago** — integración con Checkout Pro en sandbox; la preferencia se crea en el servidor con el access token secreto.
- **Webhook** — endpoint `/api/webhook` que recibe la notificación de MP, consulta el estado real del pago y actualiza la orden en la base de datos.

---

## Tecnologías

- **Next.js 15** (App Router, JS puro — sin TypeScript)
- **React 19**
- **Supabase** — base de datos PostgreSQL, autenticación y Row Level Security
- **Mercado Pago** — Checkout Pro (SDK `mercadopago`)
- **Vercel** — despliegue con integración continua desde GitHub

---

## Arquitectura

La app combina Server Components para el data-fetching inicial (catálogo, layout) con Client Components para todo lo interactivo (carrito, auth, formularios). La lógica de negocio sensible vive exclusivamente en route handlers del servidor.

- **Server Components** — leen productos y pasan datos al árbol de componentes vía props; nunca exponen claves secretas.
- **Client Components** — manejan estado local, contextos (carrito, sesión) y llamadas a la API interna.
- **API interna (`app/api/`)** — route handlers para productos, órdenes, checkout y webhook; actúan como capa intermedia entre el frontend y Supabase/Mercado Pago.
- **Supabase + RLS** — cada usuario accede solo a sus propias órdenes; el webhook usa la `service_role` key para actualizar órdenes sin sesión de usuario.
- **Webhook de Mercado Pago** — recibe la notificación del pago, verifica el estado contra la API de MP y persiste el resultado en la base.

---

## Requisitos previos

- Node.js 18 o superior
- Cuenta de Supabase (proyecto con las tablas `products`, `orders`, `order_items` y RLS configurado)
- Cuenta de Mercado Pago con credenciales de prueba (sandbox)

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd pw-e-commerce

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (ver sección siguiente)
cp .env.local.example .env.local   # o crear el archivo manualmente

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

| Variable | Tipo | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Clave anónima de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secreta** | Clave de servicio de Supabase (salta RLS; solo para el webhook) |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Pública | Email del usuario administrador |
| `MP_ACCESS_TOKEN` | **Secreta** | Access token de Mercado Pago (solo servidor) |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | Pública | Public key de Mercado Pago |

> **Importante:** las variables marcadas como secretas nunca deben exponerse en el cliente ni subirse al repositorio. El archivo `.env.local` está excluido del control de versiones mediante `.gitignore`.

---

## Estructura del proyecto

```
pw-e-commerce/
├── app/                  # Rutas y páginas (Next.js App Router)
│   ├── api/              # Route handlers: productos, ordenes, checkout, webhook
│   ├── admin/            # Panel de administración (protegido)
│   ├── login/            # Inicio de sesión
│   ├── registro/         # Registro de usuario
│   ├── mis-ordenes/      # Historial de compras del usuario
│   ├── pago-exitoso/     # Página de retorno de MP (pago aprobado)
│   ├── pago-fallido/     # Página de retorno de MP (pago rechazado)
│   ├── pago-pendiente/   # Página de retorno de MP (pago pendiente)
│   ├── producto/[id]/    # Detalle de producto (ruta dinámica)
│   ├── layout.jsx        # Root Layout (obtiene productos para el contexto)
│   ├── page.jsx          # Home (catálogo)
│   └── styles.css        # Estilos globales
├── components/           # Componentes reutilizables (Header, Footer, Carrito, etc.)
├── lib/                  # Clientes y utilidades del servidor (Supabase, admin, productos)
├── utils/                # Funciones de utilidad (formatearPrecio)
├── data/                 # Array de productos original (respaldo; ya no se usa en producción)
└── docs/                 # Documentación de prompts utilizados con IA
```

---

## Base de datos

El proyecto usa tres tablas principales en Supabase:

| Tabla | Descripción |
|---|---|
| `products` | Catálogo de productos (id, nombre, descripcion, precio, imagen) |
| `orders` | Órdenes de compra (id, user_id, total, estado, created_at) |
| `order_items` | Renglones de cada orden (order_id, product_id, cantidad, precio_unitario) |

Todas las tablas tienen **Row Level Security (RLS)** activado. Los usuarios solo pueden leer y crear sus propias órdenes. El administrador tiene políticas adicionales para leer y actualizar todas las órdenes. El webhook usa la `service_role` key para operar fuera de las políticas de RLS.

---

## Flujo de pago

```
Usuario → "Finalizar compra"
    → POST /api/ordenes       (crea orden en estado "pendiente")
    → POST /api/checkout      (crea preferencia en Mercado Pago)
    → Redirección a MP        (usuario completa el pago)
    → MP notifica al webhook  (POST /api/webhook)
    → El webhook actualiza el estado de la orden ("pagado" / "cancelado")
```

El `external_reference` de la preferencia contiene el `id` de la orden, lo que permite al webhook identificar exactamente qué orden actualizar.

---

## Despliegue

El proyecto está desplegado en **Vercel** con integración continua desde GitHub: cada push a la rama `main` dispara un nuevo deploy automático.

Las variables de entorno se configuran en el panel de Vercel → Settings → Environment Variables. Las variables secretas (`MP_ACCESS_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`) solo están disponibles en el entorno del servidor de Vercel y nunca se exponen al navegador.

---

## Autor

Proyecto académico de Programación Web — **Marcos Gabriel Beltran** — Legajo 67465 — Comisión A — 1er cuatrimestre 2026.
