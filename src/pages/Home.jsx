import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import AdSlot from "../components/AdSlot";
import NewsletterStrip from "../components/NewsletterStrip";
import brand from "../config/brand";
import categories from "../config/categories";
import tools from "../data/tools";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rated", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
];

function sortTools(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case "rated":
      return sorted.sort((a, b) => (b.g2_rating || 0) - (a.g2_rating || 0));
    case "reviews":
      return sorted.sort((a, b) => (b.g2_review_count || 0) - (a.g2_review_count || 0));
    case "popular":
    default:
      return sorted.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return (b.g2_review_count || 0) - (a.g2_review_count || 0);
      });
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTools = useMemo(() => {
    let list = tools;

    if (activeCategory !== "all") {
      list = list.filter((t) => t.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    return sortTools(list, sortBy);
  }, [query, activeCategory, sortBy]);

  // Split tools for ad placement after row 2 (6 cards on desktop)
  const firstBatch = filteredTools.slice(0, 6);
  const restBatch = filteredTools.slice(6);

  const schemaWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.tagline,
    potentialAction: {
      "@type": "SearchAction",
      target: `${brand.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        <title>{brand.name} — {brand.tagline}</title>
        <meta name="description" content={`Discover and compare the best AI tools for small businesses. ${brand.tagline}. Honest reviews, discounts and expert picks.`} />
        <meta property="og:title" content={`${brand.name} — ${brand.tagline}`} />
        <meta property="og:description" content="Discover and compare the best AI tools for small businesses. Honest reviews, discounts and expert picks." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={brand.url} />
        <script type="application/ld+json">{JSON.stringify(schemaWebsite)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white pt-14 pb-10 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark leading-tight mb-4">
            Discover the best AI tools<br className="hidden sm:block" /> for small businesses
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Simple AI tools chosen for small teams, startups and growing businesses worldwide.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI tools by name, category or use case..."
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              aria-label="Search tools"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Category tabs (scrollable on mobile) */}
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1 min-w-0 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <label htmlFor="sort-select" className="text-sm text-gray-500 whitespace-nowrap">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-4">
          {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found
          {activeCategory !== "all" && ` in ${categories.find((c) => c.slug === activeCategory)?.label}`}
          {query && ` for "${query}"`}
        </p>

        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500">No tools found matching your search. Try a different query.</p>
          </div>
        ) : (
          <>
            {/* First batch of tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {firstBatch.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* Ad slot after row 2 */}
            <AdSlot slot="homepage-mid" position="homepage-mid" />

            {/* Newsletter */}
            <NewsletterStrip />

            {/* Rest of tools */}
            {restBatch.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {restBatch.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}

            {/* Bottom ad */}
            <AdSlot slot="homepage-bottom" position="homepage-bottom" />
          </>
        )}

        {/* List Your Tool CTA banner */}
        <section className="mt-12 bg-dark rounded-2xl px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Got an AI tool for SMBs?</h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Get your tool listed on {brand.name} and reach thousands of small business owners looking for exactly what you built.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            List Your Tool →
          </Link>
        </section>
      </main>
    </>
  );
}
