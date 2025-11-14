"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Calendar, DollarSign, ArrowRight, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { isPageVisible } from "@/lib/api/pageVisibility";
import Loader from "../components/General/Loader";

interface Job {
  id: string;
  image: string | null;
  title: string;
  location: string;
  deadline: string;
  payRange: string;
  description: string;
  jobType: string;
}

const CareerCard: React.FC<Job & { onApply: (title: string) => void }> = ({
  image,
  title,
  location,
  deadline,
  payRange,
  description,
  jobType,
  onApply,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("careers");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-[var(--background)] dark:bg-gray-900 rounded-xl border border-[var(--border-color)] dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)] group overflow-hidden">
      <div className="flex items-stretch">
        {/* Left - Image Section */}
        <div className="w-24 flex-shrink-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 flex items-center justify-center p-4 relative">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-[var(--primary)]/30">
            {image ? (
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Right - Content Section */}
        <div className="flex-1 p-4 flex flex-col min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-base font-bold text-[var(--foreground)] dark:text-gray-100 group-hover:text-[var(--primary)] transition-colors line-clamp-1 flex-1">
              {title}
            </h3>
            <span className="px-2.5 py-0.5 text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 rounded-full whitespace-nowrap">
              {jobType}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3 text-xs">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="text-[var(--paragraph-color)] dark:text-gray-400">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="text-[var(--paragraph-color)] dark:text-gray-400">{deadline}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="text-[var(--paragraph-color)] dark:text-gray-400 font-medium">{payRange}</span>
            </div>
          </div>

          <p className="text-xs text-[var(--paragraph-color)] dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>

          <button
            onClick={() => onApply(title)}
            className="self-end bg-[var(--primary)] hover:bg-opacity-90 text-[var(--primary-foreground)] dark:text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-all duration-300 flex items-center gap-1.5 group/btn"
          >
            APPLY NOW
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CareersClient: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/careers");
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobTitle: string) => {
    router.push(`/jobs/apply?position=${encodeURIComponent(jobTitle)}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] dark:bg-gray-950 p-4 py-10 lg:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-start mt-20 justify-center min-h-screen">
            <Loader />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No job openings available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <CareerCard key={job.id} {...job} onApply={handleApply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersClient;