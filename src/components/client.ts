export interface ApiMessage {
  ok: boolean;
  message: string;
}

const GENERIC =
  "Algo no salió como esperábamos. Inténtalo de nuevo en un momento.";

export async function downloadPdf(
  kind: "scaling" | "pricing",
  payload: { name?: string; answers: unknown },
): Promise<ApiMessage> {
  try {
    const res = await fetch(`/api/pdf/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as ApiMessage | null;
      return { ok: false, message: data?.message ?? GENERIC };
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      kind === "scaling"
        ? "wendy-wunder-antes-de-escalar.pdf"
        : "wendy-wunder-precio-y-valor.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return { ok: true, message: "Tu diagnóstico se descargó." };
  } catch {
    return { ok: false, message: GENERIC };
  }
}

/**
 * Guarda (o actualiza) respuestas y contacto de esta sesión. El servidor hace
 * upsert por id. Devuelve true si quedó guardado; nunca lanza errores.
 */
export async function saveSubmission(
  kind: "scaling" | "pricing",
  id: string,
  answers: unknown,
  contact: unknown,
): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id, answers, contact }),
        keepalive: true,
      });
      if (res.ok) return true;
      if (res.status === 400) return false;
    } catch {
      /* reintenta una vez */
    }
  }
  return false;
}

export function newSubmissionId(): string {
  return crypto.randomUUID();
}
