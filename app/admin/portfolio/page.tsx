"use client"
import { Save, Plus, Trash2, Edit2, X, Upload, Images } from "lucide-react"
import Image from "next/image"
import { useState, type ChangeEvent, useEffect } from "react"

interface Project {
  id: string
  title: string
  category: string
  photos: string[]
}

interface FormData {
  title: string
  category: string
  photoPreviews: string[]
}

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const categories: string[] = ["Residential", "Commercial", "Renovation", "Industrial", "Infrastructure"]

  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    photoPreviews: [],
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project.id)
    setFormData({
      title: project.title,
      category: project.category,
      photoPreviews: project.photos,
    })
  }

  const handleCancel = () => {
    setEditingProject(null)
    setIsAddingNew(false)
    setFormData({
      title: "",
      category: "",
      photoPreviews: [],
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotosChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readers).then((results) => {
      setFormData((prev) => ({
        ...prev,
        photoPreviews: [...prev.photoPreviews, ...results],
      }))
    })
  }

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photoPreviews: prev.photoPreviews.filter((_, i) => i !== index),
    }))
  }

  const handleSaveProject = async () => {
    try {
      if (isAddingNew) {
        const response = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            photos: formData.photoPreviews,
          }),
        })

        if (response.ok) {
          await fetchProjects()
          handleCancel()
        }
      } else {
        const response = await fetch(`/api/portfolio/${editingProject}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            photos: formData.photoPreviews,
          }),
        })

        if (response.ok) {
          await fetchProjects()
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleAddProject = () => {
    setIsAddingNew(true)
    setFormData({
      title: "",
      category: "Residential",
      photoPreviews: [],
    })
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }


  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words">
            Portfolio Management
          </h1>
          <button
            onClick={handleAddProject}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>Add Project</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {isAddingNew && (
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Add New Project</h3>
                  <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-background text-sm sm:text-base"
                    >
                      {categories.map((cat) => (
                        <option className="bg-background" key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                    Project Photos
                  </label>

                  {formData.photoPreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-2 sm:mb-3">
                      {formData.photoPreviews.map((photo, index) => (
                        <div key={index} className="relative group w-full h-20 sm:h-24">
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover rounded border border-[var(--border-color)]"
                          />
                          <button
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded p-1 flex-shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-2 border-dashed border-[var(--border-color)] rounded p-4 sm:p-6 text-center bg-background w-full">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-xs sm:text-sm text-[var(--primary)] font-medium">Upload Photos</span>
                      <input type="file" accept="image/*" multiple onChange={handlePhotosChange} className="hidden" />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProject}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 flex-shrink-0" />
                    <span>Save Project</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden"
            >
              {editingProject === project.id ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Project</h3>
                    <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-background text-sm sm:text-base"
                      >
                        {categories.map((cat) => (
                          <option className="bg-background" key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                      Project Photos
                    </label>

                    {formData.photoPreviews.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-2 sm:mb-3">
                        {formData.photoPreviews.map((photo, index) => (
                          <div key={index} className="relative group w-full h-20 sm:h-24">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded border border-[var(--border-color)]"
                            />
                            <button
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded p-1 flex-shrink-0"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-2 border-dashed border-[var(--border-color)] rounded p-4 sm:p-6 text-center bg-background w-full">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <label className="cursor-pointer">
                        <span className="text-xs sm:text-sm text-[var(--primary)] font-medium">Upload Photos</span>
                        <input type="file" accept="image/*" multiple onChange={handlePhotosChange} className="hidden" />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                    >
                      <Save className="w-4 h-4 flex-shrink-0" />
                      <span>Save Project</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 w-full">
                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-semibold text-[var(--header-text)] text-sm sm:text-base break-words">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded whitespace-nowrap flex-shrink-0">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Images className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>
                        {project.photos.length} photo
                        {project.photos.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-4 justify-end flex-shrink-0">
                    <button onClick={() => handleEdit(project)} className="p-2 text-[var(--primary)] rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
