"use client"

import { useState, useEffect } from "react"
import CategoryList from "../components/gallery/category-list"
import ImageUploadForm from "../components/gallery/image-upload-form"
import ImageGrid from "../components/gallery/image-grid"
import Loader from "@/app/components/General/Loader"

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

interface FormData {
  categoryName: string
  imageFile: string | null
  imageType: "photo" | "video"
  imagePreview: string | null
}

export default function GalleryManagementPage() {
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    imageFile: null,
    imageType: "photo",
    imagePreview: null,
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery")
      const data = await response.json()
      setCategories(data.categories || [])
      setImages(data.images || [])
      setSelectedCategory((prev) => {
        if (prev && data.categories?.some((cat: GalleryCategory) => cat._id === prev)) {
          return prev
        }
        return data.categories && data.categories.length > 0 ? data.categories[0]._id : null
      })
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addCategory", data: { name: "New Category" } }),
      })

      if (response.ok) {
        await fetchGallery()
      }
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

  const handleEditCategory = (category: GalleryCategory) => {
    setEditingCategory(category._id)
    setFormData((prev) => ({ ...prev, categoryName: category.name }))
  }

  const handleSaveCategory = async () => {
    if (!editingCategory || !formData.categoryName.trim()) return

    try {
      const response = await fetch(`/api/gallery/category/${editingCategory}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { name: formData.categoryName.trim() } }),
      })

      if (response.ok) {
        await fetchGallery()
        setEditingCategory(null)
        setFormData((prev) => ({ ...prev, categoryName: "" }))
      }
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/category/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchGallery()
        if (selectedCategory === id) {
          setSelectedCategory(null)
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const handleAddImage = async () => {
    if (!selectedCategory || !formData.imageFile) return

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addImage",
          data: {
            categoryId: selectedCategory,
            src: formData.imageFile,
            type: formData.imageType,
          },
        }),
      })

      if (response.ok) {
        await fetchGallery()
        setFormData((prev) => ({
          ...prev,
          imageFile: null,
          imagePreview: null,
          imageType: "photo",
        }))
      }
    } catch (error) {
      console.error("Error adding image:", error)
    }
  }

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/image/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchGallery()
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  const filteredImages = selectedCategory ? images.filter((img) => img.categoryId === selectedCategory) : []

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader/>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Gallery Management</h1>

        <div className="space-y-4">
          {/* Categories Section - Now at top */}
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            editingCategory={editingCategory}
            formData={formData}
            onSelectCategory={setSelectedCategory}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onSaveCategory={handleSaveCategory}
            onDeleteCategory={handleDeleteCategory}
            onFormDataChange={setFormData}
            onEditingCategoryChange={setEditingCategory}
          />

          {/* Upload and Images Section */}
          {selectedCategory ? (
            <div className="space-y-4">
              {/* Upload Form - Below categories */}
              <ImageUploadForm formData={formData} onFormDataChange={setFormData} onAddImage={handleAddImage} />

              {/* Images Grid - At bottom */}
              <ImageGrid images={filteredImages} onDeleteImage={handleDeleteImage} />
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">Create a category to add images</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
