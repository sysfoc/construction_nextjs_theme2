"use client"
import { Save, Plus, Trash2, Edit2, X, User, Star, Briefcase, Building2, MapPin, Calendar } from "lucide-react"
import type React from "react"

import { useState, useEffect } from "react"

interface Testimonial {
  id: string
  name: string
  designation: string
  photo: string | null
  comment: string
  date: string
  stars: number
  company: string
  location: string
}

interface FormData {
  name: string
  designation: string
  comment: string
  photoPreview: string | null
  date: string
  stars: number
  company: string
  location: string
}

export default function TestimonialManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    designation: "",
    comment: "",
    photoPreview: null,
    date: "",
    stars: 5,
    company: "",
    location: "",
  })

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        setTestimonials(data.testimonials || [])
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial.id)
    setFormData({
      name: testimonial.name,
      designation: testimonial.designation,
      comment: testimonial.comment,
      photoPreview: testimonial.photo,
      date: testimonial.date,
      stars: testimonial.stars,
      company: testimonial.company,
      location: testimonial.location,
    })
  }

  const handleCancel = () => {
    setEditingTestimonial(null)
    setIsAddingNew(false)
    setFormData({
      name: "",
      designation: "",
      comment: "",
      photoPreview: null,
      date: "",
      stars: 5,
      company: "",
      location: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStarsChange = (stars: number) => {
    setFormData((prev) => ({ ...prev, stars }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photoPreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveTestimonial = async () => {
    try {
      if (isAddingNew) {
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            designation: formData.designation,
            comment: formData.comment,
            photo: formData.photoPreview,
            date: formData.date,
            stars: formData.stars,
            company: formData.company,
            location: formData.location,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setTestimonials((prev) => [data.testimonial, ...prev])
          handleCancel()
        }
      } else if (editingTestimonial) {
        const response = await fetch(`/api/testimonials/${editingTestimonial}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            designation: formData.designation,
            comment: formData.comment,
            photo: formData.photoPreview,
            date: formData.date,
            stars: formData.stars,
            company: formData.company,
            location: formData.location,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setTestimonials((prev) => prev.map((t) => (t.id === editingTestimonial ? data.testimonial : t)))
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error)
    }
  }

  const handleAddTestimonial = () => {
    setIsAddingNew(true)
    setFormData({
      name: "",
      designation: "",
      comment: "",
      photoPreview: null,
      date: new Date().toISOString().split("T")[0],
      stars: 5,
      company: "",
      location: "",
    })
  }

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words">
            Testimonial Management
          </h1>
          <button
            onClick={handleAddTestimonial}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>Add Testimonial</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[var(--paragraph-color)]">Loading testimonials...</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {isAddingNew && (
              <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">
                      Add New Testimonial
                    </h3>
                    <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Client Photo</label>
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-[var(--border-color)] rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                        {formData.photoPreview ? (
                          <img
                            src={formData.photoPreview || "/placeholder.svg"}
                            alt="Photo preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-2">Recommended: 300x300px image</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarsChange(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formData.stars ? "fill-[var(--primary)] text-[var(--primary)]" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Comment</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      rows={4}
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
                      onClick={handleSaveTestimonial}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                    >
                      <Save className="w-4 h-4 flex-shrink-0" />
                      <span>Save Testimonial</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden"
              >
                {editingTestimonial === testimonial.id ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Testimonial</h3>
                      <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Client Photo</label>
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-[var(--border-color)] rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                          {formData.photoPreview ? (
                            <img
                              src={formData.photoPreview || "/placeholder.svg"}
                              alt="Photo preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-1 w-full">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                          />
                          <p className="text-xs text-gray-500 mt-2">Recommended: 300x300px image</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="w-full">
                        <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                          Designation
                        </label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                          Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarsChange(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= formData.stars
                                    ? "fill-[var(--primary)] text-[var(--primary)]"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                        Comment
                      </label>
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={4}
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
                        onClick={handleSaveTestimonial}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                      >
                        <Save className="w-4 h-4 flex-shrink-0" />
                        <span>Save Testimonial</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 w-full">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 border border-[var(--border-color)] flex items-center justify-center overflow-hidden flex-shrink-0">
                        {testimonial.photo ? (
                          <img
                            src={testimonial.photo || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--header-text)] mb-1 text-sm sm:text-base break-words">
                          {testimonial.name}
                        </h3>

                        <div className="flex flex-wrap gap-4 mb-3">
                          <p className="text-xs text-gray-500 break-words flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-[var(--primary)]" />
                            {testimonial.designation}
                          </p>

                          <p className="text-xs text-gray-500 break-words flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                            {testimonial.company}
                          </p>

                          <p className="text-xs text-gray-500 break-words flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                            {testimonial.location}
                          </p>

                          <p className="text-xs text-gray-500 break-words flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />{" "}
                            {new Date(testimonial.date).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                star <= testimonial.stars
                                  ? "fill-[var(--primary)] text-[var(--primary)]"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 italic break-words">
                          &quot;{testimonial.comment}&quot;
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
                      <button onClick={() => handleEdit(testimonial)} className="p-2 text-[var(--primary)] rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
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
        )}
      </div>
    </div>
  )
}
