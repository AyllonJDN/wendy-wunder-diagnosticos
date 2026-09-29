import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { Portrait } from "@/components/Portrait";

const TOOLS = [
  {
    n: "01",
    title: "6 preguntas antes de escalar cualquier idea",
    text: "El filtro para saber si tu producto está listo para crecer o si todavía necesitas validarlo.",
    cta: "Empezar diagnóstico",
    href: "/antes-de-escalar",
  },
  {
    n: "02",
    title: "¿Tu precio refleja tu valor?",
    text: "5 señales de que estás cobrando desde el miedo y no desde tu posicionamiento.",
    cta: "Hacer diagnóstico",
    href: "/precio-y-valor",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pl-28 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="rise">
            <p className="label mb-8 flex items-center gap-3">
              <span className="bg-brand-gradient inline-block h-[3px] w-10" />
              Wendy Wünder · Herramientas
            </p>
            <h1 className="font-display text-[2.9rem] font-black leading-[1.02] sm:text-7xl lg:text-[5.4rem]">
              Haz <span className="text-brand-gradient italic">visible</span> lo
              que necesitas elevar.
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-grey">
              Recursos prácticos para tomar mejores decisiones sobre
              crecimiento, ventas y valor.
            </p>
          </div>
          <div className="rise mx-auto w-full max-w-[240px] lg:mx-0 lg:max-w-none lg:pt-6">
            <Portrait priority />
          </div>
        </div>
      </section>

      <section
        aria-label="Herramientas"
        className="mx-auto max-w-6xl px-5 sm:px-8 lg:pl-28"
      >
        {TOOLS.map((t, i) => (
          <article
            key={t.n}
            className={`grid gap-6 border-t border-ink py-10 sm:grid-cols-[auto_1fr] sm:gap-12 sm:py-14 ${
              i === TOOLS.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="font-display text-7xl font-black leading-none text-brand-gradient sm:text-[8rem]">
              {t.n}
            </span>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 text-lg text-grey">{t.text}</p>
              <Link href={t.href} className="btn mt-8 w-full sm:w-auto">
                {t.cta}
                <ArrowIcon />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
