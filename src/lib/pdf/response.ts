import { PDF_FILENAMES, renderDiagnosticPdf, type PdfInput } from "./renderPdf";

export async function pdfResponse(input: PdfInput): Promise<Response> {
  const buffer = await renderDiagnosticPdf(input);
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${PDF_FILENAMES[input.kind]}"`,
      "Cache-Control": "no-store",
    },
  });
}

export function friendlyError(status: number, message: string): Response {
  return Response.json({ ok: false, message }, { status });
}
