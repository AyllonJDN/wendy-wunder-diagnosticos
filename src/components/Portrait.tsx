import Image from "next/image";

export function Portrait({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="bg-brand-gradient absolute -bottom-3 -right-3 h-full w-full"
        />
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper">
          <Image
            src="/wendy.png"
            alt="Retrato de Wendy Wünder"
            fill
            priority={priority}
            sizes="(min-width: 1024px) 340px, 240px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <figcaption className="label relative mt-6 flex items-center gap-3 text-ink">
        <span className="bg-brand-gradient inline-block h-[3px] w-8" />
        Wendy Wünder
      </figcaption>
    </figure>
  );
}
