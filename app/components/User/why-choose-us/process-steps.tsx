"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Step {
  _id: string
  title: string
  description: string
  iconSrc: string
  isReversed: boolean
  order: number
}

interface StepProps {
  number: string
  title: string
  description: string
  iconSrc: string
  isReversed?: boolean
}

const StepCard: React.FC<StepProps> = ({ number, title, description, iconSrc, isReversed = false }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {isReversed ? (
          <>
            {/* Icon at top */}
            <div className="mb-8 mt-12">
              <Image
                src={iconSrc || "/placeholder.svg"}
                alt={title}
                width={52}
                height={52}
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* Orange horizontal line */}
            <div className="w-28 h-[3px] bg-[var(--primary)] mb-8"></div>

            {/* Content at bottom */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-[var(--page-heading)] mb-4 dark:text-[var(--foreground)]">
                {title}
              </h3>
              <p className="text-sm text-[var(--paragraph-color)] leading-relaxed px-2">{description}</p>
            </div>
          </>
        ) : (
          <>
            {/* Content at top */}
            <div className="text-center mt-12 mb-8">
              <h3 className="text-xl font-bold text-[var(--page-heading)] mb-4 dark:text-[var(--foreground)]">
                {title}
              </h3>
              <p className="text-sm text-[var(--paragraph-color)] leading-relaxed px-2">{description}</p>
            </div>

            {/* Orange horizontal line */}
            <div className="w-28 h-[3px] bg-[var(--primary)] mb-8"></div>

            {/* Icon at bottom */}
            <div>
              <Image
                src={iconSrc || "/placeholder.svg"}
                alt={title}
                width={52}
                height={52}
                className="w-12 h-12 object-contain"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export const ProcessSteps: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch("/api/why-choose-us")
        const data = await response.json()
        setSteps(data)
      } catch (error) {
        console.error("Failed to fetch steps:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSteps()
  }, [])

  if (loading) {
    return (
      <div className="w-full bg-[var(--background)] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center text-[var(--paragraph-color)]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[var(--background)] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dotted connecting lines */}
        <div className="relative hidden lg:block">
          <svg className="absolute top-40 left-0 w-full h-24 pointer-events-none z-[1]">
            <path
              d="M 200 50 Q 350 10, 500 50 Q 650 90, 800 50"
              stroke="var(--border-color)"
              strokeWidth="2"
              strokeDasharray="4,6"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10 justify-items-center">
          {steps.map((step, index) => (
            <StepCard
              key={step._id}
              number={String(index + 1).padStart(2, "0")}
              title={step.title}
              description={step.description}
              iconSrc={step.iconSrc}
              isReversed={step.isReversed}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
