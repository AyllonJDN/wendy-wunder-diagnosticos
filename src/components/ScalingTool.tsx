"use client";

import { useState } from "react";
import {
  SCALING_CLOSING,
  SCALING_CLOSING_NOTE,
  SCALING_GUIDE,
  SCALING_INTRO,
  SCALING_QUESTIONS,
  SCALING_REFLECTION_PROMPT,
  SCALING_SUBTITLE,
  SCALING_TITLE,
  type ScalingField,
} from "@/data/scaling";
import { computeScaling } from "@/lib/diagnostics/scaling";
import type { Contact, ScalingAnswers } from "@/types";
import { newSubmissionId, saveSubmission } from "./client";
import { ResultActions } from "./ResultActions";
import { SocialLinks } from "./SocialLinks";
import { ArrowIcon } from "./icons";
import { ChoiceGroup, PatternInterlude, Prompt, WizardFrame } from "./Wizard";

type Phase = "intro" | "questions" | "pattern" | "result";
const TOTAL = SCALING_QUESTIONS.length;

export function ScalingTool() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<ScalingAnswers>>({});
  const [submissionId] = useState(newSubmissionId);
  const [contact, setContact] = useState<Contact | undefined>();

  const set = (field: ScalingField, value: string) =>
    setAnswers((a) => ({ ...a, [field]: value }));

  if (phase === "intro") {
    return (
      <main className="mx-auto max-w-3xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16 lg:pl-28">
        <div className="rise">
          <p className="label mb-6 text-magenta">01 · Antes de escalar</p>
          <h1 className="font-display text-4xl font-black leading-[1.05] sm:text-6xl">
            {SCALING_TITLE}
          </h1>
          <p className="mt-6 text-xl text-grey">{SCALING_SUBTITLE}</p>
          <div className="mt-10 space-y-5 border-t border-ink pt-8 text-lg">
            {SCALING_INTRO.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <details className="group mt-8 border-y border-ink">
            <summary className="label flex min-h-14 cursor-pointer list-none items-center justify-between py-4">
              <span>Lee la mini guía antes de responder</span>
              <span aria-hidden="true" className="text-xl group-open:hidden">
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden text-xl group-open:inline"
              >
                −
              </span>
            </summary>
            <div className="space-y-10 pb-8 pt-2">
              {SCALING_GUIDE.map((g) => (
                <section key={g.n}>
                  <h2 className="font-display text-3xl font-black uppercase">
                    <span className="text-magenta">{g.n}.</span> {g.title}
                  </h2>
                  <p className="font-display mt-2 text-xl font-bold italic">
                    {g.lead}
                  </p>
                  <div className="mt-3 space-y-3">
                    {g.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {g.list ? (
                    <ul className="mt-3 list-disc pl-6">
                      {g.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-3 font-semibold">Hazte esta pregunta:</p>
                  <p className="font-display text-lg font-bold italic">
                    {g.ask}
                  </p>
                  <p className="mt-3">{g.after}</p>
                </section>
              ))}
            </div>
          </details>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setStep(0);
                setPhase("questions");
              }}
            >
              Comenzar
              <ArrowIcon />
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (phase === "questions") {
    const q = SCALING_QUESTIONS[step];
    const value = answers[q.field];
    return (
      <WizardFrame
        tool="01"
        toolTitle="Antes de escalar"
        step={step}
        total={TOTAL}
        tag={
          q.kind === "context"
            ? "Contexto · no cambia tu resultado"
            : "Diagnóstico"
        }
        onBack={() => (step === 0 ? setPhase("intro") : setStep(step - 1))}
        onNext={() =>
          step === TOTAL - 1 ? setPhase("pattern") : setStep(step + 1)
        }
        nextDisabled={!value}
      >
        <Prompt id={`q-${q.field}`}>{q.prompt}</Prompt>
        <ChoiceGroup
          name={q.field}
          labelledBy={`q-${q.field}`}
          options={q.options}
          value={value}
          onChange={(v) => set(q.field, v)}
        />
      </WizardFrame>
    );
  }

  if (phase === "pattern") {
    return (
      <PatternInterlude
        initial={contact}
        onBack={() => {
          setStep(TOTAL - 1);
          setPhase("questions");
        }}
        onSubmit={async (c) => {
          setContact(c);
          await saveSubmission("scaling", submissionId, answers, c);
          window.scrollTo({ top: 0 });
          setPhase("result");
        }}
      />
    );
  }

  const complete = answers as ScalingAnswers;
  const result = computeScaling(complete);
  const payloadAnswers: ScalingAnswers = {
    ...complete,
    reflection: answers.reflection?.trim() || undefined,
  };

  return (
    <main className="mx-auto max-w-4xl px-5 pb-10 pt-8 sm:px-8 sm:pt-12 lg:pl-28">
      <div className="rise">
        {/* Score */}
        <section className="bg-ink px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="label mb-4 text-brand-orange">Tu resultado</p>
          <p
            className="font-display text-[7rem] font-black leading-none sm:text-[11rem]"
            aria-label={`${result.score} de 3`}
          >
            <span className="text-brand-gradient">{result.score}</span>
            <span className="text-white/40">/3</span>
          </p>
          <h1 className="font-display mt-6 max-w-2xl text-2xl font-bold leading-snug sm:text-4xl">
            {result.headline}
          </h1>
        </section>

        {/* Mapa */}
        <ul
          className="grid border-b border-ink sm:grid-cols-3"
          aria-label="Tu mapa"
        >
          {result.dimensions.map((d) => (
            <li
              key={d.key}
              className="flex items-center justify-between gap-4 border-t border-ink py-5 sm:flex-col sm:items-start sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
            >
              <span className="font-display text-4xl font-black text-magenta">
                {d.index}
              </span>
              <span>
                <span className="label block">{d.label}</span>
                <span
                  className={`label mt-1 inline-block px-2 py-1 ${
                    d.validated ? "bg-ink text-white" : "border border-ink"
                  }`}
                >
                  {d.validated ? "Validado" : "Por revisar"}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-2">
          <ResultRow label="Lo que está funcionando">
            {result.working.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </ResultRow>
          <ResultRow label="Lo que necesitas revisar antes de escalar">
            {result.pending.length === 0 ? (
              <p>No aparecen dimensiones pendientes en tus respuestas.</p>
            ) : (
              result.pending.map((p) => (
                <div key={p.key}>
                  <p className="label">{p.title}</p>
                  <p className="mt-1">{p.text}</p>
                </div>
              ))
            )}
          </ResultRow>
          <ResultRow label="Tu siguiente paso">
            <p className="font-display text-xl font-bold italic leading-snug sm:text-2xl">
              {result.nextStep}
            </p>
          </ResultRow>
        </div>

        {/* Detalle */}
        <section className="mt-10 bg-paper px-6 py-8 sm:px-10">
          <h2 className="label mb-5 text-magenta">Tu lectura en detalle</h2>
          <p className="text-lg">{result.context.note}</p>
          <dl className="mt-6 grid gap-4 border-t border-ink pt-5 sm:grid-cols-3">
            <Fact term="Etapa actual" value={result.context.stageLabel} />
            <Fact term="Principal freno" value={result.context.blockerLabel} />
            <Fact term="Meta 90 días" value={result.context.goalLabel} />
          </dl>
          {result.pending.length > 0 ? (
            <div className="mt-8 space-y-7 border-t border-ink pt-6">
              {result.pending.map((p, i) => (
                <div
                  key={p.key}
                  className="grid gap-2 sm:grid-cols-[3.5rem_1fr]"
                >
                  <span className="font-display text-3xl font-black text-magenta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="label">{p.title}</p>
                    <p className="font-display mt-2 text-xl font-bold italic leading-snug">
                      {p.question}
                    </p>
                    <p className="mt-2 text-grey">{p.action}</p>
                    {p.points ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.points.map((pt) => (
                          <li
                            key={pt}
                            className="border border-ink px-3 py-1 text-sm"
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {/* Reflexión opcional */}
        <section className="mt-10">
          <label
            htmlFor="reflection"
            className="font-display block text-2xl font-bold"
          >
            {SCALING_REFLECTION_PROMPT}
          </label>
          <p className="mt-1 text-sm text-grey">
            Opcional. Se incluirá en tu PDF.
          </p>
          <textarea
            id="reflection"
            className="field mt-3 min-h-32"
            maxLength={600}
            value={answers.reflection ?? ""}
            onChange={(e) =>
              setAnswers((a) => ({ ...a, reflection: e.target.value }))
            }
          />
        </section>

        <div className="mt-12">
          <ResultActions
            kind="scaling"
            answers={payloadAnswers}
            submissionId={submissionId}
            contact={contact}
          />
        </div>

        {/* Cierre */}
        <section className="mt-14 bg-ink px-6 py-10 text-white sm:px-10">
          <div
            className="bg-brand-gradient mb-6 h-[5px] w-24"
            aria-hidden="true"
          />
          <p className="font-display text-3xl font-black leading-tight sm:text-5xl">
            {SCALING_CLOSING.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="mt-6 max-w-xl text-lg italic text-white/90">
            {SCALING_CLOSING_NOTE.join(" ")}
          </p>
        </section>

        <SocialLinks className="mt-14" />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setStep(TOTAL - 1);
              setPhase("questions");
              window.scrollTo({ top: 0 });
            }}
          >
            Editar mis respuestas
          </button>
        </div>
      </div>
    </main>
  );
}

function ResultRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 border-b border-ink py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
      <h2 className="label text-magenta">{label}</h2>
      <div className="space-y-4 text-lg">{children}</div>
    </section>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label text-magenta">{term}</dt>
      <dd className="font-display mt-1 text-xl font-bold">{value}</dd>
    </div>
  );
}
