"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  FolderKanban,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProjectData } from "@/lib/models/Project";
import SlantedButton from "../General/buttons/SlantedButton";
import Loader from "../General/Loader";

const statusConfig = {
  ongoing: {
    label: "Ongoing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    dotColor: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    dotColor: "bg-green-500",
  },
  upcoming: {
    label: "Upcoming",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    dotColor: "bg-amber-500",
  },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "ongoing" | "completed" | "upcoming"
  >("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (
    filter: "all" | "ongoing" | "completed" | "upcoming"
  ) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredProjects(projects.slice(0, 3));
    } else {
      const filtered = projects.filter((p) => p.status === filter);
      setFilteredProjects(filtered.slice(0, 3));
    }
  };

  // Helper function to format date from YYYY-MM-DD to readable format
const formatDateForDisplay = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

  if (loading) {
    return (
      <Loader height="594px"/>
    );
  }

  return (
    <section className="px-6 max-w-6xl mx-auto py-8 min-h-[594px]">
      {/* Top Bar with Filter and Button */}
      <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4 mb-8">
        {/* Filter Tabs */}
        <div className="w-fit flex items-center flex-wrap gap-2 bg-background px-2 py-1 rounded-lg">
          {(["all", "ongoing", "completed", "upcoming"] as const).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`px-4 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-paragraph hover:text-primary"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* View All Button */}
        <div>
          
        </div>
        {filteredProjects.length > 0 && (
          <SlantedButton
            text="View Projects"
            onClick={() => router.push("/projects")}
          />
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-background rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    statusConfig[project.status].color
                  }`}
                >
                  {statusConfig[project.status].label}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm mb-4 line-clamp-2">{project.description}</p>

              {/* Progress Bar for Ongoing Projects */}
              {project.status === "ongoing" &&
                project.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs font-semibold">Progress</span>
                      </div>
                      <span className="text-xs font-bold text-primary">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

              {/* Meta Info */}
              <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{formatDateForDisplay(project.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{project.team} Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <FolderKanban className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No {activeFilter !== "all" ? activeFilter : ""} projects available.
          </p>
        </div>
      )}
    </section>
  );
}
