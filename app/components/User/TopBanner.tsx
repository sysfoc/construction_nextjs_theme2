"use client";
import { Mail, MapPin, Zap } from "lucide-react";
import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";

export default function TopBanner() {
  const { settings } = useGeneralSettings();

  return (
    <div>
      <div className="bg-black hidden sm:block text-primary-foreground py-2 px-4 lg:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <Zap className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-xs sm:text-sm text-center sm:text-left">
              We Will go through all the stages of construction
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm text-center sm:text-left">
                {settings?.address}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm">
                {settings?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}