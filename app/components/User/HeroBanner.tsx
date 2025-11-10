import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";

export default function HeroBanner() {
  const { settings } = useGeneralSettings();
  
  return (
    <div className="relative max-w-5xl z-20 mr-auto -mt-8">
      {/* Background with diagonal cut */}
      <div className="bg-background clip-diagonal">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-4">
          {/* Email Section (hidden below md) - Now First */}
          <div className="hidden md:flex items-center gap-3 flex-shrink min-w-0 max-w-xs">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-400 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">
                Send us mail
              </p>
              <p className="text-xs md:text-sm font-bold text-primary break-words overflow-hidden">
                {settings?.email}
              </p>
            </div>
          </div>

          {/* Location Section (hidden on small screens) - Now Second */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink min-w-0 max-w-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-400 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">
                Our location
              </p>
              <p className="text-xs sm:text-sm font-bold text-primary break-words overflow-hidden">
                {settings?.address}
              </p>
            </div>
          </div>

          {/* Experience Section - Now Last */}
          <div className="flex items-end gap-[3px] flex-shrink-0 mr-20 sm:mr-24">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-none relative pr-3">
              25
              <span className="absolute bottom-1 right-0 text-lg">+</span>
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] sm:text-xs font-semibold text-paragraph uppercase tracking-wide">
                Years of
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-paragraph uppercase">
                Experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Worker Image OUTSIDE of clip-diagonal - Now on Right */}
      <div className="absolute top-0 right-0 -mt-10 mr-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 z-20">
        <Image
          src="/Herosection/constructionImage_02.png"
          alt="Construction worker"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}