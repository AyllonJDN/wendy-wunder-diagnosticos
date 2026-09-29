# WENDY WÜNDER · Diagnósticos

Plataforma con dos herramientas: **6 preguntas antes de escalar cualquier idea** (`/antes-de-escalar`) y **¿Tu precio refleja tu valor?** (`/precio-y-valor`). Lógica 100 % determinística (sin IA); la misma función alimenta la web y el PDF descargable.

## Desarrollo

```
npm.cmd install
npm.cmd run dev
```

Abre http://localhost:3000. Validación: `npm.cmd run lint` y `npm.cmd run build`.

## Variables de entorno

Ninguna. La plataforma no necesita configuración.

## Deploy

GitHub → Vercel: sube el repositorio, impórtalo en Vercel y despliega.

## Estructura

- `src/lib/diagnostics/` – funciones de diagnóstico (única fuente de verdad).
- `src/lib/pdf/` – PDFs con `@react-pdf/renderer` y `renderPdf.ts`.
- `src/app/api/pdf/*` – descarga del PDF.
- `src/data/` – textos y preguntas.
- Foto de Wendy: `public/wendy.png`.
