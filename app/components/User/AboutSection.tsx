'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import SlantedButton from "../General/buttons/SlantedButton";

export default function AboutSection() {
  const router = useRouter();
  return (
    <section className="w-full bg-background dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-10">
          
          {/* Left Side - Content First */}
          <div className="space-y-4 order-2 lg:order-1">
            {/* Heading */}
            <div className="mb-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-header-text dark:text-gray-200 mb-2">
                Building Partnerships for Success
              </h2>
              <div className="w-20 h-1 bg-header-text dark:bg-gray-200"></div>
            </div>

            {/* Description */}
            <div className="bg-background dark:bg-gray-900 rounded-lg p-3 border-l-4 border-header-text dark:border-gray-200">
              <p className="text-paragraph dark:text-gray-300 text-sm leading-relaxed">
                For each project, we carefully establish strong relationships with
                trusted partners who can contribute genuine value to the success
                of your project. By bringing together expertise from both the
                public and private sectors, we ensure a collaborative approach
                that enhances efficiency, quality, and long-term impact. Our focus
                is not only on completing the work but also on creating
                sustainable solutions that add lasting value for our clients and
                communities.
              </p>
            </div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Certified & Awards */}
              <div className="flex flex-col items-center text-center p-3 bg-background dark:bg-gray-900 rounded-lg border border-header-text/20 dark:border-gray-700 hover:border-header-text dark:hover:border-gray-200 transition-all duration-300">
                <div className="w-9 h-9 relative mb-1">
                  <Image
                    src="/About/constructionImage_04.png"
                    alt="Certified & Awards"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-header-text dark:text-gray-200 text-base mb-1">
                  Certified & Awards
                </h3>
                <p className="font-semibold text-header-text dark:text-gray-300 text-xs">winner*</p>
              </div>

              {/* Best Quality Services */}
              <div className="flex flex-col items-center text-center p-3 bg-background dark:bg-gray-900 rounded-lg border border-header-text/20 dark:border-gray-700 hover:border-header-text dark:hover:border-gray-200 transition-all duration-300">
                <div className="w-9 h-9 relative mb-1">
                  <Image
                    src="/About/constructionImage_05.png"
                    alt="Best Quality Services"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-header-text dark:text-gray-200 text-base mb-1">
                  Best Quality
                </h3>
                <p className="font-semibold text-header-text dark:text-gray-300 text-xs">Services*</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start pt-2 gap-3">
              <SlantedButton text="Testimonials" onClick={() => router.push("/testimonials")}/>
              <SlantedButton text="Our Partners" onClick={() => router.push("/partners")}/>
            </div>
          </div>

          {/* Right Side - Images Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Top Left Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/home_page_images/construction (3).jpg"
                  alt="Construction workers"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Top Right Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/home_page_images/construction (8).jpg"
                  alt="Construction workers overlap"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Bottom Spanning Image */}
              <div className="relative col-span-2 aspect-[2/1] rounded-lg overflow-hidden">
                <Image
                  src="/home_page_images/construction (2).jpg"
                  alt="Construction workers bottom overlap"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Compact and at bottom */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 my-10">
          {/* Stat 1 */}
          <div className="bg-background dark:bg-gray-900 rounded-lg p-2 border-t-4 border-header-text dark:border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-2xl lg:text-3xl font-bold text-header-text dark:text-gray-200 stroke-text">
                10
              </span>
              <span className="text-xl lg:text-2xl font-bold text-header-text dark:text-gray-200">
                +
              </span>
            </div>
            <h3 className="text-sm lg:text-base font-bold text-header-text dark:text-gray-200 mb-1">
              COUNTRY
            </h3>
            <p className="text-xs text-paragraph dark:text-gray-300">
              Construction Simulator
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-background dark:bg-gray-900 rounded-lg p-2 border-t-4 border-header-text dark:border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-2xl lg:text-3xl font-bold text-header-text dark:text-gray-200 stroke-text">
                15
              </span>
              <span className="text-xl lg:text-2xl font-bold text-header-text dark:text-gray-200">
                +
              </span>
            </div>
            <h3 className="text-sm lg:text-base font-bold text-header-text dark:text-gray-200 mb-1">
              PROJECT
            </h3>
            <p className="text-xs text-paragraph dark:text-gray-300">
              Construction Simulator
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-background dark:bg-gray-900 rounded-lg p-2 border-t-4 border-header-text dark:border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-2xl lg:text-3xl font-bold text-header-text dark:text-gray-200 stroke-text">
                50K
              </span>
            </div>
            <h3 className="text-sm lg:text-base font-bold text-header-text dark:text-gray-200 mb-1">
              HAPPY
            </h3>
            <p className="text-xs text-paragraph dark:text-gray-300">
              Professional Experience
            </p>
          </div>

          {/* Stat 4 */}
          <div className="bg-background dark:bg-gray-900 rounded-lg p-2 border-t-4 border-header-text dark:border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-2xl lg:text-3xl font-bold text-header-text dark:text-gray-200 stroke-text">
                10
              </span>
              <span className="text-xl lg:text-2xl font-bold text-header-text dark:text-gray-200">
                +
              </span>
            </div>
            <h3 className="text-sm lg:text-base font-bold text-header-text dark:text-gray-200 mb-1">
              YEARS
            </h3>
            <p className="text-xs text-paragraph dark:text-gray-300">
              Professional Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}