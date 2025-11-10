"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronsDown, ChevronsUp } from "lucide-react";
import type { NewsArticle } from "@/lib/models/News";

interface NewsSearchListProps {
  items: NewsArticle[];
}

export default function NewsSearchList({ items }: NewsSearchListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  useEffect(() => {
    setVisible(6);
  }, [searchQuery]);

  const shownItems = useMemo(
    () => filteredItems.slice(0, visible),
    [filteredItems, visible]
  );

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative">
        <label htmlFor="news-search" className="sr-only">
          Search news
        </label>
        <input
          id="news-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search news by title, excerpt, or author..."
          className="w-full rounded-md border border-border bg-background text-foreground text-sm px-8 py-2 outline-none"
          role="searchbox"
          aria-label="Search news"
        />
        <Search
          size={16}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {/* News Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shownItems.map((item) => (
          <article
            key={item.slug}
            className="border border-border rounded-md overflow-hidden bg-background hover:border-[var(--primary)] transition-colors"
          >
            <Link href={`/news/${item.slug}`} className="block">
              {/* Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={
                    item.image ||
                    "/placeholder.svg?height=160&width=320&query=construction%20thumbnail"
                  }
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="p-3">
                <h2 className="text-base font-medium text-foreground line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {item.excerpt}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.date} •{" "}
                  <span className="inline-flex items-center rounded-sm px-2 py-0.5 bg-[var(--primary)] text-[var(--primary-foreground)]">
                    {item.author}
                  </span>
                </p>
              </div>
            </Link>
          </article>
        ))}

        {filteredItems.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No news articles found matching your search.
          </p>
        )}
      </div>

      {/* Show More / Show Less */}
      {filteredItems.length > 6 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {visible < filteredItems.length && (
            <button
              type="button"
              onClick={() =>
                setVisible((v) => Math.min(v + 6, filteredItems.length))
              }
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background text-foreground text-sm px-3 py-2"
              aria-label="Show more articles"
            >
              <ChevronsDown size={16} aria-hidden="true" />
              <span>Show more</span>
            </button>
          )}
          {visible > 6 && (
            <button
              type="button"
              onClick={() => setVisible((v) => Math.max(6, v - 6))}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background text-foreground text-sm px-3 py-2"
              aria-label="Show fewer articles"
            >
              <ChevronsUp size={16} aria-hidden="true" />
              <span>Show less</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
