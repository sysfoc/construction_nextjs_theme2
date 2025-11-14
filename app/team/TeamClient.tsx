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
    <section className='py-10 min-h-96 bg-background'>
      <div className='container mx-auto px-4 sm:px-8'>
        
        <div className='text-center mb-8'>
          <div className="inline-block bg-primary/10 px-3 py-1 rounded mb-3">
            <span className='text-primary text-[10px] font-bold uppercase tracking-widest'>
              Great experience in building
            </span>
          </div>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-black text-(--page-heading)'>
            Professional Team
          </h2>
        </div>

        <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {teamData.map((team) => (
            <div 
              key={team.id} 
              className="group relative bg-background rounded-xl border-2 border-border hover:border-primary transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-72 bg-gradient-to-b from-primary/5 to-transparent flex items-center justify-center p-6">
                {team.photo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={team.photo}
                      alt={team.name}
                      fill
                      className='object-contain group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                )}
              </div>

              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 text-white'>
                <h3 className="text-sm font-bold mb-0.5">
                  {team.name}
                </h3>
                <p className="text-xs opacity-90">
                  {team.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}