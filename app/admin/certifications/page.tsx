"use client"
import { Save, Plus, Trash2, Edit2, X, Upload } from "lucide-react"
import Image from "next/image"
import { useState, type ChangeEvent, useEffect } from "react"

interface Certification {
  _id: string
  title: string
  description: string
  image: string | null
  order: number
}

interface FormData {
  title: string
  description: string
  imagePreview: string | null
}

export default function CertificationsManagementPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCertification, setEditingCertification] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imagePreview: null,
  })

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch("/api/certifications")
        const data = await response.json()
        setCertifications(data)
      } catch (error) {
        console.error("Error fetching certifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification._id)
    setFormData({
      title: certification.title,
      description: certification.description,
      imagePreview: certification.image,
    })
  }

  const handleCancel = () => {
    setEditingCertification(null)
    setIsAddingNew(false)
    setFormData({
      title: "",
      description: "",
      imagePreview: null,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveCertification = async () => {
    try {
      if (isAddingNew) {
        const response = await fetch("/api/certifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            image: formData.imagePreview,
          }),
        })

        if (response.ok) {
          const newCert = await response.json()
          setCertifications((prev) => [newCert, ...prev])
          handleCancel()
        }
      } else if (editingCertification) {
        const response = await fetch(`/api/certifications/${editingCertification}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            image: formData.imagePreview,
          }),
        })

        if (response.ok) {
          const updated = await response.json()
          setCertifications((prev) => prev.map((cert) => (cert._id === editingCertification ? updated : cert)))
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving certification:", error)
    }
  }

  const handleAddCertification = () => {
    setIsAddingNew(true)
    setFormData({
      title: "",
      description: "",
      imagePreview: null,
    })
  }

  const handleDeleteCertification = async (id: string) => {
    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCertifications((prev) => prev.filter((certification) => certification._id !== id))
      }
    } catch (error) {
      console.error("Error deleting certification:", error)
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-500">Loading certifications...</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words">
            Certifications Management
          </h1>
          <button
            onClick={handleAddCertification}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {isAddingNew && (
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">
                    Add New Certification
                  </h3>
                  <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Certification Image</label>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                      {formData.imagePreview ? (
                        <Image
                          src={formData.imagePreview || "/placeholder.svg"}
                          alt="Image preview"
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended: 360x240px badge</p>
                    </div>
                  </div>
                </div>

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
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCertification}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 flex-shrink-0" />
                    <span>Save Certification</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {certifications.map((certification) => (
            <div
              key={certification._id}
              className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden"
            >
              {editingCertification === certification._id ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Certification</h3>
                    <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">
                      Certification Image
                    </label>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                        {formData.imagePreview ? (
                          <Image
                            src={formData.imagePreview || "/placeholder.svg"}
                            alt="Image preview"
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-2">Recommended: 360x240px badge</p>
                      </div>
                    </div>
                  </div>

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
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCertification}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                    >
                      <Save className="w-4 h-4 flex-shrink-0" />
                      <span>Save Certification</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 w-full">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                      {certification.image ? (
                        <Image
                          src={certification.image || "/placeholder.svg"}
                          alt={certification.title}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--header-text)] mb-1 sm:mb-2 text-sm sm:text-base break-words">
                        {certification.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 break-words">{certification.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
                    <button onClick={() => handleEdit(certification)} className="p-2 text-[var(--primary)] rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCertification(certification._id)}
                      className="p-2 text-red-600 rounded"
                    >
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
