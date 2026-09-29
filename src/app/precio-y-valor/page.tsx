import type { Metadata } from "next";
import { PricingTool } from "@/components/PricingTool";

export const metadata: Metadata = {
  title: "¿Tu precio refleja tu valor? · WENDY WÜNDER",
  description:
    "5 señales de que estás cobrando desde el miedo y no desde tu posicionamiento.",
};

export default function Page() {
  return <PricingTool />;
}
