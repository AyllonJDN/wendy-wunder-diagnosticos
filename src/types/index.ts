/* ---------- Recurso 01 · Antes de escalar ---------- */

export type Stage = "validando" | "vendo" | "crecer";
export type MainBlocker = "clientes" | "convertir" | "organizar";
export type Goal90 = "vender" | "cobrar" | "crecer-simple";
export type YesNo = "si" | "no";

export interface ScalingAnswers {
  stage: Stage;
  mainBlocker: MainBlocker;
  goal90Days: Goal90;
  want: YesNo;
  buy: YesNo;
  scale: YesNo;
  reflection?: string;
}

export type DimensionKey = "want" | "buy" | "scale";

export interface PendingItem {
  key: DimensionKey;
  title: string;
  text: string;
  action: string;
  question: string;
  points?: string[];
}

export interface DimensionStatus {
  key: DimensionKey;
  index: string;
  label: string;
  validated: boolean;
}

export interface ScalingResult {
  score: 0 | 1 | 2 | 3;
  headline: string;
  working: string[];
  pending: PendingItem[];
  nextStep: string;
  dimensions: DimensionStatus[];
  context: {
    stageLabel: string;
    blockerLabel: string;
    goalLabel: string;
    note: string;
  };
  reflection?: string;
  /** Palabras del núcleo del resultado (frase + funciona + revisar + siguiente paso). */
  coreWordCount: number;
}

/* ---------- Recurso 02 · Precio y valor ---------- */

export type SignalId = 1 | 2 | 3 | 4 | 5;

export type NextLevelGoal =
  | "mejores-clientes"
  | "cobrar-mas"
  | "comunicar-valor"
  | "vender-seguridad"
  | "oferta-clara"
  | "visibilidad"
  | "otra";

export interface PricingAnswers {
  signals: SignalId[];
  nextLevelGoal: NextLevelGoal;
  nextLevelOther?: string;
}

export interface SignalAction {
  lead?: string;
  items?: string[];
  ordered?: boolean;
  notes?: string[];
}

export interface PricingSignal {
  id: SignalId;
  title: string;
  description: string;
  area: string;
  /** Resumen corto del problema (una línea). */
  summary: string;
  /** Diagnóstico corto, usado en "Lo que necesitas revisar". */
  diagnosis: string;
  /** Desarrollo completo del diagnóstico (párrafos). */
  detail: string[];
  action: SignalAction;
  challenge: string;
  absence: string;
}

export interface PricingResult {
  score: 0 | 1 | 2 | 3 | 4 | 5;
  band: "low" | "mid" | "high";
  title: string;
  text: string;
  extra: string[];
  held: string[];
  toReview: PricingSignal[];
  nextLevel: {
    label: string;
    isOther: boolean;
    reading?: string;
    action?: string;
  };
  weekAction: string;
}

export type DiagnosticKind = "scaling" | "pricing";

export interface Contact {
  name: string;
  email?: string;
  phone?: string;
  situation: "negocio-propio" | "independiente" | "ejecutiva" | "por-emprender";
  desiredChange: "mas-ingresos" | "cobrar-mejor" | "mejores-clientes" | "claridad";
  question: string;
  consent: true;
}
