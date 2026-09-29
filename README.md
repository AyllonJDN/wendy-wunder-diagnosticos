# WENDY WÜNDER · Diagnósticos

Plataforma con dos herramientas: **3 preguntas antes de escalar cualquier idea** (`/antes-de-escalar`) y **¿Tu precio refleja tu valor?** (`/precio-y-valor`). Lógica 100 % determinística (sin IA); la misma función alimenta web, PDF y correo.

## Desarrollo

```
npm.cmd install
npm.cmd run dev
```

Abre http://localhost:3000. Validación: `npm.cmd run lint` y `npm.cmd run build`.

## Variables de entorno

Copia `.env.example` a `.env.local` (ignorado por git).

- `RESEND_API_KEY` – clave de Resend. Sin ella el correo no se envía, pero la descarga del PDF funciona igual.
- `RESEND_FROM_EMAIL` – remitente verificado en Resend, p. ej. `WENDY WÜNDER <hola@tudominio.com>`.
- `NEXT_PUBLIC_MENTORIA_URL` – URL del botón "QUIERO APLICAR". Vacía = el botón no se muestra.

## Deploy

GitHub → Vercel: sube el repositorio, impórtalo en Vercel, agrega las variables de entorno y despliega.

## Estructura

- `src/lib/diagnostics/` – funciones de diagnóstico (única fuente de verdad).
- `src/lib/pdf/` – PDFs con `@react-pdf/renderer` y `renderPdf.ts`.
- `src/app/api/pdf/*` y `src/app/api/email` – descarga y envío.
- `src/data/` – textos y preguntas.
- Foto de Wendy: `public/wendy.png`.
