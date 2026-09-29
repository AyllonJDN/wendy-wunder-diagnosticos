import { computePricing, normalizeSignals } from "../../../lib/diagnostics/pricing";
import { computeScaling } from "../../../lib/diagnostics/scaling";
import { submissionRequestSchema } from "../../../lib/validation/schemas";

export const runtime = "nodejs";

/**
 * Guarda las respuestas en Supabase (tabla `submissions`) usando la API REST
 * con la clave de servidor. La clave nunca llega al navegador. Si Supabase no
 * está configurado o falla, la plataforma sigue funcionando igual.
 */
export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return Response.json({ ok: false, stored: false }, { status: 202 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const parsed = submissionRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const data = parsed.data;
  const now = new Date().toISOString();
  // El score se recalcula en el servidor con la misma función central.
  const row =
    data.kind === "scaling"
      ? {
          id: data.id,
          kind: "scaling",
          score: computeScaling(data.answers).score,
          answers: data.answers,
          stage: data.answers.stage,
          main_blocker: data.answers.mainBlocker,
          goal_90_days: data.answers.goal90Days,
          reflection: data.answers.reflection || null,
          updated_at: now,
        }
      : {
          id: data.id,
          kind: "pricing",
          score: computePricing({
            ...data.answers,
            signals: normalizeSignals(data.answers.signals),
          }).score,
          answers: data.answers,
          signals: normalizeSignals(data.answers.signals),
          next_level_goal: data.answers.nextLevelGoal,
          next_level_other: data.answers.nextLevelOther || null,
          updated_at: now,
        };

  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  };
  // Las claves antiguas son JWT; las nuevas (sb_secret_...) solo van en apikey.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  try {
    const res = await fetch(`${url}/rest/v1/submissions?on_conflict=id`, {
      method: "POST",
      headers,
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("Supabase respondió", res.status);
      return Response.json({ ok: false, stored: false }, { status: 202 });
    }
    return Response.json({ ok: true, stored: true });
  } catch {
    console.error("No se pudo contactar a Supabase");
    return Response.json({ ok: false, stored: false }, { status: 202 });
  }
}
