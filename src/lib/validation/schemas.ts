import { z } from "zod";
import { CHANGE_VALUES, SITUATION_VALUES } from "../../data/contact";

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .transform((s) => s.trim())
    .optional();

export const scalingAnswersSchema = z.object({
  stage: z.enum(["validando", "vendo", "crecer"]),
  mainBlocker: z.enum(["clientes", "convertir", "organizar"]),
  goal90Days: z.enum(["vender", "cobrar", "crecer-simple"]),
  want: z.enum(["si", "no"]),
  buy: z.enum(["si", "no"]),
  scale: z.enum(["si", "no"]),
  reflection: optionalText(600),
});

export const pricingAnswersSchema = z.object({
  signals: z
    .array(z.number().int().min(1).max(5))
    .max(10)
    .transform((arr) => Array.from(new Set(arr)).sort((a, b) => a - b)),
  nextLevelGoal: z.enum([
    "mejores-clientes",
    "cobrar-mas",
    "comunicar-valor",
    "vender-seguridad",
    "oferta-clara",
    "visibilidad",
    "otra",
  ]),
  nextLevelOther: optionalText(300),
});

const nameSchema = optionalText(80);

export const scalingPdfRequestSchema = z.object({
  name: nameSchema,
  answers: scalingAnswersSchema,
});

export const pricingPdfRequestSchema = z.object({
  name: nameSchema,
  answers: pricingAnswersSchema,
});

export const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z
      .string()
      .trim()
      .max(200)
      .optional()
      .transform((v) => v || undefined)
      .pipe(z.email().optional()),
    phone: z
      .string()
      .trim()
      .max(30)
      .optional()
      .transform((v) => v || undefined)
      .pipe(
        z
          .string()
          .regex(/^[+\d][\d\s().-]{5,}$/)
          .optional(),
      ),
    situation: z.enum(SITUATION_VALUES),
    desiredChange: z.enum(CHANGE_VALUES),
    question: z.string().trim().min(3).max(1000),
    consent: z.literal(true),
  })
  .refine((c) => Boolean(c.email || c.phone), {
    message: "Se necesita correo o teléfono",
  });

export const submissionRequestSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("scaling"),
    id: z.uuid(),
    answers: scalingAnswersSchema,
    contact: contactSchema,
  }),
  z.object({
    kind: z.literal("pricing"),
    id: z.uuid(),
    answers: pricingAnswersSchema,
    contact: contactSchema,
  }),
]);
