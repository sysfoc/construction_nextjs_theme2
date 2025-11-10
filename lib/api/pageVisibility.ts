interface Page {
  _id: string
  slug: string
  name: string
  visible: boolean
  createdAt: string
  updatedAt: string
}

export async function getPageVisibility() {
  const res = await fetch(`/api/page-visibility`)
  if (!res.ok) throw new Error("Failed to fetch page visibility")
  return res.json()
}

export async function updatePageVisibility(id: string, visible: boolean) {
  const res = await fetch(`/api/page-visibility/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visible }),
  })
  if (!res.ok) throw new Error("Failed to update page visibility")
  return res.json()
}

export async function isPageVisible(slug: string) {
  const pages = (await getPageVisibility()) as Page[]
  const page = pages.find((p: Page) => p.slug === slug)
  return page?.visible ?? true
}
