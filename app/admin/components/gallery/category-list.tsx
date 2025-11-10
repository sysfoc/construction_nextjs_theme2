"use client"

import { Plus, Edit2, Trash2 } from "lucide-react"
import CategoryForm from "./category-form"

interface GalleryCategory {
  _id: string
  name: string
}

interface FormData {
  categoryName: string
  imageFile: string | null
  imageType: "photo" | "video"
  imagePreview: string | null
}

interface CategoryListProps {
  categories: GalleryCategory[]
  selectedCategory: string | null
  editingCategory: string | null
  formData: FormData
  onSelectCategory: (id: string) => void
  onAddCategory: () => void
  onEditCategory: (category: GalleryCategory) => void
  onSaveCategory: () => void
  onDeleteCategory: (id: string) => void
  onFormDataChange: (data: FormData) => void
  onEditingCategoryChange: (id: string | null) => void
}

export default function CategoryList({
  categories,
  selectedCategory,
  editingCategory,
  formData,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onSaveCategory,
  onDeleteCategory,
  onFormDataChange,
  onEditingCategoryChange,
}: CategoryListProps) {
  return (
    <div className="bg-background border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button onClick={onAddCategory} className="p-2 text-[var(--primary)] hover:bg-blue-50 rounded transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`px-3 py-2 rounded cursor-pointer transition-colors text-sm font-medium ${
              selectedCategory === category._id
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "text-paragraph bg-background border border-paragraph"
            }`}
            onClick={() => {
              onSelectCategory(category._id)
              onEditingCategoryChange(null)
            }}
          >
            {editingCategory === category._id ? (
              <CategoryForm
                categoryName={formData.categoryName}
                onNameChange={(name) => onFormDataChange({ ...formData, categoryName: name })}
                onSave={onSaveCategory}
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>{category.name}</span>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditCategory(category)
                    }}
                    className="p-1 hover:text-[var(--primary)] hover:bg-[var(--primary-foreground)] rounded transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteCategory(category._id)
                    }}
                    className="p-1 hover:text-[var(--primary)] hover:bg-[var(--primary-foreground)]  rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
