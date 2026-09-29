"use client";

import { useId, useState } from "react";
import type { Contact } from "@/types";
import { downloadPdf, saveSubmission } from "./client";

type Status = { ok: boolean; message: string } | null;

export function ResultActions({
  kind,
  answers,
  submissionId,
  contact,
}: {
  kind: "scaling" | "pricing";
  answers: unknown;
  submissionId: string;
  contact?: Contact;
}) {
  const uid = useId();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function onDownload() {
    setBusy(true);
    setStatus(null);
    // Actualiza lo guardado (p. ej. la reflexión escrita después del resultado).
    if (contact) void saveSubmission(kind, submissionId, answers, contact);
    const res = await downloadPdf(kind, {
      name: contact?.name,
      answers,
    });
    setStatus(res);
    setBusy(false);
  }

  return (
    <section
      aria-labelledby={`${uid}-h`}
      className="border-t-[3px] border-ink pt-8"
    >
      <h2 id={`${uid}-h`} className="label mb-6 text-magenta">
        Llévate tu diagnóstico
      </h2>

      <button
        type="button"
        className="btn w-full sm:w-auto"
        onClick={onDownload}
        disabled={busy}
      >
        {busy ? "Preparando…" : "Descargar mi diagnóstico"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-5 min-h-6 text-base ${
          status
            ? status.ok
              ? "font-semibold"
              : "font-semibold text-magenta"
            : ""
        }`}
      >
        {status?.message}
      </p>
    </section>
  );
}
