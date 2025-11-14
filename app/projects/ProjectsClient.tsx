// app/projects/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, FolderKanban, TrendingUp } from "lucide-react";
import type { ProjectData } from "@/lib/models/Project";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import Loader from "../components/General/Loader";

const statusConfig = {
  ongoing: {
    label: "Ongoing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    dotColor: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    dotColor: "bg-green-500",
  },
  upcoming: {
    label: "Upcoming",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    dotColor: "bg-amber-500",
  },
};

export default function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "ongoing" | "completed" | "upcoming"
  >("all");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
    checkVisibility();
  }, [router]);

  const checkVisibility = async () => {
    const visible = await isPageVisible("projects");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
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
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.status === filter));
    }
  };

  if (loading) {
    return (
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader/>
      </div>
    );
  }
  
  if (!isVisible) {
    return null;
  }

  return (
    <section className="px-4 md:px-6 max-w-7xl mx-auto py-8 bg-background min-h-screen">
      {/* Compact Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FolderKanban className="w-5 h-5 text-primary" />
          <span className="text-primary text-xs font-bold uppercase tracking-wide">Our Projects</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-page-heading dark:text-white">
          Project Portfolio
        </h2>
      </div>

      {/* Inline Stats & Filter Bar */}
      <div className="bg-background rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Compact Stats */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              <span className="text-xl font-bold text-primary">{projects.length}</span>
              <span className="text-xs text-paragraph dark:text-gray-400 uppercase">Total</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              <span className="text-xl font-bold text-blue-600">{projects.filter(p => p.status === 'ongoing').length}</span>
              <span className="text-xs text-paragraph dark:text-gray-400 uppercase">Ongoing</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              <span className="text-xl font-bold text-green-600">{projects.filter(p => p.status === 'completed').length}</span>
              <span className="text-xs text-paragraph dark:text-gray-400 uppercase">Done</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              <span className="text-xl font-bold text-amber-600">{projects.filter(p => p.status === 'upcoming').length}</span>
              <span className="text-xs text-paragraph dark:text-gray-400 uppercase">Upcoming</span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1 bg-background rounded-lg border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => handleFilter("all")}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase transition-all ${
                activeFilter === "all"
                  ? "bg-background text-primary shadow-sm border border-gray-200 dark:border-gray-600"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilter("ongoing")}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase transition-all ${
                activeFilter === "ongoing"
                  ? "bg-background text-primary shadow-sm border border-gray-200 dark:border-gray-600"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => handleFilter("completed")}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase transition-all ${
                activeFilter === "completed"
                  ? "bg-background text-primary shadow-sm border border-gray-200 dark:border-gray-600"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleFilter("upcoming")}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase transition-all ${
                activeFilter === "upcoming"
                  ? "bg-background text-primary shadow-sm border border-gray-200 dark:border-gray-600"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid - Vertical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-background rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col"
          >
            {/* Image with Status Badge */}
            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusConfig[project.status].color} shadow-lg`}>
                  {statusConfig[project.status].label}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`w-2.5 h-2.5 rounded-full ${statusConfig[project.status].dotColor} block shadow-lg`}></span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-base font-bold text-paragraph dark:text-white mb-1.5 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-paragraph/70 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                {project.description}
              </p>

              {/* Progress Bar */}
              {project.status === "ongoing" && project.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-xs font-semibold text-paragraph dark:text-gray-300">Progress</span>
                    </div>
                    <span className="text-xs font-bold text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs text-paragraph/70 dark:text-gray-400 truncate">{project.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs text-paragraph/70 dark:text-gray-400">{project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs text-paragraph/70 dark:text-gray-400">{project.team} Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-background rounded-lg border border-gray-200 dark:border-gray-700">
          <FolderKanban className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-paragraph/70 dark:text-gray-400 text-sm">
            No projects found for this filter.
          </p>
        </div>
      )}
    </section>
  );
}