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
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6">
      <div className="space-y-6">
        
        {/* First Section: Image Left, Content Right */}
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="relative h-80 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <Image 
              src="/home_page_images/construction (6).jpg" 
              alt="Construction team" 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-(--page-heading) dark:text-hero-heading">
                {data.firstHeading}
              </h2>
            </div>
            
            <p className="text-paragraph dark:text-paragraph text-sm leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout
            </p>

            <div className="space-y-2">
              {data.firstSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-header-text dark:text-header-text text-sm">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Section: Content Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Content */}
          <div className="space-y-3 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-(--page-heading) dark:text-hero-heading">
                {data.secondHeading}
              </h2>
            </div>

            <div className="space-y-2">
              {data.secondSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-header-text dark:text-header-text text-sm">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-80 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 order-1 lg:order-2">
            <Image 
              src="/home_page_images/construction (2).jpg" 
              alt="Construction workers" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>

      </div>
    </div>
  )
}