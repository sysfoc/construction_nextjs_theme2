"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Users, Briefcase, Wrench, MessageSquare, UserCheck } from "lucide-react"

interface Stat {
  label: string
  value: number
  icon: React.ComponentType<{ className: string }>
  color: string
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Total Users", value: 0, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Total Projects", value: 0, icon: Briefcase, color: "bg-green-50 text-green-600" },
    { label: "Services", value: 0, icon: Wrench, color: "bg-purple-50 text-purple-600" },
    { label: "Inquiries", value: 0, icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
    { label: "Job Applications", value: 0, icon: UserCheck, color: "bg-indigo-50 text-indigo-600" },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, projectsRes, servicesRes, quotesRes, applicationsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/projects"),
          fetch("/api/services"),
          fetch("/api/quote"),
          fetch("/api/job-applications"),
        ])

        const usersData = await usersRes.json()
        const projectsData = await projectsRes.json()
        const servicesData = await servicesRes.json()
        const quotesData = await quotesRes.json()
        const applicationsData = await applicationsRes.json()

        setStats((prevStats) =>
          prevStats.map((stat) => {
            if (stat.label === "Total Users") return { ...stat, value: usersData.users?.length || 0 }
            if (stat.label === "Total Projects") return { ...stat, value: projectsData?.length || 0 }
            if (stat.label === "Services") return { ...stat, value: servicesData.services?.length || 0 }
            if (stat.label === "Inquiries") return { ...stat, value: quotesData?.length || 0 }
            if (stat.label === "Job Applications") return { ...stat, value: applicationsData.applications?.length || 0 }
            return stat
          }),
        )
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-[var(--header-text)] mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
