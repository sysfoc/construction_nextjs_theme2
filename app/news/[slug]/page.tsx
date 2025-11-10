"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleContent from "../../components/General/article-content";
import type { NewsArticle } from "@/lib/models/News";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/news/${slug}`);
        if (!response.ok) {
          setNotFoundError(true);
          return;
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-background text-foreground min-h-96">
        <section className="mx-auto max-w-5xl p-4">
          <p className="text-muted-foreground">Loading article...</p>
        </section>
      </main>
    );
  }

  if (notFoundError || !article) {
    return notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-96">
      <section className="mx-auto max-w-5xl p-4">
        <nav className="text-sm">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-[var(--primary)] text-[var(--primary-foreground)]"
            aria-label="Back to News"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span className="font-medium">Back to News</span>
          </Link>
        </nav>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Image side */}
          <div className="relative w-full h-56 md:h-72 rounded-md overflow-hidden border border-border bg-muted">
            <Image
              src={
                article.image ||
                "/placeholder.svg?height=288&width=640&query=construction%20news%20cover"
              }
              alt={article.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Text side */}
          <header className="md:pl-1 md:self-center md:flex md:flex-col md:justify-center">
            <h1 className="text-balance text-2xl font-semibold text-foreground">
              {article.title}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {article.date} •{" "}
              <span className="inline-flex items-center rounded-sm px-2 py-0.5 bg-[var(--primary)] text-[var(--primary-foreground)]">
                {article.author}
              </span>
            </p>
            {article.excerpt ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
            ) : null}
          </header>
        </div>

        <article className="mt-4">
          <ArticleContent paragraphs={article.content} />
        </article>
      </section>
    </main>
  );
}
