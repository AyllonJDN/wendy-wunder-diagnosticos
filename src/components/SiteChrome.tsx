import Link from "next/link";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      {/* WÜNDER vertical: recurso gráfico solo en desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-4 top-1/2 z-0 hidden -translate-y-1/2 lg:block xl:left-8"
      >
        <span
          className="font-display block select-none font-black leading-none tracking-[0.12em]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "min(5.5rem, 11vh)",
            color: "transparent",
            WebkitTextStroke: "1px #d9d9d5",
          }}
        >
          WÜNDER
        </span>
      </div>

      <header className="relative z-10 border-b border-ink">
        <div className="mx-auto flex max-w-6xl items-end justify-between px-5 pb-3 pt-5 sm:px-8 lg:pl-28">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-[0.28em] sm:text-2xl"
          >
            WENDY WÜNDER
          </Link>
          <span className="label hidden text-grey sm:block">Herramientas</span>
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      <footer className="relative z-10 mt-24 border-t border-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:pl-28">
          <span className="font-display text-base font-bold tracking-[0.28em]">
            WENDY WÜNDER
          </span>
          <span className="text-sm text-grey">
            Herramientas para decidir mejor sobre crecimiento, ventas y valor.
          </span>
        </div>
      </footer>
    </>
  );
}
