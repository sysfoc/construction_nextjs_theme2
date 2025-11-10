import Image from "next/image"

type CertCardProps = {
  title: string
  authority: string
  description?: string
  logoSrc: string
  logoAlt: string
}

export function CertCard({ title, authority, description, logoSrc, logoAlt }: CertCardProps) {
  return (
    <article className="border border-border rounded-none p-2 flex flex-col gap-2 leading-tight">
      {/* Logo strip - flush to container: no padding/margin between image and div */}
      <div className="h-10 w-full overflow-hidden relative">
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt={logoAlt}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-[var(--page-heading)] leading-tight">{title}</h3>
        <p className="text-xs text-[var(--paragraph-color)] leading-tight">{authority}</p>
        {description ? <p className="text-xs text-[var(--paragraph-color)] leading-tight">{description}</p> : null}
      </div>
    </article>
  )
}
