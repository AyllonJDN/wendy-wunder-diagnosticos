"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NEXT_LEVEL_HEADING,
  NEXT_LEVEL_OPTIONS,
  NEXT_LEVEL_QUESTION,
  OTHER_INPUT_LABEL,
  PRICING_CLOSING_CTA,
  PRICING_CLOSING_HEADLINE,
  PRICING_CLOSING_LINES,
  PRICING_INSTRUCTION,
  PRICING_INSTRUCTION_NOTE,
  PRICING_SUBTITLE,
  PRICING_TITLE,
  REFLECTION_ITEMS,
  PRICING_INTRO_NOTE,
  REFLECTION_TITLE,
  SIGNALS,
} from "@/data/pricing";
import { computePricing } from "@/lib/diagnostics/pricing";
import type { NextLevelGoal, PricingAnswers, SignalId } from "@/types";
import { newSubmissionId, saveSubmission } from "./client";
import { ResultActions } from "./ResultActions";
import { SocialLinks } from "./SocialLinks";
import { ArrowIcon } from "./icons";
import {
  ChoiceGroup,
  OptionFace,
  PatternInterlude,
  Prompt,
  WizardFrame,
} from "./Wizard";

type Phase = "intro" | "questions" | "pattern" | "result";
const TOTAL = SIGNALS.length + 1;

export function PricingTool() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [signals, setSignals] = useState<SignalId[]>([]);
  const [goal, setGoal] = useState<NextLevelGoal | undefined>();
  const [other, setOther] = useState("");
  const [submissionId] = useState(newSubmissionId);

  const toggle = (id: SignalId) =>
    setSignals((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  if (phase === "intro") {
    return (
      <main className="mx-auto max-w-3xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16 lg:pl-28">
        <div className="rise">
          <p className="label mb-6 text-magenta">02 · Precio y valor</p>
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] sm:text-6xl">
            {PRICING_TITLE}
          </h1>
          <p className="mt-6 text-xl text-grey">{PRICING_SUBTITLE}</p>
          <div className="mt-10 space-y-3 border-t border-ink pt-8 text-lg">
            <p className="font-semibold">{PRICING_INSTRUCTION}</p>
            <p className="text-grey">{PRICING_INSTRUCTION_NOTE}</p>
            <p className="text-grey">{PRICING_INTRO_NOTE}</p>
          </div>
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
    const isGoalStep = step === SIGNALS.length;
    const signal = isGoalStep ? null : SIGNALS[step];
    const goalOk = !!goal && (goal !== "otra" || other.trim().length > 0);

    return (
      <WizardFrame
        tool="02"
        toolTitle="Precio y valor"
        step={step}
        total={TOTAL}
        tag={isGoalStep ? NEXT_LEVEL_HEADING : `Señal ${signal!.id} de 5`}
        onBack={() => (step === 0 ? setPhase("intro") : setStep(step - 1))}
        onNext={() =>
          step === TOTAL - 1 ? setPhase("pattern") : setStep(step + 1)
        }
        nextDisabled={isGoalStep ? !goalOk : false}
      >
        {signal ? (
          <>
            <p className="mb-6 text-lg font-semibold">{PRICING_INSTRUCTION}</p>
            <div className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:gap-8">
              <span
                className="font-display text-7xl font-black leading-none text-brand-gradient"
                aria-hidden="true"
              >
                {String(signal.id).padStart(2, "0")}
              </span>
              <div>
                <Prompt id={`s-${signal.id}`}>{signal.title}</Prompt>
                <p className="mt-6 text-xl leading-relaxed">
                  {signal.description}
                </p>
              </div>
            </div>
            <div className="mt-10">
              <label className="block cursor-pointer">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={signals.includes(signal.id)}
                  onChange={() => toggle(signal.id)}
                />
                <OptionFace label="Me pasó durante el último mes" />
              </label>
              <p className="mt-3 text-sm text-grey">
                Si no te pasó, continúa sin marcar.
              </p>
            </div>
          </>
        ) : (
          <>
            <Prompt id="next-level">{NEXT_LEVEL_QUESTION}</Prompt>
            <ChoiceGroup
              name="nextLevelGoal"
              labelledBy="next-level"
              options={NEXT_LEVEL_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
              }))}
              value={goal}
              onChange={(v) => setGoal(v as NextLevelGoal)}
            />
            {goal === "otra" ? (
              <div className="rise mt-5">
                <label
                  htmlFor="other"
                  className="mb-2 block text-base font-semibold"
                >
                  {OTHER_INPUT_LABEL}
                </label>
                <input
                  id="other"
                  className="field"
                  type="text"
                  maxLength={300}
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </div>
            ) : null}
          </>
        )}
      </WizardFrame>
    );
  }

  if (phase === "pattern") {
    return (
      <PatternInterlude
        onBack={() => {
          setStep(TOTAL - 1);
          setPhase("questions");
        }}
        onNext={() => {
          window.scrollTo({ top: 0 });
          saveSubmission("pricing", submissionId, {
            signals,
            nextLevelGoal: goal ?? "otra",
            nextLevelOther:
              goal === "otra" ? other.trim() || undefined : undefined,
          });
          setPhase("result");
        }}
      />
    );
  }

  const answers: PricingAnswers = {
    signals,
    nextLevelGoal: goal ?? "otra",
    nextLevelOther: goal === "otra" ? other.trim() || undefined : undefined,
  };
  const result = computePricing(answers);

  return (
    <main className="mx-auto max-w-4xl px-5 pb-10 pt-8 sm:px-8 sm:pt-12 lg:pl-28">
      <div className="rise">
        <section className="bg-ink px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="label mb-4 text-brand-orange">
            Tu resultado · Señales reconocidas
          </p>
          <p
            className="font-display text-[7rem] font-black leading-none sm:text-[11rem]"
            aria-label={`${result.score} de 5`}
          >
            <span className="text-brand-gradient">{result.score}</span>
            <span className="text-white/40">/5</span>
          </p>
          <h1 className="font-display mt-6 max-w-3xl text-2xl font-bold uppercase leading-snug sm:text-4xl">
            {result.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{result.text}</p>
          {result.extra.map((t) => (
            <p key={t} className="mt-3 max-w-2xl text-lg italic text-white/90">
              {t}
            </p>
          ))}
        </section>

        <div className="mt-2">
          <Row label="Lo que ya estás sosteniendo">
            {result.held.length === 0 ? (
              <p>
                Reconociste las cinco señales. Verlas con claridad es el primer
                paso para revisarlas.
              </p>
            ) : (
              result.held.map((t) => <p key={t}>{t}</p>)
            )}
          </Row>
          <Row label="Lo que necesitas revisar">
            {result.toReview.length === 0 ? (
              <p>No marcaste señales, así que no hay áreas por revisar aquí.</p>
            ) : (
              result.toReview.map((s) => (
                <div key={s.id}>
                  <p className="label">
                    <span className="text-magenta">
                      {String(s.id).padStart(2, "0")}
                    </span>{" "}
                    · {s.area}
                  </p>
                  <p className="mt-1">{s.diagnosis}</p>
                </div>
              ))
            )}
          </Row>
          <Row label="Tu siguiente nivel">
            <p className="font-display text-2xl font-black leading-tight sm:text-4xl">
              {result.nextLevel.label}
            </p>
          </Row>
          {result.nextLevel.reading ? (
            <Row label="Tu siguiente paso">
              <p className="font-display text-xl font-bold italic leading-snug sm:text-2xl">
                {result.nextLevel.reading}
              </p>
              {result.nextLevel.action ? (
                <p>{result.nextLevel.action}</p>
              ) : null}
            </Row>
          ) : null}
          <Row label="Tu acción de esta semana">
            <p className="font-display text-xl font-bold leading-snug sm:text-2xl">
              {result.weekAction}
            </p>
          </Row>
        </div>

        {result.toReview.length > 0 ? (
          <section className="mt-10 bg-paper px-6 py-8 sm:px-10">
            <h2 className="label mb-6 text-magenta">Tus señales en detalle</h2>
            <div className="space-y-9">
              {result.toReview.map((s) => (
                <article
                  key={s.id}
                  className="grid gap-3 border-t border-ink pt-5 sm:grid-cols-[5rem_1fr]"
                >
                  <span className="font-display text-5xl font-black text-magenta">
                    {String(s.id).padStart(2, "0")}
                  </span>
                  <div className="space-y-3">
                    <p className="label">{s.area}</p>
                    <h3 className="font-display text-2xl font-bold leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-grey">{s.description}</p>
                    <div>
                      <p className="label text-magenta">
                        Qué está pasando realmente
                      </p>
                      <p className="font-display mt-1 text-lg font-bold italic">
                        {s.summary}
                      </p>
                      <div className="mt-2 space-y-2">
                        {s.detail.map((d) => (
                          <p key={d}>{d}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="label text-magenta">Acción concreta</p>
                      {s.action.lead ? <p>{s.action.lead}</p> : null}
                      {s.action.items ? (
                        s.action.ordered ? (
                          <ol className="list-decimal pl-6">
                            {s.action.items.map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="list-disc pl-6">
                            {s.action.items.map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ul>
                        )
                      ) : null}
                      {s.action.notes?.map((n) => (
                        <p key={n} className="mt-2 font-semibold">
                          {n}
                        </p>
                      ))}
                    </div>
                    <p>
                      <span className="label text-magenta">Tu reto · </span>
                      <span className="font-semibold">{s.challenge}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Reflexión final (no modifica el score) */}
        <section className="mt-12">
          <h2 className="font-display text-3xl font-black uppercase sm:text-4xl">
            {REFLECTION_TITLE}
          </h2>
          <ol className="mt-6">
            {REFLECTION_ITEMS.map((item, i) => (
              <li
                key={item.q}
                className="grid grid-cols-[3.5rem_1fr] items-baseline gap-2 border-t border-ink py-4"
              >
                <span className="font-display text-3xl font-black text-magenta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display block text-xl italic leading-snug">
                    {item.q}
                  </span>
                  <span className="mt-1 block text-grey">{item.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12">
          <ResultActions
            kind="pricing"
            answers={answers}
            submissionId={submissionId}
          />
        </div>

        <section className="bg-ink mt-14 px-6 py-10 text-white sm:px-10">
          <p className="font-display text-3xl font-black uppercase leading-tight sm:text-5xl">
            {PRICING_CLOSING_HEADLINE.join(" ")}
          </p>
          <div
            className="bg-brand-gradient my-6 h-[5px] w-24"
            aria-hidden="true"
          />
          {PRICING_CLOSING_LINES.map((l) => (
            <p key={l} className="font-display text-xl italic leading-relaxed">
              {l}
            </p>
          ))}
          <p className="font-display mt-8 text-2xl font-black uppercase leading-tight text-brand-orange sm:text-3xl">
            {PRICING_CLOSING_CTA.join(" ")}
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
          <Link href="/antes-de-escalar" className="btn btn-ghost">
            Hacer el diagnóstico 01
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Row({
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
