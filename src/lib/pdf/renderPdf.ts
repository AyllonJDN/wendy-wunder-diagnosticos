import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { computePricing, normalizeSignals } from "../diagnostics/pricing";
import { computeScaling } from "../diagnostics/scaling";
import type {
  DiagnosticKind,
  PricingAnswers,
  ScalingAnswers,
} from "../../types";
import { PricingPdf } from "./PricingPdf";
import { ScalingPdf } from "./ScalingPdf";

export const PDF_FILENAMES: Record<DiagnosticKind, string> = {
  scaling: "wendy-wunder-antes-de-escalar.pdf",
  pricing: "wendy-wunder-precio-y-valor.pdf",
};

export function todayLabel(): string {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  }).format(new Date());
}

export type PdfInput =
  | { kind: "scaling"; answers: ScalingAnswers; name?: string }
  | {
      kind: "pricing";
      answers: Omit<PricingAnswers, "signals"> & { signals: number[] };
      name?: string;
    };

/**
 * Único punto de generación del PDF. La ruta de descarga y el correo llaman
 * a esta misma función, así que el archivo es idéntico en ambos casos.
 */
export async function renderDiagnosticPdf(input: PdfInput): Promise<Buffer> {
  const date = todayLabel();
  if (input.kind === "scaling") {
    const result = computeScaling(input.answers);
    return renderToBuffer(
      createElement(ScalingPdf, {
        result,
        name: input.name,
        date,
      }) as unknown as ReactElement<DocumentProps>,
    );
  }
  const result = computePricing({
    ...input.answers,
    signals: normalizeSignals(input.answers.signals),
  });
  return renderToBuffer(
    createElement(PricingPdf, {
      result,
      name: input.name,
      date,
    }) as unknown as ReactElement<DocumentProps>,
  );
}
