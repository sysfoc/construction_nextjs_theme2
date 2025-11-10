import Image from "next/image"

type StepRowProps = {
  index: number
  title: string
  description: string
  imageSrc: string
}

export function StepRow({ index, title, description, imageSrc }: StepRowProps) {
  const isEven = index % 2 === 1
  const displayNum = String(index + 1).padStart(2, "0")

  return (
    <div
      className="relative border-t border-[var(--border-color,_var(--border))] pt-3 pb-2"
      aria-label={`Step ${index + 1}`}
    >
      <div className={`flex flex-col md:flex-row gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
        {/* Number Badge - Absolute positioned on desktop */}
        <div className="flex md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 md:-translate-y-1/2 md:z-10 justify-start md:justify-center mb-2 md:mb-0">
          <div className="inline-flex items-center justify-center min-w-[60px] h-[60px] md:min-w-[70px] md:h-[70px] border-2 border-[var(--border-color,_var(--border))] bg-[var(--background)] rounded-full">
            <span className="text-[var(--primary)] text-2xl md:text-3xl font-bold">
              {displayNum}
            </span>
          </div>
        </div>

        {/* Content Card */}
        <div className="flex-1 flex flex-col md:flex-row gap-3 border border-[var(--border-color,_var(--border))] rounded-lg p-3 bg-[var(--background)]">
          {/* Image Section */}
          <div className="w-full md:w-[45%] flex-shrink-0">
            <div className="relative w-full aspect-video border border-[var(--border-color,_var(--border))] rounded overflow-hidden bg-gray-50 dark:bg-gray-900">
              <Image src={imageSrc || "/placeholder.svg"} alt="" fill className="object-cover" />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex-1 flex flex-col justify-center gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[var(--primary)]"></div>
              <h3 className="text-[var(--page-heading,_var(--foreground))] text-base md:text-lg font-semibold leading-tight">
                {title}
              </h3>
            </div>
            <p className="text-[var(--paragraph-color,_var(--foreground))] text-xs md:text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}