"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ArticleContent({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const collapsedMax = 220 // px
  const [fullHeight, setFullHeight] = useState<number | null>(null)

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current
      el.style.maxHeight = "none"
      const h = el.scrollHeight
      el.style.removeProperty("max-height")
      setFullHeight(h)
    }
  }, [paragraphs])

  const hasOverflow = useMemo(() => {
    if (fullHeight == null) return paragraphs.length > 2
    return fullHeight > collapsedMax + 8
  }, [fullHeight, paragraphs.length])

  // Dynamically update CSS variable instead of inline style
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.setProperty(
        "--max-h",
        expanded ? (fullHeight ? `${fullHeight}px` : "2000px") : `${collapsedMax}px`
      )
    }
  }, [expanded, fullHeight])

  return (
    <div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        aria-expanded={expanded}
      >
        <div className="content-inner space-y-3">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-[15px] leading-6 text-foreground">
              {para}
            </p>
          ))}
        </div>
      </div>

      {hasOverflow && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background text-foreground text-sm px-3 py-1.5"
            aria-controls="article-content"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp size={16} aria-hidden="true" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={16} aria-hidden="true" />
                Show more
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
