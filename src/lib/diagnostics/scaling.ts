import {
  BLOCKER_DIMENSION,
  BLOCKER_OPTIONS,
  BLOCKER_PHRASE,
  DIMENSIONS,
  DIMENSION_NEED,
  DIMENSION_ORDER,
  DIMENSION_POSITIVE_NOUN,
  GOAL_OPTIONS,
  PENDING_CONTENT,
  STAGE_OPTIONS,
  WORKING_TEXT,
} from "../../data/scaling";
import type {
  DimensionKey,
  PendingItem,
  ScalingAnswers,
  ScalingResult,
} from "../../types";

const HEADLINES: Record<0 | 1 | 2 | 3, string> = {
  3: "Tu idea tiene una base para empezar a crecer.",
  2: "Hay señales positivas, pero una dimensión necesita validación o ajuste.",
  1: "Solo una de las tres dimensiones cuenta con evidencia por ahora.",
  0: "Todavía no existe suficiente evidencia para recomendar escalar.",
};

const NEXT_STEP_ALL_OK =
  "Elige un solo aspecto de tu crecimiento, aumenta el volumen de forma pequeña y verifica que demanda, venta y entrega se sostengan antes de dar el siguiente paso.";

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function labelOf<V extends string>(
  options: { value: V; label: string }[],
  value: V,
): string {
  return options.find((o) => o.value === value)?.label ?? "";
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

/**
 * Única fuente de verdad del Recurso 01.
 * Solo want / buy / scale alteran el score. stage / mainBlocker / goal90Days
 * únicamente contextualizan el texto.
 */
export function computeScaling(answers: ScalingAnswers): ScalingResult {
  const validated: Record<DimensionKey, boolean> = {
    want: answers.want === "si",
    buy: answers.buy === "si",
    scale: answers.scale === "si",
  };

  const score = DIMENSION_ORDER.filter((k) => validated[k]).length as
    0 | 1 | 2 | 3;

  const positives = DIMENSION_ORDER.filter((k) => validated[k]);
  const pendingKeys = DIMENSION_ORDER.filter((k) => !validated[k]);

  const pending: PendingItem[] = pendingKeys.map((key) => ({
    key,
    ...PENDING_CONTENT[key],
  }));

  const working: string[] = [];
  if (score === 0) {
    working.push(
      "Todavía no hay una dimensión respaldada con evidencia. Es un punto de partida, no un veredicto.",
    );
  } else {
    positives.forEach((k) => working.push(WORKING_TEXT[k]));
    if (score === 3) {
      working.push(
        "Es una base para empezar a crecer, no una razón para gastar sin medir.",
      );
    }
  }

  // Siguiente paso: la dimensión pendiente que coincide con el freno declarado
  // (solo prioriza el orden del texto, nunca el score); si no, la primera pendiente.
  const blockerDim = BLOCKER_DIMENSION[answers.mainBlocker];
  const primary =
    pending.find((p) => p.key === blockerDim) ?? pending[0] ?? undefined;
  const nextStep = primary ? primary.action : NEXT_STEP_ALL_OK;

  const stageLabel = labelOf(STAGE_OPTIONS, answers.stage);
  const blockerLabel = labelOf(BLOCKER_OPTIONS, answers.mainBlocker);
  const goalLabel = labelOf(GOAL_OPTIONS, answers.goal90Days);

  // Nota de contexto: solo reordena lo ya declarado, no inventa causas.
  const blockerPhrase = BLOCKER_PHRASE[answers.mainBlocker];
  let note: string;
  if (!validated[blockerDim]) {
    const need = DIMENSION_NEED[blockerDim];
    if (positives.length > 0) {
      const nouns = joinList(positives.map((k) => DIMENSION_POSITIVE_NOUN[k]));
      note = `Ya existe evidencia de ${nouns}, pero si hoy tu principal freno está en ${blockerPhrase}, antes de aumentar volumen necesitas ${need}.`;
    } else {
      note = `Todavía no hay evidencia respaldada en ninguna dimensión. Si hoy tu principal freno está en ${blockerPhrase}, antes de aumentar volumen necesitas ${need}.`;
    }
  } else {
    note = `Hoy señalas «${blockerLabel}» como tu principal freno, aunque esa dimensión aparece respaldada en tus respuestas. Identifica qué lo hace sentir así antes de decidir cómo crecer.`;
  }
  note += ` Tu meta declarada para los próximos 90 días es «${goalLabel}»; úsala como criterio para decidir qué probar primero.`;

  const core = [
    HEADLINES[score],
    ...working,
    ...pending.map((p) => `${p.title} ${p.text}`),
    nextStep,
  ].join(" ");

  const reflection = answers.reflection?.trim();

  return {
    score,
    headline: HEADLINES[score],
    working,
    pending,
    nextStep,
    dimensions: DIMENSION_ORDER.map((key) => ({
      key,
      index: DIMENSIONS[key].index,
      label: DIMENSIONS[key].label,
      validated: validated[key],
    })),
    context: { stageLabel, blockerLabel, goalLabel, note },
    reflection: reflection ? reflection : undefined,
    coreWordCount: countWords(core),
  };
}
