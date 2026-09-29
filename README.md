# WENDY WÜNDER · Diagnósticos

Plataforma con dos herramientas: **6 preguntas antes de escalar cualquier idea** (`/antes-de-escalar`) y **¿Tu precio refleja tu valor?** (`/precio-y-valor`). Lógica 100 % determinística (sin IA); la misma función alimenta la web y el PDF descargable.

## Desarrollo

```
npm.cmd install
npm.cmd run dev
```

Abre http://localhost:3000. Validación: `npm.cmd run lint` y `npm.cmd run build`.

## Guardado de respuestas (Supabase, opcional)

Cada diagnóstico guarda de forma anónima sus respuestas y el score (no guarda nombre ni correo). Si las variables no están configuradas, todo funciona igual pero no se guarda nada.

1. Crea un proyecto gratis en supabase.com.
2. En **SQL Editor**, ejecuta el contenido de `supabase/schema.sql`.
3. En **Project Settings → API Keys**, copia la *Project URL* y la clave secreta (`service_role` / `sb_secret_...`).
4. Agrégalas como variables de entorno (`.env.local` y Vercel):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (secreta: nunca con prefijo `NEXT_PUBLIC_`)

Las respuestas se ven en **Table Editor → submissions** y se exportan a CSV desde ahí.

## Deploy

GitHub → Vercel: sube el repositorio, impórtalo en Vercel y despliega.

## Estructura

- `src/lib/diagnostics/` – funciones de diagnóstico (única fuente de verdad).
- `src/lib/pdf/` – PDFs con `@react-pdf/renderer` y `renderPdf.ts`.
- `src/app/api/pdf/*` – descarga del PDF; `src/app/api/submissions` – guardado en Supabase.
- `src/data/` – textos y preguntas.
- Foto de Wendy: `public/wendy.png`.
