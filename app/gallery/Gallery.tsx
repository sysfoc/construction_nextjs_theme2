"use client"

import { useState, useEffect } from "react"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Play, ImageIcon, Grid3x3 } from "lucide-react"

interface GalleryCategory {
  _id: string
  name: string
}

interface GalleryImage {
  _id: string
  categoryId: string
  src: string
  type: "photo" | "video"
}

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null)
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [allImages, setAllImages] = useState<GalleryImage[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("gallery")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/gallery")
        const data = await response.json()

        setCategories(data.categories || [])
        setAllImages(data.images || [])

        if (data.categories && data.categories.length > 0) {
          setActiveAlbum("All")
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isVisible) {
      fetchData()
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  if (loading) {
    return (
      <main className="min-h-screen text-gray-900 dark:text-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Loading gallery...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const filteredItems =
    activeAlbum === "All"
      ? allImages
      : allImages.filter((img) => {
          const category = categories.find((c) => c._id === img.categoryId)
          return category?.name === activeAlbum
        })

  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 px-6 py-10 bg-background">
      <section className="max-w-6xl mx-auto">
        {/* Centered Header with Counter */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 bg-primary/10 rounded-full">
            <Grid3x3 className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold uppercase">Gallery</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Project Gallery</h1>
          <p className="text-paragraph dark:text-gray-400 text-sm max-w-xl mx-auto">
            Explore our work through photos and videos
          </p>
        </div>

        {/* Pill Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveAlbum("All")}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase transition-all ${
              activeAlbum === "All"
                ? "bg-primary text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary"
            }`}
          >
            All ({allImages.length})
          </button>
          {categories.map((category) => {
            const count = allImages.filter(img => img.categoryId === category._id).length
            return (
              <button
                key={category._id}
                onClick={() => setActiveAlbum(category.name)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase transition-all ${
                  activeAlbum === category.name
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary"
                }`}
              >
                {category.name} ({count})
              </button>
            )
          })}
        </div>

        {/* Masonry Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-background rounded-lg">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No media found in this category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="break-inside-avoid border border-gray-200 shadow-md group relative bg-background rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* Media Container */}
                <div className="relative w-full overflow-hidden">
                  {item.type === "photo" ? (
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt="Gallery item"
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <video
                      controls
                      muted
                      loop
                      src={item.src}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  
                  {/* Type Badge Bottom Left */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                      {item.type === "photo" ? (
                        <ImageIcon className="w-3 h-3 text-white" />
                      ) : (
                        <Play className="w-3 h-3 text-white" />
                      )}
                      <span className="text-white text-xs font-semibold uppercase">{item.type}</span>
                    </div>
                  </div>
                </div>

                {/* Category Tag at Bottom */}
                <div className="p-3 ">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    {categories.find((c) => c._id === item.categoryId)?.name || "Uncategorized"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}