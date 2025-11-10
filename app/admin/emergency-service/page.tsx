"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { EmergencySettings } from "@/app/admin/components/emergency-services/emergency-settings"
import { EmergencyServiceModal } from "@/app/admin/components/emergency-services/emergency-service-modal"
import type { EmergencyServiceForm } from "@/app/admin/components/emergency-services/emergency-services-form"
import { EmergencyServicesList } from "@/app/admin/components/emergency-services/emergency-services-list"
import type { EmergencyService } from "@/app/admin/components/emergency-services/emergency-services-form"

interface GlobalSettings {
  emergencyEmail: string
  emergencyPhone: string
}

export default function AdminEmergencyServicePage() {
  const [activeTab, setActiveTab] = useState<"settings" | "services">("services")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [services, setServices] = useState<EmergencyService[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [settings, setSettings] = useState<GlobalSettings>({
    emergencyEmail: "",
    emergencyPhone: "",
  })
  const [form, setForm] = useState<EmergencyServiceForm>({
    title: "",
    slug: "",
    description: "",
    image: "",
    calloutPrice: "",
    price: "",
    responseTime: "",
    whatWeHelpWith: "",
  })

  useEffect(() => {
    fetchServices()
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/emergency-services/settings")
      const data = await response.json()
      setSettings({
        emergencyEmail: data.emergencyEmail || "",
        emergencyPhone: data.emergencyPhone || "",
      })
    } catch (error) {
      console.error("Failed to fetch settings", error)
    }
  }

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/emergency-services")
      const data = await response.json()
      setServices(Array.isArray(data) ? data : [])
    } catch (error) {
      alert("Failed to fetch services")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !form.title ||
      !form.slug ||
      !form.image ||
      !form.calloutPrice ||
      !form.price ||
      !form.responseTime ||
      !form.whatWeHelpWith
    ) {
      alert("Please fill all required fields")
      return
    }

    const whatWeHelpWithArray =
      typeof form.whatWeHelpWith === "string"
        ? form.whatWeHelpWith
            .split("\n")
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0)
        : form.whatWeHelpWith

    if (whatWeHelpWithArray.length === 0) {
      alert('Please add at least one item for "What We Help With"')
      return
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      image: form.image,
      calloutPrice: Number.parseFloat(form.calloutPrice),
      price: Number.parseFloat(form.price),
      responseTime: form.responseTime,
      whatWeHelpWith: whatWeHelpWithArray,
    }

    try {
      setSubmitting(true)

      if (editingId) {
        const response = await fetch(`/api/emergency-services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error("Failed to update")
        alert("Service updated successfully")
      } else {
        const response = await fetch("/api/emergency-services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error("Failed to create")
        alert("Service created successfully")
      }

      handleCloseModal()
      fetchServices()
    } catch (error) {
      alert("Failed to save service")
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setForm({
      title: "",
      slug: "",
      description: "",
      image: "",
      calloutPrice: "",
      price: "",
      responseTime: "",
      whatWeHelpWith: "",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (service: EmergencyService) => {
    setEditingId(service._id)
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description,
      image: service.image,
      calloutPrice: service.calloutPrice.toString(),
      price: service.price.toString(),
      responseTime: service.responseTime,
      whatWeHelpWith: service.whatWeHelpWith.join("\n"),
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const response = await fetch(`/api/emergency-services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")
      alert("Service deleted successfully")
      fetchServices()
    } catch (error) {
      alert("Failed to delete service")
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setForm({
      title: "",
      slug: "",
      description: "",
      image: "",
      calloutPrice: "",
      price: "",
      responseTime: "",
      whatWeHelpWith: "",
    })
  }

  return (
    <div className="min-h-screen bg-background py-4 sm:py-5 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-paragraph">Emergency Services Management</h1>
        <p className="text-sm sm:text-base text-paragraph mb-8">Manage emergency contact settings and services</p>

        <div className="mb-8 border-b border-gray-200">
          <nav className="flex gap-4 sm:gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("services")}
              className={`pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === "services" ? "text-primary" : "border-transparent text-paragraph"
              }`}
            >
              Services Management
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === "settings" ? "text-primary" : "border-transparent text-paragraph"
              }`}
            >
              Email & Phone Settings
            </button>
          </nav>
        </div>

        {activeTab === "settings" && (
          <div>
            <EmergencySettings initialSettings={settings} onSettingsSaved={fetchSettings} />
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <EmergencyServicesList
              services={services}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddNew={handleAddNew}
            />
          </div>
        )}

        <EmergencyServiceModal
          isOpen={isModalOpen}
          editingId={editingId}
          form={form}
          submitting={submitting}
          onClose={handleCloseModal}
          onFormChange={handleChange}
          onTitleChange={handleTitleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
