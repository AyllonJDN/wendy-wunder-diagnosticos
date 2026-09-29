import { Resend } from "resend";
import { PDF_FILENAMES, renderDiagnosticPdf } from "../../../lib/pdf/renderPdf";
import { emailRequestSchema } from "../../../lib/validation/schemas";

export const runtime = "nodejs";

const NOT_CONFIGURED =
  "El envío por correo todavía no está disponible. Puedes descargar tu diagnóstico ahora.";
const SEND_FAILED =
  "No pudimos enviar el correo en este momento. Puedes descargar tu diagnóstico ahora.";
const INVALID = "Revisa tu correo y las respuestas, e inténtalo de nuevo.";

const SUBJECTS = {
  scaling: "Tu diagnóstico · 3 preguntas antes de escalar cualquier idea",
  pricing: "Tu diagnóstico · ¿Tu precio refleja tu valor?",
} as const;

const TITLES = {
  scaling: "3 preguntas antes de escalar cualquier idea",
  pricing: "¿Tu precio refleja tu valor?",
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(title: string, name?: string): string {
  const greeting = name ? `Hola, ${escapeHtml(name)}.` : "Hola.";
  return `<!doctype html><html lang="es"><body style="margin:0;background:#F3F3F1;font-family:Helvetica,Arial,sans-serif;color:#111111;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F3F1;padding:32px 12px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
<tr><td style="background:#111111;padding:22px 32px;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:4px;color:#ffffff;font-weight:bold;">WENDY WÜNDER</td></tr>
<tr><td style="height:5px;background:#D10851;background-image:linear-gradient(90deg,#FE7D00,#D10851);font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:36px 32px 12px 32px;">
<p style="margin:0 0 8px 0;font-size:11px;letter-spacing:3px;color:#D10851;font-weight:bold;">TU DIAGNÓSTICO PERSONAL</p>
<h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.15;">${escapeHtml(title)}</h1>
<p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;">${greeting} Adjunto encontrarás tu diagnóstico en PDF, tal como lo viste en pantalla.</p>
<p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;">Léelo con calma y elige una sola acción para empezar.</p>
</td></tr>
<tr><td style="padding:12px 32px 36px 32px;font-family:Georgia,'Times New Roman',serif;font-size:14px;letter-spacing:3px;font-weight:bold;">WENDY WÜNDER</td></tr>
</table></td></tr></table></body></html>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: INVALID }, { status: 400 });
  }

  const parsed = emailRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, message: INVALID }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json(
      { ok: false, code: "not_configured", message: NOT_CONFIGURED },
      { status: 503 },
    );
  }

  const data = parsed.data;
  try {
    // El servidor reconstruye el diagnóstico desde las respuestas y genera
    // exactamente el mismo PDF que la ruta de descarga.
    const pdf =
      data.kind === "scaling"
        ? await renderDiagnosticPdf({
            kind: "scaling",
            answers: data.answers,
            name: data.name,
          })
        : await renderDiagnosticPdf({
            kind: "pricing",
            answers: data.answers,
            name: data.name,
          });

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [data.email],
      subject: SUBJECTS[data.kind],
      html: buildHtml(TITLES[data.kind], data.name),
      text: `${data.name ? `Hola, ${data.name}.` : "Hola."} Adjunto encontrarás tu diagnóstico "${TITLES[data.kind]}" en PDF.\n\nWENDY WÜNDER`,
      attachments: [{ filename: PDF_FILENAMES[data.kind], content: pdf }],
    });

    if (error) {
      return Response.json(
        { ok: false, message: SEND_FAILED },
        { status: 502 },
      );
    }
    return Response.json({
      ok: true,
      message: "Listo. Te enviamos tu diagnóstico por correo.",
    });
  } catch {
    return Response.json({ ok: false, message: SEND_FAILED }, { status: 502 });
  }
}
