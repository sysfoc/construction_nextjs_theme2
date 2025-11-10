"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"

interface Activity {
  id: string
  type: string
  title: string
  date: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [applicationsRes, projectsRes, quotesRes, usersRes] = await Promise.all([
          fetch("/api/job-applications"),
          fetch("/api/projects"),
          fetch("/api/quote"),
          fetch("/api/users"),
        ])

        const applicationsData = await applicationsRes.json()
        const projectsData = await projectsRes.json()
        const quotesData = await quotesRes.json()
        const usersData = await usersRes.json()

        // Combine all activities
        const allActivities: Activity[] = []

        // Add job applications
        if (applicationsData.applications) {
          applicationsData.applications.slice(0, 5).forEach((app: any) => {
            allActivities.push({
              id: app.id,
              type: "application",
              title: `Job application: ${app.position} by ${app.firstName} ${app.lastName}`,
              date: new Date(app.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })
          })
        }

        // Add projects
        if (projectsData && Array.isArray(projectsData)) {
          projectsData.slice(0, 5).forEach((project: any) => {
            allActivities.push({
              id: project._id,
              type: "project",
              title: `${project.status === "completed" ? "Completed" : "Started"} project: ${project.title}`,
              date: new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })
          })
        }

        // Add quotes/inquiries
        if (quotesData && Array.isArray(quotesData)) {
          quotesData.slice(0, 5).forEach((quote: any) => {
            allActivities.push({
              id: quote._id,
              type: "inquiry",
              title: `Quote Request from ${quote.name}`,
              date: new Date(quote.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })
          })
        }

        // Add users
        if (usersData.users) {
          usersData.users.slice(0, 5).forEach((user: any) => {
            allActivities.push({
              id: user.id,
              type: "user",
              title: `New user registered: ${user.name}`,
              date: new Date(user.joinDate || Date.now()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })
          })
        }

        // Sort by date (most recent first) and take top 5
        const sortedActivities = allActivities
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)

        setActivities(sortedActivities)
      } catch (error) {
        console.error("Error fetching activities:", error)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="bg-[var(--background)] border border-[var(--border-color)] rounded">
      <div className="p-4 border-b border-[var(--border-color)]">
        <h2 className="text-lg font-semibold text-[var(--header-text)] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[var(--primary)]" />
          Recent Activity
        </h2>
      </div>
      <div className="divide-y divide-[var(--border-color)]">
        {activities.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No activities yet</div>
        ) : (
          activities.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[var(--header-text)]">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
