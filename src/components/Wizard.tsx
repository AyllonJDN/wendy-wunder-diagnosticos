"use client";

import { useEffect, useRef, type ReactNode } from "react";
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

export function PatternInterlude({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <main className="mx-auto max-w-3xl px-5 pb-10 pt-8 sm:px-8 sm:pt-16 lg:pl-28">
      <div className="rise">
        <div
          className="bg-brand-gradient mb-8 h-[6px] w-24"
          aria-hidden="true"
        />
        <h1
          ref={ref}
          tabIndex={-1}
          className="font-display text-4xl font-black uppercase leading-[1.05] outline-none sm:text-7xl"
        >
          Tus respuestas ya muestran un patrón.
        </h1>
        <div className="mt-12 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Anterior
          </button>
          <button type="button" className="btn" onClick={onNext}>
            Ver mi diagnóstico
            <ArrowIcon />
          </button>
        </div>
      </div>
    </main>
  );
}
