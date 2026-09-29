import type { NextLevelGoal, PricingSignal, SignalId } from "../types";

export const PRICING_TITLE = "¿Tu precio refleja tu valor?";
export const PRICING_SUBTITLE =
  "5 señales de que estás cobrando desde el miedo y no desde tu posicionamiento.";
export const PRICING_INSTRUCTION =
  "Marca cada situación que te haya pasado durante el último mes.";
export const PRICING_INTRO_NOTE =
  "Al final podrás identificar cuántas señales tienes y, lo más importante, qué áreas de tus ventas necesitas revisar.";
export const PRICING_INSTRUCTION_NOTE =
  "Puedes marcar varias señales. Si una situación no te ha pasado, continúa sin marcarla.";

export const SIGNALS: PricingSignal[] = [
  {
    id: 1,
    title: "Pides perdón con la actitud",
    description:
      "Cuando llega el momento de decir el precio, cambias el tono de voz. Hablas más rápido, te pones nerviosa o usas frases como “bueno, es un poquito costoso, pero...” o “el precio normal es $$$$, pero te lo puedo dejar en...”. Estás pidiendo disculpas por cobrar tu trabajo.",
    area: "SEGURIDAD",
    summary: "No sostienes verbalmente tu precio.",
    diagnosis:
      "No necesariamente tienes un problema con tu precio. Puedes tener un problema con la seguridad con la que comunicas tu valor.",
    detail: [
      "No necesariamente tienes un problema con tu precio. Puedes tener un problema con la seguridad con la que comunicas tu valor.",
      "Cuando tú misma dudas al decir el precio, llenas el silencio con explicaciones, descuentos o disculpas. Y sin darte cuenta, haces que el cliente empiece a cuestionar algo que quizá ni siquiera estaba cuestionando.",
    ],
    action: {
      lead: "Haz esto la próxima vez que comuniques tu precio:",
      ordered: true,
      items: [
        "Di el precio.",
        "Explica brevemente qué incluye o qué transformación busca.",
        "Y guarda silencio.",
      ],
      notes: ["No necesitas defender tu precio antes de que el cliente lo cuestione."],
    },
    challenge: "Practica decir tu precio sin justificarlo.",
    absence:
      "No aparecen señales claras de que te disculpes con la actitud al decir tu precio.",
  },
  {
    id: 2,
    title: "Respondes a objeciones que el cliente aún no ha puesto",
    description:
      "Antes de que el cliente diga “está caro” o pida un descuento, tú ya estás justificando los costos de tus materiales, tus horas de trabajo o tu experiencia. Quieres convencerlo de que no es caro, cuando el cliente ni siquiera había dudado.",
    area: "COMUNICACIÓN DE VALOR",
    summary:
      "Intentas justificar en lugar de demostrar el valor de la transformación.",
    diagnosis: "Estás intentando vender antes de escuchar.",
    detail: [
      "Estás intentando vender antes de escuchar.",
      "Tu ansiedad por demostrar que “sí vale la pena” te lleva a responder preguntas que el cliente todavía no hizo.",
      "Y hay una diferencia enorme entre comunicar valor y justificarte. Comunicar valor es explicar por qué tu solución es relevante para esa persona. Justificarte es intentar convencerla de que no está pagando demasiado.",
    ],
    action: {
      lead: "La próxima vez que presentes tu oferta y el cliente se quede pensando…",
      ordered: true,
      items: [
        "Haz silencio. No rompas de inmediato el silencio.",
        "Pregúntale: ¿Qué te gustaría saber antes de tomar una decisión?",
        "Y escucha.",
      ],
      notes: [
        "Si aparece una objeción, responde a esa objeción, no a las cinco que imaginaste en tu cabeza.",
      ],
    },
    challenge:
      "Deja de vender características y empieza a comunicar transformación.",
    absence:
      "No aparecen señales claras de que respondas a objeciones antes de que el cliente las plantee.",
  },
  {
    id: 3,
    title: "Proyectas tu propia billetera",
    description:
      "Le pones el precio a tu producto pensando: “¿Yo pagaría esto?” Este es el típico error del artesano. En lugar de pensar: “¿Mi cliente ideal puede y quiere pagar esto por la transformación/estatus que le doy?”, estás fijando tus precios basándote en tu presupuesto actual, no en el poder adquisitivo de tu comprador.",
    area: "PRICING",
    summary:
      "Estás poniendo precio desde ti, no desde el mercado y el valor de la oferta.",
    diagnosis:
      "Estás utilizando tu propia capacidad de pago como referencia para decidir cuánto debería pagar otra persona.",
    detail: [
      "Estás utilizando tu propia capacidad de pago como referencia para decidir cuánto debería pagar otra persona. Pero tú no eres tu cliente.",
      "Tu precio debería considerar el problema que resuelves, la transformación que entregas, el perfil del cliente, el mercado y la capacidad de tu oferta para generar valor.",
    ],
    action: {
      lead: "Cambia la pregunta:",
      ordered: true,
      items: [
        "La próxima vez que pienses: “Yo jamás pagaría eso...”",
        "Cámbiala por: “¿Para quién este resultado tiene suficiente valor como para pagar ese precio?”",
        "Y después pregúntate: “¿Estoy intentando venderle a esa persona o a alguien que tiene un presupuesto completamente diferente?”",
      ],
      notes: [
        "Antes de bajar tus precios asegúrate de que le estás vendiendo al cliente correcto.",
      ],
    },
    challenge:
      "Revisa si estás calculando tu precio únicamente desde tus costos / horas.",
    absence:
      "No aparecen señales claras de que definas tu precio proyectando tu propia billetera.",
  },
  {
    id: 4,
    title: "Ofreces descuentos como primera herramienta de cierre",
    description:
      "Si el cliente hace una pausa después de escuchar el precio, tú entras en pánico y le mandas un mensaje ofreciéndole una rebaja “especial” para que no se vaya.",
    area: "PROCESO DE VENTAS",
    summary:
      "Estás intentando cerrar demasiado rápido porque interpretas el silencio como rechazo.",
    diagnosis: "Estás interpretando una pausa como un rechazo.",
    detail: [
      "Estás interpretando una pausa como un rechazo. Pero que alguien no responda inmediatamente no significa que no quiera comprar.",
      "Puede estar pensando, comparando opciones, revisando su presupuesto, consultándolo con alguien o simplemente necesitando tiempo.",
      "Si cada silencio genera un descuento, entrenas al cliente —y a ti misma— a pensar que tu precio inicial es negociable.",
    ],
    action: {
      lead: "Crea una regla:",
      ordered: true,
      items: [
        "Antes de volver a ofrecer un descuento, pregúntate:",
        "“¿Qué información tengo de que el precio es realmente el problema?”",
        "Si no tienes esa información, no bajes el precio todavía.",
        "Primero haz seguimiento.",
      ],
      notes: [
        "Por ejemplo: “¿Tienes alguna pregunta que te gustaría conversar antes de tomar una decisión?”",
        "Primero diagnostica. Después decides qué hacer.",
      ],
    },
    challenge:
      "Establece un proceso de seguimiento antes de ofrecer descuentos.",
    absence:
      "No aparecen señales claras de que recurras rápidamente a descuentos.",
  },
  {
    id: 5,
    title: "Te sientes un fraude cuando te pagan el precio completo",
    description:
      "Si un cliente te paga rápido y sin chistar tu tarifa más alta, en lugar de celebrarlo, sientes un hueco en el estómago. Piensas: “Ojalá cumpla sus expectativas”, y te sobre-exiges regalando horas extra o cosas que no estaban incluidas por puro sentimiento de culpa.",
    area: "IDENTIDAD / ENTREGA",
    summary:
      "Todavía no te sientes completamente merecedora de cobrar lo que cobras.",
    diagnosis:
      "Puede haber algo más profundo: ya subiste tu precio, pero tu identidad todavía no se ha puesto al día con ese precio.",
    detail: [
      "Aquí puede haber algo más profundo: ya subiste tu precio, pero tu identidad todavía no se ha puesto al día con ese precio.",
      "Has aprendido a sentirte segura cuando cobras poco porque ahí las expectativas también te parecen pequeñas. Pero cuando aceptan tu tarifa más alta, aparece: “¿Y si no cumplo?”",
      "Entonces empiezas a regalar horas, llamadas, extras o entregables para sentir que tienes que “compensar” lo que cobraste. El problema es que eso puede terminar haciendo que tu oferta sea menos rentable y más difícil de sostener.",
    ],
    action: {
      lead: "Define tus límites antes de vender. Haz una lista de:",
      items: [
        "Qué incluye tu oferta.",
        "Qué NO incluye.",
        "Cuántas horas / llamadas / interacciones contempla.",
        "Qué resultado estás comprometida a facilitar.",
        "Qué extras requieren un pago adicional.",
      ],
      notes: [
        "Y cuando el cliente compre, entrégale exactamente lo que prometiste con excelencia.",
        "No necesitas sobreentregar por culpa. Cumplir tu promesa vale más que regalar trabajo.",
      ],
    },
    challenge:
      "Revisa qué estás regalando después de la venta que realmente debería formar parte de tu oferta.",
    absence:
      "No aparecen señales claras de que sobreentregues para compensar el precio.",
  },
];

export const SIGNAL_IDS: SignalId[] = [1, 2, 3, 4, 5];

export const BANDS = {
  low: {
    title: "TU PRECIO PROBABLEMENTE NO SEA TU PRINCIPAL PROBLEMA",
    text: "Puedes estar teniendo otros desafíos de ventas, pero no aparecen señales claras de que estés reduciendo tu precio desde el miedo.",
    extra: [] as string[],
  },
  mid: {
    title: "ESTÁS NEGOCIANDO CONTRA TI MISMA",
    text: "Hay momentos en los que tu inseguridad está influyendo en cómo comunicas, sostienes o defiendes tu oferta.",
    extra: [] as string[],
  },
  high: {
    title: "TU PROBLEMA PROBABLEMENTE NO SEA “COBRO MUY CARO”",
    text: "Estás tomando decisiones comerciales desde el miedo a perder la venta.",
    extra: [
      "Cobrar menos no necesariamente hace que sea más fácil vender.",
      "A veces solamente hace que necesites venderle a más personas para conseguir el mismo resultado.",
    ],
  },
};

export const NEXT_LEVEL_HEADING = "Y ahora, mira hacia adelante:";
export const NEXT_LEVEL_QUESTION =
  "Si pudieras mejorar UNA sola cosa de tu negocio para llegar a tu siguiente nivel, ¿qué sería?";

export interface NextLevelOption {
  value: NextLevelGoal;
  label: string;
  reading?: string;
  action?: string;
}

export const NEXT_LEVEL_OPTIONS: NextLevelOption[] = [
  {
    value: "mejores-clientes",
    label: "Conseguir mejores clientes",
    reading:
      "Quizá no necesitas más clientes, sino atraer personas que valoren más lo que haces.",
    action:
      "Define qué características tiene el cliente que quieres atraer y revisa si hoy tu comunicación está hablándole específicamente a esa persona.",
  },
  {
    value: "cobrar-mas",
    label: "Cobrar más por lo que hago",
    reading:
      "Cobrar más no empieza necesariamente subiendo el precio; empieza aumentando el valor percibido y la claridad de tu oferta.",
    action:
      "Pregúntate: ¿Qué transformación concreta estoy vendiendo y qué tan claramente la estoy comunicando?",
  },
  {
    value: "comunicar-valor",
    label: "Comunicar mejor mi valor y diferenciarme",
    reading:
      "Si las personas no entienden rápidamente por qué elegirte a ti, probablemente tu experiencia todavía no se está traduciendo en una propuesta clara.",
    action:
      "Completa: “Ayudo a [tipo de cliente] a lograr [resultado] sin [problema/frustración].”",
  },
  {
    value: "vender-seguridad",
    label: "Vender con más seguridad y sin sentir que presiono",
    reading:
      "Puede que el problema no sea vender, sino sentir que vender significa convencer.",
    action:
      "En tu próxima conversación de venta, dedica más tiempo a diagnosticar que a explicar. Pregunta antes de ofrecer.",
  },
  {
    value: "oferta-clara",
    label: "Tener una oferta más clara y atractiva",
    reading:
      "Si tu oferta necesita demasiada explicación, puede que el problema esté en cómo está estructurada o comunicada.",
    action:
      "Describe tu oferta empezando por el resultado que consigue el cliente, no por todo lo que incluye.",
  },
  {
    value: "visibilidad",
    label: "Tener más visibilidad y posicionarme como referente",
    reading:
      "Tener conocimiento no garantiza ser percibida como referente. La autoridad también necesita hacerse visible.",
    action:
      "Elige un problema específico que dominas y empieza a crear contenido consistentemente alrededor de ese tema.",
  },
  { value: "otra", label: "Otra" },
];

export const OTHER_INPUT_LABEL = "Cuéntanos cuál";

export const REFLECTION_TITLE = "Antes de modificar tu precio";
export const REFLECTION_ITEMS = [
  {
    q: "¿Mi cliente entiende exactamente qué problema resuelvo?",
    note: "Si tienes que explicar durante 10 minutos todo lo que haces, probablemente tu propuesta todavía no está suficientemente clara.",
  },
  {
    q: "¿Mi oferta comunica una transformación o solamente una lista de entregables?",
    note: "“4 sesiones + WhatsApp + PDF + comunidad” describe lo que entregas. “Salir con una oferta lista para vender” comunica un resultado.",
  },
  {
    q: "¿Tengo evidencia que respalde el valor que prometo?",
    note: "Casos, testimonios, resultados, experiencia, metodología, credenciales, demostraciones o cualquier evidencia relevante.",
  },
  {
    q: "¿Estoy hablando con el cliente correcto para ese precio?",
    note: "Que una persona no pueda o no quiera pagar tu oferta no significa automáticamente que tu precio esté mal. Puede significar que no es tu comprador ideal.",
  },
  {
    q: "Si mi precio no cambiara, ¿qué tendría que mejorar para que mi oferta se perciba más valiosa?",
    note: "Esta es la pregunta que te obliga a buscar soluciones antes de recurrir al descuento.",
  },
];

export const PRICING_CLOSING_HEADLINE = [
  "No todo problema de ventas",
  "se soluciona bajando el precio.",
];
export const PRICING_CLOSING_LINES = [
  "A veces el problema está en cómo comunicas el valor.",
  "A veces está en tu oferta.",
  "A veces en tu posicionamiento.",
  "Y a veces, simplemente, estás intentando venderle a la persona equivocada.",
];
export const PRICING_CLOSING_CTA = [
  "Antes de cobrar menos,",
  "diagnostica qué está fallando.",
];

/** Acción de la semana cuando no se marcó ninguna señal y la meta es “Otra”. */
export const FALLBACK_WEEK_ACTION =
  "Escribe en una frase qué significaría avanzar en lo que indicaste y define una primera acción pequeña para esta semana.";

/** Texto que acompaña al botón de mentoría (solo se muestra con URL configurada). */
export const PRICING_MENTORIA_LEAD =
  "Si descubriste que tu problema no es simplemente “cobro caro”, sino que necesitas trabajar tu posicionamiento, tu oferta y la forma en que comunicas tu valor, puedes aplicar a una mentoría conmigo.";
