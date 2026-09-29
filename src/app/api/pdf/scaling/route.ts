import { friendlyError, pdfResponse } from "../../../../lib/pdf/response";
import { scalingPdfRequestSchema } from "../../../../lib/validation/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return friendlyError(
      400,
      "No pudimos leer tus respuestas. Inténtalo de nuevo.",
    );
  }
  const parsed = scalingPdfRequestSchema.safeParse(body);
  if (!parsed.success) {
    return friendlyError(400, "Faltan respuestas para generar tu diagnóstico.");
  }
  try {
    return await pdfResponse({
      kind: "scaling",
      answers: parsed.data.answers,
      name: parsed.data.name,
    });
  } catch {
    return friendlyError(
      500,
      "No pudimos generar tu PDF en este momento. Inténtalo de nuevo.",
    );
  }
}
