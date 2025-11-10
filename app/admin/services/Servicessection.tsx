"use client"
import { Save, Plus, Trash2, Edit2, X, Upload } from "lucide-react"
import Image from "next/image"
import { useState, type ChangeEvent, useEffect } from "react"

interface Service {
  id: string
  type: "service" | "button"
  icon?: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

interface ServiceFormData {
  icon: string
  title: string
  subtitle: string
  description: string
  iconPreview: string | null
}

interface ServicesSectionProps {
  onDataChange: () => void
}

export default function ServicesSection({ onDataChange }: ServicesSectionProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    icon: "",
    title: "",
    subtitle: "",
    description: "",
    iconPreview: null,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/services")
      const data = await res.json()

      const allServices = data.services || []
      const regularServices = allServices.filter((s: Service) => s.type === "service")

      setServices(regularServices)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditService = (service: Service) => {
    setIsAddingNew(false)
    setEditingService(service.id)
    setServiceFormData({
      icon: service.icon || "",
      title: service.title || "",
      subtitle: service.subtitle || "",
      description: service.description || "",
      iconPreview: service.icon || "",
    })
  }

  const handleAddService = () => {
    setIsAddingNew(true)
    setEditingService("new")
    setServiceFormData({
      icon: "",
      title: "",
      subtitle: "",
      description: "",
      iconPreview: null,
    })
  }

  const handleCancelService = () => {
    setEditingService(null)
    setIsAddingNew(false)
    setServiceFormData({
      icon: "",
      title: "",
      subtitle: "",
      description: "",
      iconPreview: null,
    })
  }

  const handleServiceInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setServiceFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setServiceFormData((prev) => ({
          ...prev,
          iconPreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveService = async () => {
    try {
      if (isAddingNew) {
        // Create new service
        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "service",
            icon: serviceFormData.iconPreview || "",
            title: serviceFormData.title,
            subtitle: serviceFormData.subtitle,
            description: serviceFormData.description,
          }),
        })

        if (response.ok) {
          await fetchData()
          handleCancelService()
          onDataChange()
        }
      } else {
        // Update existing service
        const response = await fetch(`/api/services/${editingService}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            icon: serviceFormData.iconPreview,
            title: serviceFormData.title,
            subtitle: serviceFormData.subtitle,
            description: serviceFormData.description,
          }),
        })

        if (response.ok) {
          await fetchData()
          handleCancelService()
          onDataChange()
        }
      }
    } catch (error) {
      console.error("Error saving service:", error)
    }
  }

  const handleDeleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchData()
        onDataChange()
      }
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--header-text)]">Manage Services</h2>
        <button
          onClick={handleAddService}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {isAddingNew && editingService === "new" && (
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">New Service</h3>
                <button onClick={handleCancelService} className="text-gray-500 flex-shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full">
                <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Service Icon</label>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-28 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900 flex-shrink-0 relative">
                    {serviceFormData.iconPreview ? (
                      <Image
                        src={serviceFormData.iconPreview || "/placeholder.svg"}
                        alt="Icon preview"
                        fill
                        className="object-contain rounded p-2"
                      />
                    ) : (
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">Recommended: 40x40px</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={serviceFormData.title}
                    onChange={handleServiceInputChange}
                    className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={serviceFormData.subtitle}
                    onChange={handleServiceInputChange}
                    className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Description</label>
                <textarea
                  name="description"
                  value={serviceFormData.description}
                  onChange={handleServiceInputChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                <button
                  onClick={handleCancelService}
                  className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                >
                  <Save className="w-4 h-4 flex-shrink-0" />
                  <span>Save Service</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden"
          >
            {editingService === service.id ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Service</h3>
                  <button onClick={handleCancelService} className="text-gray-500 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Service Icon</label>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-32 h-32 sm:w-40 sm:h-28 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900 flex-shrink-0 relative">
                      {serviceFormData.iconPreview ? (
                        <Image
                          src={serviceFormData.iconPreview || "/placeholder.svg"}
                          alt="Icon preview"
                          fill
                          className="object-contain rounded p-2"
                        />
                      ) : (
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleIconChange}
                        className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended: 40x40px</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={serviceFormData.title}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={serviceFormData.subtitle}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={serviceFormData.description}
                    onChange={handleServiceInputChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                  <button
                    onClick={handleCancelService}
                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveService}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 flex-shrink-0" />
                    <span>Save Service</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 w-full">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                  <div className="w-20 h-20 sm:w-24 sm:h-20 bg-gray-100 border border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                    {service.icon ? (
                      <Image
                        src={service.icon || "/placeholder.svg"}
                        alt={service.id}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Icon</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--header-text)] text-sm sm:text-base break-words">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 break-words">{service.subtitle}</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
                  <button onClick={() => handleEditService(service)} className="p-2 text-[var(--primary)] rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteService(service.id)} className="p-2 text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
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
