import type React from "react";
import Image from "next/image";
import Link from "next/link";

export const BannerSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[240px] md:min-h-[280px] lg:min-h-[340px] overflow-hidden my-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/whyChooseUs/bg.jpg"
          alt="Background"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto h-full min-h-[240px] md:min-h-[280px] lg:min-h-[340px] px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 xl:gap-20">
          {/* Workers Image */}
          <div className="relative w-full lg:w-[40%] flex justify-center lg:justify-start">
            <div className="relative w-2/3 sm:w-[230px] md:w-[260px] lg:w-[300px] aspect-[4/5]">
              <Image
                src="/whyChooseUs/workers.png"
                alt="Construction Workers"
                fill
                className="object-contain object-bottom"
                priority
              />

              {/* 25 Years Badge */}
              <div className="absolute bottom-4 left-4 bg-[var(--background)] rounded-full px-3 sm:px-6 sm:py-3 py-2 shadow-xl border border-[var(--border-color)]">
                <div className="flex gap-1 leading-tight">
                  <div className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[var(--primary)]">
                    25
                  </div>
                  <div className="text-[10px] text-start md:text-xs font-semibold text-[var(--paragraph-color)] uppercase tracking-widest">
                    Years of
                    <br />
                    <span className="text-xs sm:text-2xl">Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-[50%] pb-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div>
              <p className="text-sm md:text-base mb-4 md:mb-5 leading-relaxed text-white">
                Our development center offers the best
                <br className="hidden lg:block" />
                expertise and reliable resources.
              </p>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-5 mb-5">
                {/* Stat 1 */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/serviceDetail/serviceDetail_01.png"
                    alt="Quality assurance"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-bold text-[var(--primary)]">
                      434+
                    </div>
                    <div className="text-[10px] md:text-xs text-white">
                      Quality assurance
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/serviceDetail/serviceDetail_02.png"
                    alt="Projects"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-bold text-[var(--primary)]">
                      60+
                    </div>
                    <div className="text-[10px] md:text-xs text-white">
                      Completed Projects
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <Link href="/about">
                <button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-semibold px-5 md:px-6 py-2 rounded transition duration-300 uppercase text-[10px] md:text-xs tracking-wide">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
