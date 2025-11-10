"use client";
import React, { useState } from "react";
import { User, Clock } from "lucide-react";
import Image from "next/image";

interface Project {
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

type ProjectData = {
  [key: number]: Project[];
};

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: string[] = [
    "Architecture Design",
    "Building Renovation",
    "Material Supply",
  ];

  const projectData: ProjectData = {
    0: [
      {
        image: "/services/service_06.png",
        category: "ARCHITECTURE",
        title: "Modern Villa Design",
        description:
          "Contemporary residential design with sustainable features and innovative spaces.",
        author: "JOHN ARCHITECT",
        date: "15 APRIL 2024",
      },
      {
        image: "/services/service_07.png",
        category: "ARCHITECTURE",
        title: "Commercial Complex",
        description:
          "Multi-story commercial building with modern amenities and green spaces.",
        author: "SARAH DESIGN",
        date: "22 APRIL 2024",
      },
      {
        image: "/services/service_08.png",
        category: "ARCHITECTURE",
        title: "Urban Planning Project",
        description:
          "Comprehensive urban development with mixed-use facilities and public areas.",
        author: "MICHAEL PLAN",
        date: "10 MAY 2024",
      },
    ],
    1: [
      {
        image: "/services/service_06.png",
        category: "RENOVATION",
        title: "Heritage Building Restore",
        description:
          "Careful restoration of historical architecture preserving original character.",
        author: "EMMA RESTORE",
        date: "05 JUNE 2024",
      },
      {
        image: "/services/service_07.png",
        category: "RENOVATION",
        title: "Office Space Modernization",
        description:
          "Complete office renovation with modern workspaces and energy efficiency.",
        author: "DAVID RENEW",
        date: "18 JUNE 2024",
      },
      {
        image: "/services/service_08.png",
        category: "RENOVATION",
        title: "Residential Upgrade",
        description:
          "Full home renovation featuring contemporary design and smart technology.",
        author: "LISA MODERN",
        date: "25 JULY 2024",
      },
    ],
    2: [
      {
        image: "/services/service_06.png",
        category: "MATERIALS",
        title: "Premium Steel Supply",
        description:
          "High-grade structural steel for large-scale construction projects.",
        author: "ROBERT SUPPLY",
        date: "12 AUGUST 2024",
      },
      {
        image: "/services/service_07.png",
        category: "MATERIALS",
        title: "Sustainable Timber",
        description:
          "Eco-friendly timber solutions from certified sustainable sources.",
        author: "ANNA GREEN",
        date: "20 AUGUST 2024",
      },
      {
        image: "/services/service_08.png",
        category: "MATERIALS",
        title: "Concrete Solutions",
        description:
          "Advanced concrete mixtures for durability and environmental performance.",
        author: "THOMAS BUILD",
        date: "30 AUGUST 2024",
      },
    ],
  };

  const currentProjects: Project[] = projectData[activeTab];

  return (
    <div className="relative py-24 dark:bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/services/service_09.png"
          alt="Background"
          fill
          className="object-cover dark:opacity-30"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Tabs */}
        <div className="flex justify-start pr-10 gap-1 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-xs font-medium transition-all ${
                activeTab === index
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                  : "bg-[var(--color-header-background)] text-[var(--color-header-text)] border border-[var(--color-border)] hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentProjects.map((project, index) => (
            <div key={index} className="relative">
              {/* Project Image */}
              <div className="relative w-full h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Diagonal Content Box */}
              <div
                className="bg-[var(--color-background)] dark:bg-gray-800 p-4 relative -mt-16 left-10 w-[70%] mx-auto shadow-md clip-project-section"
              >
                <p className="text-[var(--color-primary)] text-xs font-bold mb-1">
                  {project.category}
                </p>
                <h3 className="text-[var(--color-paragraph)] dark:text-gray-200 text-lg font-bold mb-1">
                  {project.title}
                </h3>
                <p className="text-[var(--color-paragraph)] dark:text-gray-300 text-xs mb-3">
                  {project.description}
                </p>

                {/* Author and Date */}
                <div className="flex flex-col gap-1 text-xs mt-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-[var(--color-primary)]" />
                    <span className="text-[var(--color-header-text)] dark:text-gray-300 font-medium">
                      {project.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[var(--color-primary)]" />
                    <span className="text-[var(--color-header-text)] dark:text-gray-300 font-medium">
                      {project.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
