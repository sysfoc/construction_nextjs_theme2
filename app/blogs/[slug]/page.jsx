import BlogDetail from "@/app/components/blog/BlogDetail";

export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.BASE_URL}/api/blog/${params.slug}`);
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
  const res = await fetch(`${process.env.BASE_URL}/api/blog/${params.slug}`);
  const data = await res.json();
  return <BlogDetail blog={data.blog} />;
};

export default BlogPage;
