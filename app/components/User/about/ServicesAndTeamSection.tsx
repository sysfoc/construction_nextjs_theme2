"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface ServicesData {
  services: ServiceItem[];
}

interface ServicesAndTeamSectionProps {
  data: ServicesData;
}

const teamMembers = [
  {
    img: "/Team/teamMember_01.png",
    name: "Marc Chiasson",
    role: "Head Railway Construction",
  },
  {
    img: "/Team/teamMember_02.png",
    name: "Marc Boucher",
    role: "Head Railway Construction",
  },
  {
    img: "/Team/teamMember_03.png",
    name: "Mitchel Johnson",
    role: "Head Railway Construction",
  },
];

export default function ServicesAndTeamSection({
  data,
}: ServicesAndTeamSectionProps) {
  if (!data || !data.services || data.services.length === 0) {
    return null;
  }

  return (
    <>
      {/* Services Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-5 lg:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-header-background dark:bg-header-background rounded-2xl p-4 sm:p-5 flex flex-col h-[350px] md:h-[300px] shadow-md hover:shadow-xl transition-all duration-300 border border-border dark:border-border overflow-hidden"
            >
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary"></div>
              
              {/* Icon/Image Container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center overflow-visible">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col text-center">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 leading-tight text-(--page-heading) dark:text-hero-heading">
                  {service.title}
                </h3>
                <p className="text-paragraph dark:text-paragraph text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>
              </div>

              {/* Button */}
              <Link
                href={service.buttonUrl || "#"}
                className="bg-primary text-primary-foreground w-full py-2.5 rounded-lg transition-all inline-flex items-center justify-center gap-2 group-hover:gap-3 font-semibold text-xs sm:text-sm"
              >
                <span>{service.buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4 lg:py-5 flex justify-center">
        <div className="flex flex-col sm:flex-row items-center bg-header-background dark:bg-header-background rounded-xl shadow-lg border border-border dark:border-border overflow-hidden max-w-3xl w-full">
          {/* Left Text */}
          <div className="flex-1 px-5 py-3 text-center sm:text-left">
            <span className="text-primary dark:text-primary font-bold text-sm sm:text-base">
              Offering High Quality Construction Solutions
            </span>
          </div>

          {/* Right Button */}
          <button className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 font-bold text-xs sm:text-sm hover:opacity-90 transition-all hover:scale-105 w-full sm:w-auto rounded-b-lg sm:rounded-none sm:rounded-r-xl">
            Build Your Dream Now
          </button>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative w-full h-[220px] dark:opacity-40">
          <Image
            src="/bgTeam.jpg"
            alt="Team Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>

        {/* Team Cards Section */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 -mt-40 py-5 lg:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center group w-full max-w-xs">
                {/* Card Container */}
                <div className="relative w-full bg-white dark:bg-header-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-64 w-full bg-background">
                    <div className="relative h-full w-full">
                      <Image
                        src={member.img || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="bg-background/90 px-4 py-3 text-center">
                    <h3 className="text-sm font-bold leading-tight text-paragraph mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs leading-snug text-paragraph/80">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}