"use client";

import { useId, useState } from "react";
import { downloadPdf, saveSubmission } from "./client";

type Status = { ok: boolean; message: string } | null;

export function ResultActions({
  kind,
  answers,
  submissionId,
}: {
  kind: "scaling" | "pricing";
  answers: unknown;
  submissionId: string;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function onDownload() {
    setBusy(true);
    setStatus(null);
    // Actualiza lo guardado (p. ej. la reflexión escrita después del resultado).
    saveSubmission(kind, submissionId, answers);
    const res = await downloadPdf(kind, {
      name: name.trim() || undefined,
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

      <div className="mb-6 max-w-md">
        <label
          htmlFor={`${uid}-name`}
          className="mb-2 block text-base font-semibold"
        >
          Tu nombre <span className="font-normal text-grey">(opcional)</span>
        </label>
        <input
          id={`${uid}-name`}
          className="field"
          type="text"
          autoComplete="given-name"
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-2 text-sm text-grey">
          Aparecerá en la portada de tu PDF.
        </p>
      </div>

      <button
        type="button"
        className="btn w-full sm:w-auto"
        onClick={onDownload}
        disabled={busy}
      >
        {busy ? "Preparando…" : "Descargar mi diagnóstico"}
      </button>

      <p className="mt-4 max-w-md text-sm text-grey">
        Guardamos tus respuestas de forma anónima para mejorar estas
        herramientas. No guardamos tu nombre.
      </p>

      <p
        role="status"
        aria-live="polite"
        className={`mt-5 min-h-6 text-base ${
          status ? (status.ok ? "font-semibold" : "font-semibold text-magenta") : ""
        }`}
      >
        {status?.message}
      </p>
    </section>
  );
}
