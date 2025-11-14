"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, MoveLeft, Newspaper } from "lucide-react";
import ArticleContent from "../../components/General/article-content";
import type { NewsArticle } from "@/lib/models/News";
import Loader from "@/app/components/General/Loader";

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
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (notFoundError || !article) {
    return notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen py-10">
      <section className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Back Button */}
        <nav className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all duration-300 font-semibold text-sm"
            aria-label="Back to News"
          >
            <MoveLeft size={18} aria-hidden="true" />
            <span>BACK TO NEWS</span>
          </Link>
        </nav>

        {/* Article Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
          {/* Text side */}
          <header className="md:pl-2 md:self-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-background border-2 border-border rounded-lg">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-paragraph">
                  {article.date}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border-2 border-primary rounded-lg">
                <User className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary">
                  {article.author}
                </span>
              </div>
            </div>

            {article.excerpt ? (
              <p className="text-sm text-paragraph leading-relaxed border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r">
                {article.excerpt}
              </p>
            ) : null}
          </header>

          {/* Image side */}
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border-2 border-border bg-gradient-to-br from-primary/10 to-primary/5">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Newspaper className="w-16 h-16 text-primary/30" />
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <article className="bg-background rounded-xl border-2 border-border p-6 sm:p-8">
          <ArticleContent paragraphs={article.content} />
        </article>
      </section>
    </main>
  );
}
