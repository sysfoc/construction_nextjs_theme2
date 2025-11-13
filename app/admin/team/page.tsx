"use client"
import { Save, Plus, Trash2, Edit2, X, User } from "lucide-react"
import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"
import Loader from "@/app/components/General/Loader"

interface TeamMember {
  id: string
  name: string
  designation: string
  photo: string | null
}

interface FormData {
  name: string
  designation: string
  photoPreview: string | null
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMember, setEditingMember] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    designation: "",
    photoPreview: null,
  })

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team")
        const data = await response.json()
        setTeamMembers(data.teamMembers || [])
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member.id)
    setFormData({
      name: member.name,
      designation: member.designation,
      photoPreview: member.photo,
    })
  }

  const handleCancel = () => {
    setEditingMember(null)
    setIsAddingNew(false)
    setFormData({
      name: "",
      designation: "",
      photoPreview: null,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  const handleSaveMember = async () => {
    try {
      if (isAddingNew) {
        // Create new member
        const response = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            designation: formData.designation,
            photo: formData.photoPreview,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const newMember = data.teamMember
          setTeamMembers((prev) => [newMember, ...prev])
          handleCancel()
        }
      } else {
        // Update existing member
        const response = await fetch(`/api/team/${editingMember}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            designation: formData.designation,
            photo: formData.photoPreview,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const updated = data.teamMember
          setTeamMembers((prev) => prev.map((item) => (item.id === editingMember ? updated : item)))
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving team member:", error)
    }
  }

  const handleAddMember = () => {
    setIsAddingNew(true)
    setEditingMember(null)
    setFormData({
      name: "",
      designation: "",
      photoPreview: null,
    })
  }

  const handleDeleteMember = async (id: string) => {
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTeamMembers((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error("Error deleting team member:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader/>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words">Team Management</h1>
          <button
            onClick={handleAddMember}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {isAddingNew && (
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Add Team Member</h3>
                  <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Member Photo</label>
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="relative w-32 h-52 sm:w-40 sm:h-64 border-2 border-dashed border-[var(--border-color)] rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                      {formData.photoPreview ? (
                        <Image
                          src={formData.photoPreview || "/placeholder.svg"}
                          alt="Photo preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended: 340x530px portrait image</p>
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
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMember}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 flex-shrink-0" />
                    <span>Save Member</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden"
            >
              {editingMember === member.id ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Team Member</h3>
                    <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Member Photo</label>
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className="relative w-32 h-52 sm:w-40 sm:h-64 border-2 border-dashed border-[var(--border-color)] rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                        {formData.photoPreview ? (
                          <Image
                            src={formData.photoPreview || "/placeholder.svg"}
                            alt="Photo preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-2">Recommended: 340x530px portrait image</p>
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
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveMember}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                    >
                      <Save className="w-4 h-4 flex-shrink-0" />
                      <span>Save Member</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 w-full">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                    <div className="relative w-16 h-24 sm:w-20 sm:h-32 rounded-lg bg-gray-100 border border-[var(--border-color)] flex items-center justify-center overflow-hidden flex-shrink-0">
                      {member.photo ? (
                        <Image
                          src={member.photo || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--header-text)] text-sm sm:text-base break-words">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 break-words">{member.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                    <button onClick={() => handleEdit(member)} className="p-2 text-[var(--primary)] rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-red-600 rounded">
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
