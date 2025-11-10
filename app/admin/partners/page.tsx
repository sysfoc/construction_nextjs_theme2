"use client"
import { Save, Trash2, Edit2, X, Upload, Plus } from "lucide-react"
import { useState, type ChangeEvent, useEffect } from "react"

interface Partner {
  id: string
  type: "partner" | "stat"
  name?: string
  logo?: string
  statKey?: string
  value?: string
  label?: string
}

interface FormData {
  type: "partner" | "stat"
  name: string
  logo: string
  statKey: string
  value: string
  logoPreview: string | null
}

const STAT_OPTIONS = [
  { key: "activePartnerships", label: "Active Partnerships" },
  { key: "projectValue", label: "Combined Project Value" },
  { key: "safetyCompliance", label: "Safety Compliance Rate" },
]

export default function PartnersManagementPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [stats, setStats] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingType, setEditingType] = useState<"partner" | "stat" | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [activeTab, setActiveTab] = useState<"stats" | "partners">("stats")
  const [formData, setFormData] = useState<FormData>({
    type: "partner",
    name: "",
    logo: "",
    statKey: "",
    value: "",
    logoPreview: null,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/partners")
      const data = await response.json()
      setPartners(data.partners || [])
      setStats(data.stats || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditPartner = (partner: Partner) => {
    setEditingId(partner.id)
    setEditingType("partner")
    setFormData({
      type: "partner",
      name: partner.name || "",
      logo: partner.logo || "",
      statKey: "",
      value: "",
      logoPreview: partner.logo || null,
    })
  }

  const handleEditStat = (stat: Partner) => {
    setEditingId(stat.id)
    setEditingType("stat")
    setFormData({
      type: "stat",
      name: "",
      logo: "",
      statKey: stat.statKey || "",
      value: stat.value || "",
      logoPreview: null,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingType(null)
    setIsAddingNew(false)
    setFormData({
      type: "partner",
      name: "",
      logo: "",
      statKey: "",
      value: "",
      logoPreview: null,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logoPreview: reader.result as string,
          logo: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      if (editingType === "partner") {
        const response = await fetch(`/api/partners/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "partner",
            name: formData.name,
            logo: formData.logo,
          }),
        })

        if (response.ok) {
          await fetchData()
          handleCancel()
        }
      } else if (editingType === "stat") {
        const response = await fetch(`/api/partners/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "stat",
            statKey: formData.statKey,
            value: formData.value,
            label: STAT_OPTIONS.find((s) => s.key === formData.statKey)?.label || "",
          }),
        })

        if (response.ok) {
          await fetchData()
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving:", error)
    }
  }

  const handleAddPartner = () => {
    setIsAddingNew(true)
    setEditingType("partner")
    setFormData({
      type: "partner",
      name: "",
      logo: "",
      statKey: "",
      value: "",
      logoPreview: null,
    })
  }

  const handleDeletePartner = async (id: string) => {
    try {
      await fetch(`/api/partners/${id}`, { method: "DELETE" })
      await fetchData()
    } catch (error) {
      console.error("Error deleting:", error)
    }
  }

  const getStatByKey = (key: string) => {
    return stats.find((s) => s.statKey === key)
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
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="flex gap-2 mb-8 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-colors ${
              activeTab === "stats"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-gray-600"
            }`}
          >
            Partnership Stats
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-colors ${
              activeTab === "partners"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-gray-600"
            }`}
          >
            Partners
          </button>
        </div>

        {/* Stats Section */}
        {activeTab === "stats" && (
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] mb-6">Partnership Stats</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STAT_OPTIONS.map((statOption) => {
                const stat = getStatByKey(statOption.key)
                const isEditing = editingId === stat?.id && editingType === "stat"

                return (
                  <div
                    key={statOption.key}
                    className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4"
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-[var(--header-text)]">Edit</h3>
                          <button onClick={handleCancel} className="text-gray-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs text-[var(--header-text)] mb-1.5">Value</label>
                          <input
                            type="text"
                            name="value"
                            value={formData.value}
                            onChange={handleInputChange}
                            placeholder="e.g., 50+, $2.5B, 98%"
                            className="w-full px-3 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleCancel}
                            className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-xs"
                          >
                            <Save className="w-3 h-3" />
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-semibold text-[var(--header-text)] text-sm mb-2">{statOption.label}</h3>
                        <p className="text-2xl font-bold text-[var(--primary)] mb-4">{stat?.value || "—"}</p>
                        <div className="flex gap-2">
                          {stat && (
                            <>
                              <button
                                onClick={() => handleEditStat(stat)}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-[var(--primary)] border border-[var(--border-color)] rounded text-xs hover:bg-gray-50 dark:bg-gray-900"
                              >
                                <Edit2 className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePartner(stat.id)}
                                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-red-600 border border-[var(--border-color)] rounded text-xs hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Partners Section */}
        {activeTab === "partners" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-6">
              <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)]">Partners</h1>
              <button
                onClick={handleAddPartner}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isAddingNew && (
                <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-[var(--header-text)]">Add New Partner</h3>
                      <button onClick={handleCancel} className="text-gray-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--header-text)] mb-2">Partner Logo</label>
                      <div className="w-full h-24 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-background mb-3 relative">
                        {formData.logoPreview ? (
                          <img
                            src={formData.logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            className="w-full h-full object-contain rounded p-2"
                          />
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="block w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer mb-3"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--header-text)] mb-1.5">Partner Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleCancel}
                        className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-xs"
                      >
                        <Save className="w-3 h-3" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4"
                >
                  {editingId === partner.id && editingType === "partner" ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-[var(--header-text)]">Edit Partner</h3>
                        <button onClick={handleCancel} className="text-gray-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs text-[var(--header-text)] mb-2">Partner Logo</label>
                        <div className="w-full h-24 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900 mb-3 relative">
                          {formData.logoPreview ? (
                            <img
                              src={formData.logoPreview || "/placeholder.svg"}
                              alt="Logo preview"
                              className="w-full h-full object-contain rounded p-2"
                            />
                          ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="block w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer mb-3"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[var(--header-text)] mb-1.5">Partner Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleCancel}
                          className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-xs"
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full h-24 bg-gray-100 border border-[var(--border-color)] rounded flex items-center justify-center mb-3">
                        {partner.logo ? (
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            className="w-full h-full object-contain rounded p-2"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">No Logo</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-[var(--header-text)] text-sm mb-3 line-clamp-2">
                        {partner.name}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPartner(partner)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-[var(--primary)] border border-[var(--border-color)] rounded text-xs hover:bg-gray-50 dark:bg-gray-900"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePartner(partner.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-red-600 border border-[var(--border-color)] rounded text-xs hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
