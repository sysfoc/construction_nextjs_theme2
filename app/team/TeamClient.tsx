"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string | null;
}

export default function TeamClient() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("team");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await fetch("/api/team", { cache: "no-store" });
        if (!res.ok) {
          setTeamData([]);
          return;
        }
        const data = await res.json();
        setTeamData(data.teamMembers || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setTeamData([]);
      }
    }

    fetchTeamMembers();
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <section className='py-12 lg:py-16 min-h-96'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-10'>
          {/* Header Section */}
          <div className='text-center mb-10'>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className='text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide'>
                Great experience in building
              </span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--page-heading) dark:text-white'>
              Professional Team
            </h2>
          </div>

          {/* Team Grid */}
          <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {teamData.map((team) => (
              <div 
                key={team.id} 
                className="group flex flex-col items-center w-full max-w-sm mx-auto"
              >
                {/* Card Container */}
                <div className="relative w-full bg-background dark:bg-header-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-80 w-full bg-background flex items-center justify-center">
                    {team.photo ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={team.photo}
                          alt={`${team.name}-img`}
                          fill
                          className='object-contain p-4'
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-12 h-12 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Card */}
                  <div className='bg-primary text-primary-foreground px-5 py-4 text-center'>
                    <h3 className="text-base font-bold leading-tight mb-1">
                      {team.name}
                    </h3>
                    <p className="text-sm leading-snug">
                      {team.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}