import type { DimensionKey, Goal90, MainBlocker, Stage, YesNo } from "../types";

export const SCALING_TITLE = "3 preguntas antes de escalar cualquier idea";
export const SCALING_SUBTITLE =
  "El filtro para saber si tu producto está listo para crecer o si todavía necesitas validarlo.";
export const SCALING_INTRO = [
  "Antes de invertir más dinero, tiempo o energía en una idea, hazte estas 3 preguntas.",
  "Porque escalar algo que todavía no funciona no hace que funcione más rápido. Solo hace que el problema sea más grande.",
];

export interface Option<V extends string> {
  value: V;
  label: string;
}

export type ScalingField =
  "stage" | "mainBlocker" | "goal90Days" | "want" | "buy" | "scale";

export interface ScalingQuestion {
  field: ScalingField;
  kind: "context" | "diagnostic";
  prompt: string;
  options: Option<string>[];
}

export const STAGE_OPTIONS: Option<Stage>[] = [
  { value: "validando", label: "Validando una idea" },
  { value: "vendo", label: "Ya vendo" },
  { value: "crecer", label: "Quiero crecer" },
];

export const BLOCKER_OPTIONS: Option<MainBlocker>[] = [
  { value: "clientes", label: "Conseguir clientes" },
  { value: "convertir", label: "Convertir ventas" },
  { value: "organizar", label: "Organizar el crecimiento" },
];

export const GOAL_OPTIONS: Option<Goal90>[] = [
  { value: "vender", label: "Vender más" },
  { value: "cobrar", label: "Cobrar más" },
  { value: "crecer-simple", label: "Crecer sin complicarme" },
];

export const SCALING_QUESTIONS: ScalingQuestion[] = [
  {
    field: "stage",
    kind: "context",
    prompt: "¿En qué etapa estás?",
    options: STAGE_OPTIONS,
  },
  {
    field: "mainBlocker",
    kind: "context",
    prompt: "¿Qué te frena más hoy?",
    options: BLOCKER_OPTIONS,
  },
  {
    field: "goal90Days",
    kind: "context",
    prompt: "¿Qué quieres lograr en los próximos 90 días?",
    options: GOAL_OPTIONS,
  },
  {
    field: "want",
    kind: "diagnostic",
    prompt: "¿Lo quieren?",
    options: [
      { value: "si", label: "Sí, tengo evidencia real" },
      { value: "no", label: "No estoy segura/o" },
    ] satisfies Option<YesNo>[],
  },
  {
    field: "buy",
    kind: "diagnostic",
    prompt: "¿Lo compran?",
    options: [
      { value: "si", label: "Sí, la venta se repite" },
      { value: "no", label: "Todavía tengo que convencer demasiado" },
    ] satisfies Option<YesNo>[],
  },
  {
    field: "scale",
    kind: "diagnostic",
    prompt: "¿Puedo entregarlo a escala?",
    options: [
      { value: "si", label: "Sí, estoy preparado/a" },
      { value: "no", label: "Hay algo que podría romperse" },
    ] satisfies Option<YesNo>[],
  },
];

export const DIMENSIONS: Record<
  DimensionKey,
  { index: string; label: string }
> = {
  want: { index: "01", label: "LO QUIEREN" },
  buy: { index: "02", label: "LO COMPRAN" },
  scale: { index: "03", label: "ENTREGA A ESCALA" },
};

export const DIMENSION_ORDER: DimensionKey[] = ["want", "buy", "scale"];

export const WORKING_TEXT: Record<DimensionKey, string> = {
  want: "Demanda respaldada: tienes evidencia real de que lo quieren.",
  buy: "Venta respaldada: la venta se repite.",
  scale: "Capacidad respaldada: estás preparado/a para entregarlo a escala.",
};

export const PENDING_CONTENT: Record<
  DimensionKey,
  {
    title: string;
    text: string;
    action: string;
    question: string;
    points?: string[];
  }
> = {
  want: {
    title: "DEMANDA POR VALIDAR",
    text: "Todavía no hay evidencia suficiente de que personas reales quieran esto.",
    action: "Antes de lanzar en grande, pruébalo con un grupo pequeño y real.",
    question: "¿Qué evidencia tengo de que alguien quiere esto?",
  },
  buy: {
    title: "OFERTA O MENSAJE POR AJUSTAR",
    text: "Puede existir interés, pero todavía hay una brecha entre que alguien diga “me gusta” y que decida comprar.",
    action:
      "Revisa si queda claro qué ofreces, para quién es y por qué debería comprarlo.",
    question: "¿La venta ocurre o todavía tengo que convencer demasiado?",
  },
  scale: {
    title: "CAPACIDAD DE ENTREGA POR PREPARAR",
    text: "Vender más también significa entregar más.",
    action:
      "Elige uno de estos puntos de revisión y anota qué tendría que cambiar si tus ventas se multiplicaran.",
    question:
      "¿Qué tendría que cambiar para atender diez veces más clientes sin que la experiencia empeore?",
    points: [
      "Producción o prestación",
      "Equipo",
      "Atención",
      "Tiempos",
      "Sistemas",
      "Flujo de caja",
    ],
  },
};

export const BLOCKER_DIMENSION: Record<MainBlocker, DimensionKey> = {
  clientes: "want",
  convertir: "buy",
  organizar: "scale",
};

export const BLOCKER_PHRASE: Record<MainBlocker, string> = {
  clientes: "conseguir clientes",
  convertir: "convertir ventas",
  organizar: "organizar el crecimiento",
};

export const DIMENSION_NEED: Record<DimensionKey, string> = {
  want: "comprobar que personas reales quieren lo que ofreces",
  buy: "comprobar que tu oferta se entiende y se compra con suficiente claridad",
  scale:
    "revisar qué necesitarías tener listo para entregar más sin que la experiencia empeore",
};

export const DIMENSION_POSITIVE_NOUN: Record<DimensionKey, string> = {
  want: "interés",
  buy: "venta",
  scale: "capacidad de entrega",
};

export const SCALING_REFLECTION_PROMPT =
  "¿Qué parte de mi idea necesito demostrar antes de escalarla?";

export const SCALING_CLOSING = [
  "Prueba pequeño.",
  "Aprende.",
  "Ajusta.",
  "Vuelve a probar.",
  "Y recién después, escala.",
];

export const SCALING_CLOSING_NOTE = [
  "Porque no se trata de crecer más rápido.",
  "Se trata de escalar algo que ya funciona.",
];


export interface GuideSection {
  n: string;
  title: string;
  lead: string;
  paragraphs: string[];
  list?: string[];
  ask: string;
  after: string;
}

/** Mini guía completa: se muestra antes de empezar el diagnóstico. */
export const SCALING_GUIDE: GuideSection[] = [
  {
    n: "1",
    title: "¿Lo quieren?",
    lead: "¿Ya lo probé con personas reales o el éxito solo está en mi cabeza?",
    paragraphs: [
      "Que a ti te encante tu idea no significa que el mercado la quiera.",
      "Y que tus amigos, familiares o seguidores digan “¡qué buena idea!” tampoco es validación.",
      "Validar es comprobar que personas reales tienen el problema y están dispuestas a pagar por una solución.",
    ],
    ask: "¿Tengo evidencia real de que alguien quiere esto o estoy tomando la decisión basándome en una suposición?",
    after:
      "Si todavía no lo sabes, antes de lanzar en grande, haz una prueba con un grupo pequeño real.",
  },
  {
    n: "2",
    title: "¿Lo compran?",
    lead: "¿La venta ocurre de forma natural o tengo que convencer demasiado?",
    paragraphs: [
      "Una cosa es que alguien diga: “Me encanta.” Y otra muy distinta: “¿Cómo pago?”",
      "Observa qué ocurre cuando intentas vender. Si necesitas explicar tu oferta durante 30 minutos, perseguir a cada persona, hacer descuentos constantemente o convencer demasiado para conseguir una venta, probablemente todavía hay algo que ajustar en tu oferta, mensaje o propuesta de valor.",
    ],
    ask: "¿Las personas entienden rápidamente qué ofrezco, para quién es y por qué deberían comprarlo?",
    after: "Si la respuesta es no, no escales todavía. Primero ajusta y vuelve a probar.",
  },
  {
    n: "3",
    title: "¿Puedo entregarlo a escala?",
    lead: "Si mañana vendo 10 veces más, ¿qué se rompe?",
    paragraphs: [
      "Aquí está el error de muchos emprendedores: creen que escalar significa solamente vender más. Pero vender más también significa tener que entregar más.",
      "Imagina que mañana tienes 10 veces más clientes:",
    ],
    list: [
      "¿Puedes producir o prestar el servicio?",
      "¿Tu equipo puede atenderlos?",
      "¿Puedes responder sus preguntas?",
      "¿Puedes entregar a tiempo?",
      "¿Tus sistemas soportan ese volumen?",
      "¿Tienes suficiente flujo de caja?",
    ],
    ask: "¿Qué tendría que cambiar en mi negocio para poder atender 10 veces más clientes sin que la experiencia empeore?",
    after: "Lo que encuentres aquí es lo que necesitas preparar antes de escalar.",
  },
];
