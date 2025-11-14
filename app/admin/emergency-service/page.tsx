"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface EmergencyService {
  _id: string
  title: string
  slug: string
  description: string
  image: string
  calloutPrice: number
  price: number
  responseTime: string
  whatWeHelpWith: string[]
}

interface EmergencyServiceForm {
  title: string
  slug: string
  description: string
  image: string
  calloutPrice: string
  price: string
  responseTime: string
  whatWeHelpWith: string
}

interface GlobalSettings {
  emergencyEmail: string
  emergencyPhone: string
}

function EmergencySettings({ initialSettings, onSettingsSaved }: { initialSettings: GlobalSettings; onSettingsSaved: () => void }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setSettings(initialSettings)
  }, [initialSettings])

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/emergency-services/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error("Failed to save")
      alert("Settings saved successfully")
      onSettingsSaved()
    } catch (error) {
      alert("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Emergency Contact Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Emergency Email</label>
          <input
            type="email"
            value={settings.emergencyEmail}
            onChange={(e) => setSettings({ ...settings, emergencyEmail: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="emergency@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Emergency Phone</label>
          <input
            type="text"
            value={settings.emergencyPhone}
            onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="+1234567890"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  )
}

function EmergencyServicesList({
  services,
  loading,
  onEdit,
  onDelete,
  onAddNew,
}: {
  services: EmergencyService[]
  loading: boolean
  onEdit: (service: EmergencyService) => void
  onDelete: (id: string) => void
  onAddNew: () => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <button
          onClick={onAddNew}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
        >
          Add New Service
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No services found</div>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex gap-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span>Callout: £{service.calloutPrice}</span>
                    <span>Price: £{service.price}</span>
                    <span>Response: {service.responseTime}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onEdit(service)}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm h-fit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(service._id)}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm h-fit"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EmergencyServiceModal({
  isOpen,
  editingId,
  form,
  submitting,
  onClose,
  onFormChange,
  onTitleChange,
  onSubmit,
}: {
  isOpen: boolean
  editingId: string | null
  form: EmergencyServiceForm
  submitting: boolean
  onClose: () => void
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{editingId ? "Edit Service" : "Add New Service"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={onTitleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={onFormChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onFormChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={onFormChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Callout Price *</label>
                <input
                  type="number"
                  name="calloutPrice"
                  value={form.calloutPrice}
                  onChange={onFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={onFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Response Time *</label>
              <input
                type="text"
                name="responseTime"
                value={form.responseTime}
                onChange={onFormChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., 30 minutes"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What We Help With * (one per line)</label>
              <textarea
                name="whatWeHelpWith"
                value={form.whatWeHelpWith}
                onChange={onFormChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={5}
                placeholder="Enter each item on a new line"
                required
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                disabled={submitting}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
              >
                {submitting ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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