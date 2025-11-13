// app/admin/settings/general/page.tsx
"use client"
import {
  Upload,
  Save,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  MessageCircle,
  Send,
  MessageSquare,
  Music,
  Dribbble,
  Palette,
  Play,
  Users,
  BookOpen,
  AtSign,
} from "lucide-react"
import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { SocialLink } from "@/lib/models/GeneralSettings"
import Loader from "@/app/components/General/Loader"

const SOCIAL_PLATFORMS = [
  { name: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600" },
  { name: "twitter", label: "Twitter/X", icon: Twitter, color: "text-sky-500" },
  { name: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-600" },
  { name: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { name: "youtube", label: "YouTube", icon: Youtube, color: "text-red-600" },
  { name: "github", label: "GitHub", icon: Github, color: "text-gray-800" },
  { name: "discord", label: "Discord", icon: MessageCircle, color: "text-indigo-600" },
  { name: "telegram", label: "Telegram", icon: Send, color: "text-sky-600" },
  { name: "whatsapp", label: "WhatsApp", icon: MessageSquare, color: "text-green-600" },
  { name: "tiktok", label: "TikTok", icon: Music, color: "text-black" },
  { name: "pinterest", label: "Pinterest", icon: Dribbble, color: "text-pink-500" },
  { name: "dribbble", label: "Dribbble", icon: Palette, color: "text-pink-600" },
  { name: "behance", label: "Behance", icon: Palette, color: "text-blue-600" },
  { name: "twitch", label: "Twitch", icon: Play, color: "text-purple-600" },
  { name: "reddit", label: "Reddit", icon: Users, color: "text-orange-600" },
  { name: "medium", label: "Medium", icon: BookOpen, color: "text-gray-700" },
  { name: "mastodon", label: "Mastodon", icon: AtSign, color: "text-purple-700" },
]

export default function GeneralSettingsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    phone: "",
    email: "",
    officeHours: "",
  })

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/general-settings")
        const data = await response.json()
        if (data.settings) {
          setFormData({
            companyName: data.settings.companyName,
            address: data.settings.address,
            phone: data.settings.phone,
            email: data.settings.email,
            officeHours: data.settings.officeHours,
          })
          setSocialLinks(data.settings.socialLinks || [])
          if (data.settings.logo) {
            setLogoPreview(data.settings.logo)
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

const handleSocialLinkChange = (platform: string, url: string) => {
  setSocialLinks((prev) => {
    if (!url) {
      return prev.filter((link) => link.platform !== platform)
    }
    
    const existing = prev.find((link) => link.platform === platform)
    if (existing) {
      return prev.map((link) => 
        link.platform === platform ? { ...link, url } : link
      )
    }
    return [...prev, { platform, url }]
  })
}

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/general-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          logo: logoPreview,
          socialLinks: socialLinks.filter((link) => link.url),
        }),
      })

      if (response.ok) {
        alert("Settings saved successfully!")
      } else {
        alert("Failed to save settings")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Error saving settings")
    } finally {
      setSaving(false)
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
    <div className="p-4 mx-auto bg-background min-h-screen">
      <h1 className="text-2xl font-semibold text-[var(--header-text)] mb-6">General Settings</h1>

      <div className="space-y-6">
        {/* Company Logo */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-6">
          <h2 className="text-lg font-semibold text-[var(--header-text)] mb-4">Company Logo</h2>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-32 h-32 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              {logoPreview ? (
                <div className="relative w-full h-full p-2">
                  <Image src={logoPreview || "/placeholder.svg"} alt="Logo preview" fill className="object-contain" />
                </div>
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <label className="block">
                <span className="text-sm text-[var(--header-text)] mb-2 block">Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Recommended size: 200x200px. Max file size: 2MB</p>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-6">
          <h2 className="text-lg font-semibold text-[var(--header-text)] mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--header-text)] mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--header-text)] mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--header-text)] mb-2">Office Hours</label>
              <input
                type="text"
                name="officeHours"
                value={formData.officeHours}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-6">
          <h2 className="text-lg font-semibold text-[var(--header-text)] mb-4">Social Media Links</h2>
          <p className="text-sm text-gray-600 mb-4">Leave empty to hide on user side</p>
          <div className="space-y-4">
            {SOCIAL_PLATFORMS.map(({ name, label, icon: Icon, color }) => {
              const currentLink = socialLinks.find((link) => link.platform === name)
              return (
                <div key={name} className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <input
                    type="url"
                    value={currentLink?.url || ""}
                    onChange={(e) => handleSocialLinkChange(name, e.target.value)}
                    placeholder={`${label} URL`}
                    className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
