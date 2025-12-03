import BlogDetail from "@/app/components/blog/BlogDetail";

export async function generateMetadata({ params }) {
  const BASE =
    process.env.NODE_ENV === "development"
      ? process.env.BASE_URL
      : process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${BASE}/api/blog/${params.slug}`);
  const data = await res.json();

  if (!data.blog) {
    return {
      title: "Blog not found",
      description: "No blog post found with the given slug.",
    };
  }

  return {
    title: data?.blog?.title,
    description: data?.blog?.metaDescription,
  };
}

const BlogPage = async ({ params }) => {
  const BASE =
    process.env.NODE_ENV === "development"
      ? process.env.BASE_URL
      : process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${BASE}/api/blog/${params.slug}`);
  const data = await res.json();

  return <BlogDetail blog={data.blog} />;
};

export default BlogPage;
