"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CHANGE_OPTIONS,
  CHANGE_QUESTION,
  QUESTION_FOR_WENDY,
  SITUATION_OPTIONS,
  SITUATION_QUESTION,
} from "@/data/contact";
import type { Contact } from "@/types";
import { ArrowIcon, CheckIcon } from "./icons";

const pad = (n: number) => String(n).padStart(2, "0");

export function WizardFrame({
  tool,
  toolTitle,
  step,
  total,
  tag,
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continuar",
  children,
}: {
  tool: string;
  toolTitle: string;
  step: number; // 0-based
  total: number;
  tag?: string;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  children: ReactNode;
}) {
  const pct = ((step + 1) / total) * 100;
  return (
    <main className="mx-auto max-w-3xl px-5 pb-10 pt-8 sm:px-8 sm:pt-12 lg:pl-28">
      <div className="mb-10">
        <div className="flex items-end justify-between gap-4">
          <p className="label text-grey">
            <span className="text-magenta">{tool}</span> · {toolTitle}
          </p>
          <p
            className="font-display text-3xl font-black tabular-nums sm:text-4xl"
            aria-label={`Pregunta ${step + 1} de ${total}`}
          >
            {pad(step + 1)}
            <span className="text-grey"> / {pad(total)}</span>
          </p>
        </div>
        <div className="mt-4 h-[3px] w-full bg-line" aria-hidden="true">
          <div
            className="bg-brand-gradient h-full transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div key={step} className="rise">
        {tag ? <p className="label mb-4 text-magenta">{tag}</p> : null}
        {children}
      </div>

      <div className="mt-12 flex flex-col-reverse gap-3 border-t border-ink pt-6 sm:flex-row sm:justify-between">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Anterior
        </button>
        <button
          type="button"
          className="btn"
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
          <ArrowIcon />
        </button>
      </div>
    </main>
  );
}

/** Título de pregunta; recibe el foco al cambiar de vista. */
export function Prompt({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: false });
  }, []);
  return (
    <h1
      id={id}
      ref={ref}
      tabIndex={-1}
      className="font-display text-4xl font-black uppercase leading-[1.05] outline-none sm:text-6xl"
    >
      {children}
    </h1>
  );
}

export function ChoiceGroup({
  name,
  labelledBy,
  options,
  value,
  onChange,
}: {
  name: string;
  labelledBy: string;
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="mt-10 grid gap-3"
    >
      {options.map((o, i) => (
        <label key={o.value} className="block cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <OptionFace index={i} label={o.label} />
        </label>
      ))}
    </div>
  );
}

export function OptionFace({
  index,
  label,
  markLabel,
}: {
  index?: number;
  label: string;
  markLabel?: string;
}) {
  return (
    <span className="flex min-h-[4.25rem] items-center gap-4 border-[1.5px] border-line bg-white px-5 py-4 text-lg leading-snug transition-colors duration-200 hover:border-ink peer-checked:border-[3px] peer-checked:border-magenta peer-checked:bg-paper peer-checked:font-semibold peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-3 peer-focus-visible:outline-magenta peer-checked:[&_.tick]:border-magenta peer-checked:[&_.tick]:bg-magenta">
      {index !== undefined ? (
        <span className="label w-6 shrink-0 text-grey">
          {String.fromCharCode(65 + index)}
        </span>
      ) : null}
      <span className="flex-1">{label}</span>
      {markLabel ? <span className="label text-grey">{markLabel}</span> : null}
      <span
        className="tick flex h-7 w-7 shrink-0 items-center justify-center border-[1.5px] border-line bg-white text-white transition-colors duration-200"
        aria-hidden="true"
      >
        <CheckIcon className="h-4 w-4" />
      </span>
    </span>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;

/**
 * Pantalla previa al resultado: el patrón + datos de contacto.
 * Nombre obligatorio, correo o teléfono (al menos uno) y consentimiento.
 */
export function PatternInterlude({
  onBack,
  onSubmit,
  initial,
}: {
  onBack: () => void;
  onSubmit: (contact: Contact) => Promise<void> | void;
  initial?: Contact;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [situation, setSituation] = useState<string>(initial?.situation ?? "");
  const [change, setChange] = useState<string>(initial?.desiredChange ?? "");
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [consent, setConsent] = useState(Boolean(initial));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    if (n.length < 2) return setError("Escribe tu nombre para continuar.");
    if (!em && !ph)
      return setError("Déjanos tu correo o tu teléfono para continuar.");
    if (em && !EMAIL_RE.test(em))
      return setError("Revisa tu correo: parece incompleto.");
    if (ph && !PHONE_RE.test(ph))
      return setError("Revisa tu teléfono: usa solo números, espacios o +.");
    if (!situation) return setError("Cuéntanos cuál es tu situación actual.");
    if (!change) return setError("Elige el cambio que más te gustaría lograr.");
    if (!consent)
      return setError("Necesitamos tu autorización para guardar tus datos.");
    setError("");
    setBusy(true);
    await onSubmit({
      name: n,
      email: em || undefined,
      phone: ph || undefined,
      situation: situation as Contact["situation"],
      desiredChange: change as Contact["desiredChange"],
      question: question.trim() || undefined,
      consent: true,
    });
    setBusy(false);
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pb-10 pt-8 sm:px-8 sm:pt-16 lg:pl-28">
      <form onSubmit={submit} noValidate className="rise">
        <div
          className="bg-brand-gradient mb-8 h-[6px] w-24"
          aria-hidden="true"
        />
        <h1
          ref={ref}
          tabIndex={-1}
          className="font-display text-4xl font-black uppercase leading-[1.05] outline-none sm:text-6xl"
        >
          Tus respuestas ya muestran un patrón.
        </h1>
        <p className="mt-6 max-w-xl text-xl text-grey">
          Un último paso: déjanos tus datos para ver tu diagnóstico y
          descargarlo.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="c-name" className="mb-2 block font-semibold">
              Nombre
            </label>
            <input
              id="c-name"
              className="field"
              type="text"
              autoComplete="name"
              maxLength={80}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="c-email" className="mb-2 block font-semibold">
              Correo
            </label>
            <input
              id="c-email"
              className="field"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={200}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="c-phone" className="mb-2 block font-semibold">
              Teléfono
            </label>
            <input
              id="c-phone"
              className="field"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <p className="text-sm text-grey sm:col-span-2">
            Con uno de los dos es suficiente: correo o teléfono.
          </p>
        </div>


        <div className="mt-8 grid gap-6 border-t border-line pt-8">
          <SelectField
            id="c-situation"
            label={SITUATION_QUESTION}
            value={situation}
            onChange={setSituation}
            options={SITUATION_OPTIONS}
          />
          <SelectField
            id="c-change"
            label={CHANGE_QUESTION}
            value={change}
            onChange={setChange}
            options={CHANGE_OPTIONS}
          />
          <div>
            <label htmlFor="c-question" className="mb-2 block font-semibold">
              {QUESTION_FOR_WENDY}
            </label>
            <textarea
              id="c-question"
              className="field min-h-32 resize-y"
              maxLength={1000}
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#d10851]"
          />
          <span className="text-base">
            Autorizo a Wendy Wünder a guardar mis datos de contacto y mis
            respuestas para poder contactarme.
          </span>
        </label>

        <p
          role="alert"
          aria-live="assertive"
          className="mt-4 min-h-6 font-semibold text-magenta"
        >
          {error}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Anterior
          </button>
          <button type="submit" className="btn" disabled={busy}>
            {busy ? "Guardando…" : "Ver mi diagnóstico"}
            <ArrowIcon />
          </button>
        </div>
      </form>
    </main>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label} <span className="text-magenta" aria-hidden="true">*</span>
      </label>
      <div className="relative">
        <select
          id={id}
          required
          className="field w-full cursor-pointer appearance-none pr-12"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-grey"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
