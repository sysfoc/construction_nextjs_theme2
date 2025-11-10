// app/projects/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, FolderKanban, TrendingUp } from "lucide-react";
import type { ProjectData } from "@/lib/models/Project";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

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
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }
  
  if (!isVisible) {
    return null;
  }

  return (
    <section className="px-6 max-w-5xl mx-auto py-12 bg-background min-h-screen">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-background rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-primary">{projects.length}</p>
          <p className="text-xs text-paragraph dark:text-gray-400 uppercase">Total</p>
        </div>
        <div className="bg-background rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600">{projects.filter(p => p.status === 'ongoing').length}</p>
          <p className="text-xs text-paragraph dark:text-gray-400 uppercase">Ongoing</p>
        </div>
        <div className="bg-background rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600">{projects.filter(p => p.status === 'completed').length}</p>
          <p className="text-xs text-paragraph dark:text-gray-400 uppercase">Completed</p>
        </div>
        <div className="bg-background rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-amber-600">{projects.filter(p => p.status === 'upcoming').length}</p>
          <p className="text-xs text-paragraph dark:text-gray-400 uppercase">Upcoming</p>
        </div>
      </div>

      {/* Header with Filters Side by Side */}
      <div className="bg-background rounded-lg p-5 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderKanban className="w-5 h-5 text-primary" />
              <span className="text-primary text-xs font-bold uppercase">Our Projects</span>
            </div>
            <h2 className="text-3xl font-bold text-page-heading dark:text-white">
              Project Portfolio
            </h2>
          </div>

          {/* Inline Filter Tabs */}
          <div className="flex items-center gap-2 bg-background p-1 rounded-lg">
            <button
              onClick={() => handleFilter("all")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                activeFilter === "all"
                  ? "bg-background text-primary shadow-sm"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilter("ongoing")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                activeFilter === "ongoing"
                  ? "bg-background text-primary shadow-sm"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => handleFilter("completed")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                activeFilter === "completed"
                  ? "bg-background text-primary shadow-sm"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleFilter("upcoming")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                activeFilter === "upcoming"
                  ? "bg-background text-primary shadow-sm"
                  : "text-gray-400 dark:text-gray-300 hover:text-primary"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Projects List - Horizontal Cards */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-background rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="grid md:grid-cols-[240px_1fr] gap-0">
              {/* Image Section */}
              <div className="relative h-48 md:h-auto overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                {/* Status Dot */}
                <div className="absolute top-3 left-3">
                  <span className={`w-3 h-3 rounded-full ${statusConfig[project.status].dotColor} block shadow-lg`}></span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-paragraph dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-paragraph/70 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>
                    <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold ${statusConfig[project.status].color}`}>
                      {statusConfig[project.status].label}
                    </span>
                  </div>

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
                </div>

                {/* Bottom Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs text-paragraph/70 dark:text-gray-400 truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs text-paragraph/70 dark:text-gray-400 truncate">
                      {project.startDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs text-paragraph/70 dark:text-gray-400 truncate">
                      {project.team} Members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <FolderKanban className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-paragraph/70 dark:text-gray-400 text-sm">
            No projects found for this filter.
          </p>
        </div>
      )}
    </section>
  );
}