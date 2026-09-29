"use client";

import { useId, useState } from "react";
import { downloadPdf, sendEmail } from "./client";
import { ArrowIcon } from "./icons";

const MENTORIA_URL = (process.env.NEXT_PUBLIC_MENTORIA_URL ?? "").trim();
const HAS_MENTORIA = /^https?:\/\//i.test(MENTORIA_URL);

type Status = { ok: boolean; message: string } | null;

export function ResultActions({
  kind,
  answers,
  mentoriaLead,
}: {
  kind: "scaling" | "pricing";
  answers: unknown;
  mentoriaLead?: string;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [busy, setBusy] = useState<"pdf" | "mail" | null>(null);
  const [status, setStatus] = useState<Status>(null);

  const cleanName = name.trim() || undefined;

  async function onDownload() {
    setBusy("pdf");
    setStatus(null);
    const res = await downloadPdf(kind, { name: cleanName, answers });
    setStatus(res);
    setBusy(null);
  }

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    setBusy("mail");
    setStatus(null);
    const res = await sendEmail({ kind, email, name: cleanName, answers });
    setStatus(res);
    setBusy(null);
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="btn"
          onClick={onDownload}
          disabled={busy !== null}
        >
          {busy === "pdf" ? "Preparando…" : "Descargar mi diagnóstico"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          aria-expanded={showEmail}
          aria-controls={`${uid}-mail`}
          onClick={() => setShowEmail((v) => !v)}
        >
          Recibirlo por correo
        </button>
        {HAS_MENTORIA ? (
          <a
            href={MENTORIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-brand-gradient border-transparent sm:ml-auto"
          >
            Quiero aplicar
            <ArrowIcon />
          </a>
        ) : null}
      </div>

      {showEmail ? (
        <form
          id={`${uid}-mail`}
          onSubmit={onSend}
          className="rise mt-6 max-w-md border-[1.5px] border-ink bg-paper p-5"
        >
          <label
            htmlFor={`${uid}-email`}
            className="mb-2 block text-base font-semibold"
          >
            Tu correo
          </label>
          <input
            id={`${uid}-email`}
            className="field"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="mt-2 text-sm text-grey">
            Solo lo usamos para enviarte este PDF. No lo necesitas para ver ni
            descargar tu diagnóstico.
          </p>
          <button
            type="submit"
            className="btn mt-4 w-full"
            disabled={busy !== null || email.trim() === ""}
          >
            {busy === "mail" ? "Enviando…" : "Enviar a mi correo"}
          </button>
        </form>
      ) : null}

      {HAS_MENTORIA && mentoriaLead ? (
        <p className="mt-8 max-w-2xl border-l-[3px] border-magenta pl-4 text-lg">
          {mentoriaLead}
        </p>
      ) : null}

      <p
        role="status"
        aria-live="polite"
        className={`mt-5 min-h-6 text-base ${
          status
            ? status.ok
              ? "font-semibold"
              : "text-magenta font-semibold"
            : ""
        }`}
      >
        {status?.message}
      </p>
    </section>
  );
}
