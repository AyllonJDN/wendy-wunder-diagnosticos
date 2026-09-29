import {
  BANDS,
  FALLBACK_WEEK_ACTION,
  NEXT_LEVEL_OPTIONS,
  SIGNALS,
} from "../../data/pricing";
import type { PricingAnswers, PricingResult, SignalId } from "../../types";

export function normalizeSignals(signals: readonly number[]): SignalId[] {
  const set = new Set<number>(signals);
  return SIGNALS.map((s) => s.id).filter((id) => set.has(id));
}

/**
 * Única fuente de verdad del Recurso 02.
 * El score depende SOLO de las señales 1–5. nextLevelGoal nunca lo modifica.
 */
export function computePricing(answers: PricingAnswers): PricingResult {
  const selected = normalizeSignals(answers.signals);
  const score = selected.length as 0 | 1 | 2 | 3 | 4 | 5;
  const band: PricingResult["band"] =
    score <= 1 ? "low" : score <= 3 ? "mid" : "high";

  const held = SIGNALS.filter((s) => !selected.includes(s.id)).map(
    (s) => s.absence,
  );
  const toReview = SIGNALS.filter((s) => selected.includes(s.id));

  const option = NEXT_LEVEL_OPTIONS.find(
    (o) => o.value === answers.nextLevelGoal,
  );
  const isOther = answers.nextLevelGoal === "otra";
  const other = answers.nextLevelOther?.trim();
  const label = isOther ? (other ? other : "Otra") : (option?.label ?? "");

  // Una sola acción para esta semana: el reto de la primera señal reconocida.
  let weekAction: string;
  if (toReview.length > 0) {
    weekAction = toReview[0].challenge;
  } else if (!isOther && option?.action) {
    weekAction = option.action;
  } else {
    weekAction = FALLBACK_WEEK_ACTION;
  }

  return {
    score,
    band,
    title: BANDS[band].title,
    text: BANDS[band].text,
    extra: BANDS[band].extra,
    held,
    toReview,
    nextLevel: {
      label,
      isOther,
      reading: isOther ? undefined : option?.reading,
      action: isOther ? undefined : option?.action,
    },
    weekAction,
  };
}
