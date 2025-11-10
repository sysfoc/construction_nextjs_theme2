"use client";
import React, { useEffect, useState } from "react";
import { Users, Award, Shield, Clock } from "lucide-react";

interface ProjectCardProps {
  imageSrc: string;
  title: string;
  description: string;
  budget: string;
  duration: string;
  certifications: string[];
  imagePosition: "left" | "right";
}

interface Stat {
  id: string;
  statKey: string;
  value: string;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const STAT_LABELS: Record<string, string> = {
  activePartnerships: "Active Partnerships",
  projectValue: "Combined Project Value",
  safetyCompliance: "Safety Compliance Rate",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  title,
  description,
  duration,
  certifications,
}) => {
  return (
    <div className="relative group">
      {/* Image with overlay */}
      <div className="relative h-72 overflow-hidden rounded-t">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="text-xs text-white font-medium">{duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
              <Shield className="w-3.5 h-3.5 text-white" />
              <span className="text-xs text-white font-medium">ISO 45001</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content below image */}
      <div className="bg-background/90 p-4 rounded-b border-x border-b border-[var(--border-color)]">
        <p className="text-sm text-[var(--paragraph-color)] mb-3 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((cert, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-background text-xs font-medium text-[var(--paragraph-color)] rounded-full border border-[var(--border-color)]"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnersClient: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchData();
    checkVisibility();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/partners");
      const data = await response.json();
      setStats(data.stats || []);
      setPartners(data.partners || []);
    } catch (error) {
      console.error("Error fetching partners data:", error);
    } finally {
      setPartnersLoading(false);
    }
  };

  const checkVisibility = async () => {
    const visible = true;
    setIsVisible(visible);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner with Background Pattern */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)',
            color: 'var(--primary)'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--primary)]/10 rounded-full mb-3">
              <Users className="w-7 h-7 text-[var(--primary)]" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--page-heading)] mb-3">
              Strategic Partnerships
            </h2>
            <p className="text-sm text-[var(--paragraph-color)] leading-relaxed mb-6">
              We forge strategic alliances with industry-leading construction firms, engineering consultancies, and infrastructure developers. Our partnership framework emphasizes collaborative project delivery, risk mitigation, and value engineering to achieve superior outcomes.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.id} className="relative bg-background/90 backdrop-blur-sm rounded border border-[var(--border-color)] p-3 text-center group hover:border-[var(--primary)] transition-colors">
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Award className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="text-2xl font-bold text-[var(--page-heading)] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--paragraph-color)] leading-tight">
                  {STAT_LABELS[stat.statKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Ticker Section */}
      <section className="py-5 bg-background/90 border-y border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-[var(--primary)]"></div>
            <h3 className="text-xs font-bold text-[var(--paragraph-color)] uppercase tracking-widest">
              Trusted Partners
            </h3>
            <div className="h-px w-12 bg-[var(--primary)]"></div>
          </div>

          {partnersLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-[var(--paragraph-color)] text-sm">Loading Partners...</p>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee">
                {partners.map((p) => (
                  <div key={p.id} className="flex-shrink-0 mx-6">
                    <div className="w-28 h-20 bg-white rounded border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow p-3 flex items-center justify-center relative">
                      <img
                        src={p.logo || "/placeholder.svg"}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="mt-2 text-xs text-[var(--paragraph-color)] font-medium text-center">
                      {p.name}
                    </p>
                  </div>
                ))}
                {partners.map((p) => (
                  <div key={`${p.id}-dup`} className="flex-shrink-0 mx-6">
                    <div className="w-28 h-20 bg-white rounded border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow p-3 flex items-center justify-center relative">
                      <img
                        src={p.logo || "/placeholder.svg"}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="mt-2 text-xs text-[var(--paragraph-color)] font-medium text-center">
                      {p.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `}</style>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[var(--page-heading)] mb-2">
            Featured Collaborative Projects
          </h3>
          <div className="w-16 h-1 bg-[var(--primary)] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            imageSrc="/partners/construction01 (1).png"
            title="Underground Infrastructure Development"
            description="Collaborating with tunnel engineering firms, we execute complex underground infrastructure projects including metro systems, and utility corridors."
            budget="$12 million"
            duration="24 Months"
            certifications={["ISO 9001", "LEED Certified", "BIM Level 2"]}
            imagePosition="right"
          />

          <ProjectCard
            imageSrc="/partners/construction01 (2).png"
            title="Commercial & High-Rise Construction"
            description="Partnering with renowned architectural firms and structural engineers, we deliver landmark commercial buildings and high-rise developments."
            budget="$12 million"
            duration="18 Months"
            certifications={["OSHA Compliant", "Green Building", "Quality Assured"]}
            imagePosition="left"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnersClient;