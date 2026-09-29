import { z } from "zod";

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
