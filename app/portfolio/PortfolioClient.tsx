// app/portfolio/page.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import { FolderOpen, Grid3x3 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  photos: string[];
}

export default function PortfolioClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
    checkVisibility();
  }, [router]);

  const checkVisibility = async () => {
    const visible = await isPageVisible("portfolio");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      const fetchedProjects: Project[] = data.projects || [];
      setProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);

      const uniqueCategories = Array.from(
        new Set(fetchedProjects.map((p) => p.category))
      ).filter(Boolean);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === category));
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section className="px-6 max-w-6xl mx-auto py-12">
      {/* Centered Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-primary/10 rounded-full">
          <FolderOpen className="w-4 h-4 text-primary" />
          <span className="text-primary text-xs font-bold uppercase">
            Our best portfolio
          </span>
        </div>
        <h2 className="text-5xl font-bold text-foreground dark:text-white mb-3">
          Our Portfolio
        </h2>
        <p className="text-sm text-paragraph dark:text-gray-300 max-w-2xl mx-auto">
          We&apos;ve grown up with the internet revolution, and we know how to
          deliver on its promise of improved business
        </p>
      </div>

      {/* Pill-Style Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => handleFilter("All")}
          className={`px-5 py-2 rounded-full text-xs font-semibold uppercase transition-all ${
            activeCategory === "All"
              ? "bg-primary text-white shadow-md"
              : "bg-background border border-gray-200"
          }`}
        >
          All Projects
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase transition-all ${
              activeCategory === cat
                ? "bg-primary text-white shadow-md"
                : "bg-background border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Grid3x3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No projects found in this category.
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="break-inside-avoid group relative bg-background dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden">
                {project.photos.length > 0 ? (
                  <Image
                    src={project.photos[0] || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 backdrop-blur-sm text-xs font-semibold text-foreground bg-background rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Title Below */}
              <div className="p-4">
                <h3 className="font-bold text-foreground dark:text-white text-base">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
