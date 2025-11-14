"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import { FolderOpen, Grid3x3 } from "lucide-react";
import Loader from "../components/General/Loader";

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
      <div className="flex items-center justify-center min-h-screen">
        <Loader/>
      </div>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto py-10">
      
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-3">
          <FolderOpen className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-[10px] font-bold uppercase tracking-wide">
            Our Portfolio
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          Featured Projects
        </h2>
        <p className="text-xs sm:text-sm text-paragraph max-w-xl">
          Explore our successful projects across different categories
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleFilter("All")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
            activeCategory === "All"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-header-background text-paragraph hover:bg-primary/10"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-header-background text-paragraph hover:bg-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-header-background rounded-2xl border-2 border-dashed border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Grid3x3 className="w-8 h-8 text-primary" />
          </div>
          <p className="text-paragraph text-sm font-medium">
            No projects in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-background rounded-xl overflow-hidden border-2 border-border hover:border-primary hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                {project.photos.length > 0 ? (
                  <Image
                    src={project.photos[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-paragraph text-xs">No image</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-white text-sm">
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