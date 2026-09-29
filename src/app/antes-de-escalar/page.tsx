import type { Metadata } from "next";
import { ScalingTool } from "@/components/ScalingTool";

export const metadata: Metadata = {
  title: "6 preguntas antes de escalar cualquier idea · WENDY WÜNDER",
  description:
    "El filtro para saber si tu producto está listo para crecer o si todavía necesitas validarlo.",
};

export default function Page() {
  return <ScalingTool />;
}
