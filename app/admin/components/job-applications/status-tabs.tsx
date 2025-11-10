"use client"

interface StatusTabsProps {
  activeTab: "all" | "pending" | "accepted" | "rejected"
  onTabChange: (tab: "all" | "pending" | "accepted" | "rejected") => void
  counts: {
    all: number
    pending: number
    accepted: number
    rejected: number
  }
}

export function StatusTabs({ activeTab, onTabChange, counts }: StatusTabsProps) {
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "accepted", label: "Accepted", count: counts.accepted },
    { id: "rejected", label: "Rejected", count: counts.rejected },
  ] as const

  return (
    <div className="flex gap-2 mb-6 border-b border-[var(--border-color)] overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === tab.id
              ? "border-[var(--primary)] text-[var(--primary)]"
              : "border-transparent text-[var(--paragraph-color)] hover:text-[var(--foreground)]"
          }`}
        >
          {tab.label}
          <span className="ml-2 text-xs bg-gray-200 text-black px-2 py-1 rounded-full">{tab.count}</span>
        </button>
      ))}
    </div>
  )
}
