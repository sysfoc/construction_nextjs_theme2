"use client"
import Image from "next/image"

interface WhatWeDoData {
  firstHeading: string
  firstSteps: string[]
  secondHeading: string
  secondSteps: string[]
}

interface WhatWeDoSectionProps {
  data: WhatWeDoData
}

export default function WhatWeDoSection({ data }: WhatWeDoSectionProps) {
  if (!data || !data.firstHeading) {
    return null
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        {/* Left Images Grid */}
        <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1">
          <div className="absolute top-0 left-12 w-[75%] sm:w-[90%] h-[55%] rounded-3xl overflow-hidden z-10">
            <Image src="/team_02.png" alt="Construction team meeting" fill className="object-contain" />
          </div>
          <div className="absolute top-[40%] right-[40%] lg:top-[45%] lg:right-[50%] w-[50%] h-[40%] rounded-3xl overflow-hidden z-20">
            <Image src="/team_03.png" alt="Construction workers" fill className="object-contain" />
          </div>
          <div className="absolute top-[65%] right-[20%] lg:top-[70%] lg:right-[20%] w-[50%] h-[35%] overflow-hidden z-30">
            <Image src="/team_04.png" alt="Construction worker" fill className="object-contain" />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full order-1 lg:order-2 space-y-5">
          {/* First Section Card */}
          <div className="bg-header-background dark:bg-header-background rounded-xl p-5 border-l-4 border-primary shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-(--page-heading) dark:text-hero-heading leading-tight">
                  {data.firstHeading}
                </h2>
              </div>
            </div>
            
            <p className="text-paragraph dark:text-paragraph text-xs sm:text-sm leading-relaxed mb-3 pl-13">
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout
            </p>

            <div className="space-y-2 pl-13">
              {data.firstSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-2.5 group">
                  <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-foreground"></div>
                  </div>
                  <span className="text-header-text dark:text-header-text text-xs sm:text-sm leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Section Card */}
          <div className="bg-gradient-to-br from-header-background to-header-background/70 dark:from-header-background dark:to-header-background/70 rounded-xl p-5 border-l-4 border-primary shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-(--page-heading) dark:text-hero-heading leading-tight">
                  {data.secondHeading}
                </h2>
              </div>
            </div>

            <div className="space-y-2 pl-13">
              {data.secondSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-2.5 group">
                  <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-foreground"></div>
                  </div>
                  <span className="text-header-text dark:text-header-text text-xs sm:text-sm leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}