// app/blogs/[slug]/page.jsx
import BlogDetail from "@/app/components/blog/BlogDetail"

export async function generateMetadata({ params }) {
  const resolvedParams = await params
   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL
  try {
    const res = await fetch(`${BASE_URL}/api/blog/${resolvedParams.slug}`, {
      cache: "no-store",
    })
    
    if (!res.ok) {
      return {
        title: "Blog not found",
        description: "No blog post found with the given slug.",
      }
    }
    
    const data = await res.json()

    if (!data.blog) {
      return {
        title: "Blog not found",
        description: "No blog post found with the given slug.",
      }
    }

    return {
      title: data.blog.metaTitle || data.blog.title,
      description: data.blog.metaDescription,
    }
  } catch (error) {
    console.log("Metadata fetch error:", error)
    return {
      title: "Blog not found",
      description: "No blog post found with the given slug.",
    }
  }
}

const BlogPage = async ({ params }) => {
  const resolvedParams = await params
   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL

  try {
    const res = await fetch(`${BASE_URL}/api/blog/${resolvedParams.slug}`, { 
      cache: "no-store" 
    })
    
    console.log("[DEBUG] API response status:", res.status)

    if (!res.ok) {
      return (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-red-600">Blog post not found.</p>
          <p className="text-sm text-gray-500">Slug: {resolvedParams.slug}</p>
        </div>
      )
    }

    const data = await res.json()

    if (!data.blog) {
      return (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-red-600">Blog post not found.</p>
          <p className="text-sm text-gray-500">Slug: {resolvedParams.slug}</p>
        </div>
      )
    }

    return <BlogDetail blog={data.blog} />
  } catch (error) {
    console.log("Blog fetch error:", error)
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold text-red-600">Error loading blog post.</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    )
  }
}

export default BlogPage