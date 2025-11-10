// app/admin/components/newsletter/stats-cards.tsx
import { Users } from "lucide-react"

interface StatsCardsProps {
  totalSubscribers: number
  activeSubscribers: number
}

export function StatsCards({ totalSubscribers, activeSubscribers }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Subscribers</p>
            <p className="text-lg sm:text-xl font-semibold text-[var(--header-text)]">{totalSubscribers}</p>
          </div>
        </div>
      </div>
      <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Active Subscribers</p>
            <p className="text-lg sm:text-xl font-semibold text-[var(--header-text)]">{activeSubscribers}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
