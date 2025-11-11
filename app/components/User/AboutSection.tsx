"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SlantedButton from "../General/buttons/SlantedButton";

export default function AboutSection() {
  const router = useRouter();
  return (
    <section className="w-full bg-background dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Full Width Content with Floating Images */}
        <div className="relative mb-8">
          {/* Floating Images on Left and Right */}
          <div className="hidden lg:block absolute left-20 top-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-10">
            <Image
              src="/home/safety-equipment-detail.jpg"
              alt="Construction"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute right-20 top-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-10">
            <Image
              src="/home/safety-briefing.jpg"
              alt="Construction"
              fill
              className="object-cover"
            />
          </div>

          {/* Center Content */}
          <div className="max-w-3xl mx-auto text-center px-4 lg:px-40 pt-4">
            <div className="inline-flex items-center gap-2 bg-header-text/10 dark:bg-gray-700 px-3 py-1.5 rounded-full mb-3">
              <div className="w-1.5 h-1.5 bg-header-text dark:bg-gray-200 rounded-full"></div>
              <span className="text-header-text dark:text-gray-200 text-[10px] font-semibold uppercase tracking-wide">
                Our Approach
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-extrabold text-header-text dark:text-gray-200 leading-tight mb-4">
              Building Partnerships for Success
            </h2>
            <p className="text-paragraph dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
              For each project, we carefully establish strong relationships with
              trusted partners who can contribute genuine value to the success
              of your project. By bringing together expertise from both the
              public and private sectors, we ensure a collaborative approach
              that enhances efficiency, quality, and long-term impact.
            </p>
          </div>
        </div>

        {/* Middle Section - Horizontal Stats Bar */}
        <div className="bg-gradient-to-r from-header-text/5 via-header-text/10 to-header-text/5 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-5 mb-8 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-header-text/20 dark:divide-gray-600">
            <div className="px-4 text-center">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl lg:text-3xl font-black text-header-text dark:text-gray-200">
                  10
                </span>
                <span className="text-lg font-bold text-header-text dark:text-gray-200">
                  +
                </span>
              </div>
              <h3 className="text-[10px] lg:text-xs font-bold text-header-text dark:text-gray-200 uppercase">
                Country
              </h3>
            </div>

            <div className="px-4 text-center">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl lg:text-3xl font-black text-header-text dark:text-gray-200">
                  15
                </span>
                <span className="text-lg font-bold text-header-text dark:text-gray-200">
                  +
                </span>
              </div>
              <h3 className="text-[10px] lg:text-xs font-bold text-header-text dark:text-gray-200 uppercase">
                Project
              </h3>
            </div>

            <div className="px-4 text-center">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl lg:text-3xl font-black text-header-text dark:text-gray-200">
                  50K
                </span>
              </div>
              <h3 className="text-[10px] lg:text-xs font-bold text-header-text dark:text-gray-200 uppercase">
                Happy
              </h3>
            </div>

            <div className="px-4 text-center">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl lg:text-3xl font-black text-header-text dark:text-gray-200">
                  10
                </span>
                <span className="text-lg font-bold text-header-text dark:text-gray-200">
                  +
                </span>
              </div>
              <h3 className="text-[10px] lg:text-xs font-bold text-header-text dark:text-gray-200 uppercase">
                Years
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Section - Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Awards Card 1 */}
          <div className="bg-gradient-to-br from-header-text/10 to-header-text/5 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-5 border-l-4 border-header-text dark:border-gray-200 shadow-md hover:shadow-xl transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-header-text/10 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Image
                  src="/About/constructionImage_04.png"
                  alt="Certified & Awards"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-header-text dark:text-gray-200 text-sm mb-1">
                  Certified & Awards
                </h3>
                <p className="font-semibold text-header-text/70 dark:text-gray-400 text-xs">
                  winner*
                </p>
              </div>
            </div>
            <p className="text-paragraph dark:text-gray-300 text-xs leading-relaxed">
              Recognized for excellence in construction and quality standards.
            </p>
            <div className="mt-5">
            <SlantedButton
              text="Certifications"
              onClick={() => router.push("/certifications")}
            />
            </div>
          </div>

          {/* Awards Card 2 */}
          <div className="bg-gradient-to-br from-header-text/10 to-header-text/5 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-5 border-l-4 border-header-text dark:border-gray-200 shadow-md hover:shadow-xl transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-header-text/10 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Image
                  src="/About/constructionImage_05.png"
                  alt="Best Quality"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-header-text dark:text-gray-200 text-sm mb-1">
                  Best Quality
                </h3>
                <p className="font-semibold text-header-text/70 dark:text-gray-400 text-xs">
                  Services*
                </p>
              </div>
            </div>
            <p className="text-paragraph dark:text-gray-300 text-xs leading-relaxed">
              Committed to delivering superior quality in every project.
            </p>
            <div className="mt-5">
            <SlantedButton
              text="Projects"
              onClick={() => router.push("/projects")}
            />
            </div>
          </div>

          {/* Large Image Card */}
          <div className="relative rounded-xl overflow-hidden shadow-xl h-full min-h-[200px]">
            <Image
              src="/home/interior-construction.jpg"
              alt="Construction"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
