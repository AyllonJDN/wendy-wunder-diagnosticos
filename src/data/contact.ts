/** Preguntas de perfil que acompañan a los datos de contacto (ambos recursos). */
export const SITUATION_QUESTION = "¿Cuál es tu situación actual?";
export const SITUATION_OPTIONS = [
  { value: "negocio-propio", label: "Tengo una empresa o negocio propio." },
  { value: "independiente", label: "Soy independiente" },
  { value: "ejecutiva", label: "Soy ejecutiva dentro de una empresa." },
  {
    value: "por-emprender",
    label: "Todavía no tengo un negocio, pero quiero emprender.",
  },
] as const;

export const CHANGE_QUESTION =
  "Si pudieras lograr UN cambio importante en los próximos 6–12 meses, ¿cuál sería?";
export const CHANGE_OPTIONS = [
  { value: "mas-ingresos", label: "Generar más ingresos con lo que ya hago." },
  {
    value: "cobrar-mejor",
    label: "Cobrar mejor y elevar el valor de mi trabajo, servicio o negocio.",
  },
  { value: "mejores-clientes", label: "Atraer mejores clientes u oportunidades." },
  {
    value: "claridad",
    label: "Tener mayor claridad sobre mi siguiente nivel profesional o de negocio.",
  },
] as const;

export const QUESTION_FOR_WENDY =
  "Si pudieras sentarte conmigo (Wendy Wünder) durante 30 minutos para resolver lo que más se te dificulta, ¿qué me preguntarías?";

export const SITUATION_VALUES = SITUATION_OPTIONS.map((o) => o.value) as [
  (typeof SITUATION_OPTIONS)[number]["value"],
  ...(typeof SITUATION_OPTIONS)[number]["value"][],
];
export const CHANGE_VALUES = CHANGE_OPTIONS.map((o) => o.value) as [
  (typeof CHANGE_OPTIONS)[number]["value"],
  ...(typeof CHANGE_OPTIONS)[number]["value"][],
];

export const situationLabel = (v: string) =>
  SITUATION_OPTIONS.find((o) => o.value === v)?.label ?? v;
export const changeLabel = (v: string) =>
  CHANGE_OPTIONS.find((o) => o.value === v)?.label ?? v;
