type MembershipsProps = {
  items: Array<{ name: string; org?: string }>
}

export function Memberships({ items }: MembershipsProps) {
  if (!items?.length) return null
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-[var(--page-heading)] leading-tight">Professional Memberships</h2>
      <ul className="flex flex-col gap-1">
        {items.map((m, i) => (
          <li key={i} className="text-xs text-[var(--paragraph-color)] leading-tight">
            {m.name}
            {m.org ? " — " + m.org : ""}
          </li>
        ))}
      </ul>
    </section>
  )
}
