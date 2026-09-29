import { ArrowUpRight } from "./icons";

const LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/wendywunderoficial/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wendywunder/" },
  { label: "YouTube", href: "https://www.youtube.com/@wendywunderoficial" },
];

/** Bloque editorial discreto. `compact` para el footer. */
export function SocialLinks({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <nav aria-label="Redes sociales de Wendy Wünder" className={className}>
      <div
        className={
          compact
            ? "flex flex-wrap items-center gap-x-6 gap-y-2"
            : "flex flex-col gap-4 border-t border-ink pt-6 sm:flex-row sm:items-center sm:justify-between"
        }
      >
        <p className="label flex items-center gap-3">
          <span
            className="bg-brand-gradient inline-block h-[3px] w-8"
            aria-hidden="true"
          />
          Sigue a Wendy Wünder
        </p>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label group inline-flex min-h-11 items-center gap-1.5 border-b-2 border-transparent transition-colors duration-200 hover:border-magenta hover:text-magenta"
              >
                {l.label}
                <ArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
