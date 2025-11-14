"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronsDown, ChevronsUp, Calendar, User, Newspaper } from "lucide-react";

interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string | null;
}

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
      <div className="relative mb-8">
        <label htmlFor="news-search" className="sr-only">
          Search news
        </label>
        <input
          id="news-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search news by title, excerpt, or author..."
          className="w-full rounded-lg border-2 border-border bg-background text-foreground text-sm px-10 py-3 outline-none focus:border-primary transition-colors"
          role="searchbox"
          aria-label="Search news"
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
          aria-hidden="true"
        />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shownItems.map((item) => (
          <article
            key={item.slug}
            className="group relative bg-background rounded-xl overflow-hidden border-2 border-border hover:border-primary hover:shadow-2xl transition-all duration-300"
          >
            <a href={`/news/${item.slug}`} className="block">
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-primary/30" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-paragraph line-clamp-2 mb-3">
                  {item.excerpt}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-paragraph">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary">{item.author}</span>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-16 bg-background rounded-2xl border-2 border-dashed border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <p className="text-paragraph text-sm font-medium">
              No news articles found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Show More / Show Less */}
      {filteredItems.length > 6 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {visible < filteredItems.length && (
            <button
              type="button"
              onClick={() =>
                setVisible((v) => Math.min(v + 6, filteredItems.length))
              }
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-background hover:bg-primary/10 hover:border-primary text-foreground text-sm font-semibold px-4 py-2.5 transition-all"
              aria-label="Show more articles"
            >
              <ChevronsDown size={18} className="text-primary" aria-hidden="true" />
              <span>SHOW MORE</span>
            </button>
          )}
          {visible > 6 && (
            <button
              type="button"
              onClick={() => setVisible((v) => Math.max(6, v - 6))}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-background hover:bg-primary/10 hover:border-primary text-foreground text-sm font-semibold px-4 py-2.5 transition-all"
              aria-label="Show fewer articles"
            >
              <ChevronsUp size={18} className="text-primary" aria-hidden="true" />
              <span>SHOW LESS</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}