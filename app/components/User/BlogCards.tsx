"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SlantedButton from "../General/buttons/SlantedButton";
import Link from "next/link";

interface BlogPost {
  image: string;
  title: string;
  slug: string;
  blogWriter: string;
  createdAt: string;
}

const BlogCards: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/all");
        const data = await res.json();
        setBlogPosts(data.blogs.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full py-12 px-4">
      {/* View All Blogs */}
      <div className="mb-6 flex justify-end">
        <SlantedButton text="View all Blogs" onClick={() => router.push("/blogs")} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <Link href={`/blogs/${post.slug}`} key={idx}>
              <div className="flex flex-col bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold w-14 h-14 flex flex-col items-center justify-center text-center transform -skew-x-6">
                    <span className="text-xl">{new Date(post.createdAt).getDate()}</span>
                    <span className="text-xs">
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-md font-semibold text-paragraph mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-paragraph/80 mt-auto">
                    By <span className="text-paragraph">{post.blogWriter}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
