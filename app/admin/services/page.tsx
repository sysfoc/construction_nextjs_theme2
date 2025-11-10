"use client"
import { useState } from "react"
import ServicesSection from "./Servicessection"
import ServicesButton from "./ServicesButton"

export default function ServicesManagementPage() {
  const [activeTab, setActiveTab] = useState<"services" | "button">("services")

  const handleDataChange = () => {
    // This callback can be used if you need to sync data between components
    // Currently it just triggers re-fetching in each component independently
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words mb-6">
          Services Management
        </h1>

        <div className="flex gap-2 mb-6 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-colors ${
              activeTab === "services"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab("button")}
            className={`px-4 py-2 font-medium text-sm sm:text-base transition-colors ${
              activeTab === "button"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Button Settings
          </button>
        </div>

        {activeTab === "services" && <ServicesSection onDataChange={handleDataChange} />}
        {activeTab === "button" && <ServicesButton onDataChange={handleDataChange} />}
      </div>
    </div>
  )
}