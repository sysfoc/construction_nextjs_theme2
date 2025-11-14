"use client";

import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Play, Image as ImageIcon, Layers } from "lucide-react";
import Loader from "../components/General/Loader";

interface GalleryCategory {
  _id: string;
  name: string;
}

interface GalleryImage {
  _id: string;
  categoryId: string;
  src: string;
  type: "photo" | "video";
}

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("gallery");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();

        setCategories(data.categories || []);
        setAllImages(data.images || []);

        if (data.categories && data.categories.length > 0) {
          setActiveAlbum("All");
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const filteredItems =
    activeAlbum === "All"
      ? allImages
      : allImages.filter((img) => {
          const category = categories.find((c) => c._id === img.categoryId);
          return category?.name === activeAlbum;
        });

  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Compact Side-by-Side Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Gallery</h1>
              <p className="text-xs text-paragraph dark:text-gray-400">
                {filteredItems.length} items
              </p>
            </div>
          </div>

          {/* Right: Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveAlbum("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeAlbum === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary"
              }`}
            >
              All · {allImages.length}
            </button>
            {categories.map((category) => {
              const count = allImages.filter(
                (img) => img.categoryId === category._id
              ).length;
              return (
                <button
                  key={category._id}
                  onClick={() => setActiveAlbum(category.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeAlbum === category.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary"
                  }`}
                >
                  {category.name} · {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Gallery */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No media found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                {/* Media */}
                <div className="relative aspect-square overflow-hidden">
                  {item.type === "photo" ? (
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt="Gallery item"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <video
                      controls
                      muted
                      loop
                      src={item.src}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded">
                        {item.type === "photo" ? (
                          <ImageIcon className="w-3 h-3 text-white" />
                        ) : (
                          <Play className="w-3 h-3 text-white" />
                        )}
                        <span className="text-white text-xs font-medium">
                          {item.type}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded">
                        {categories.find((c) => c._id === item.categoryId)?.name || "Other"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}