import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import NewsletterStrip from "../components/NewsletterStrip";
import brand from "../config/brand";
import categories from "../config/categories";
import tools from "../data/tools";

const QUICK_FILTERS = [
  { label: "Get more customers", categories: ["sales", "marketing"] },
  { label: "Get paid", categories: ["finance"] },
  { label: "Save time", categories: ["automation", "operations"] },
  { label: "Stay organised", categories: ["operations", "analytics"] },
  { label: "Build your online presence", categories: ["marketing", "design", "content"] },
  { label: "Manage your team", categories: ["hr", "customer-support", "operations"] },
];

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
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);
  const [sortBy, setSortBy] = useState("popular");

  function handleQuickFilter(filter) {
    if (activeQuickFilter?.label === filter.label) {
      setActiveQuickFilter(null);
    } else {
      setActiveQuickFilter(filter);
      setActiveCategory("all");
    }
  }

  function handleCategoryFilter(slug) {
    setActiveCategory(slug);
    setActiveQuickFilter(null);
  }

  let filteredTools = tools;
  if (activeQuickFilter) {
    filteredTools = filteredTools.filter((t) => activeQuickFilter.categories.includes(t.category));
  } else if (activeCategory !== "all") {
    filteredTools = filteredTools.filter((t) => t.category === activeCategory);
  }
  if (query.trim()) {
    const q = query.toLowerCase();
    filteredTools = filteredTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  filteredTools = sortTools(filteredTools, sortBy);

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
        <title>{`${brand.name} - ${brand.tagline}`}</title>
        <meta name="description" content={`Discover and compare the best AI tools for small businesses. ${brand.tagline}. Honest reviews, discounts and expert picks.`} />
        <meta property="og:title" content={`${brand.name} - ${brand.tagline}`} />
        <meta property="og:description" content="Discover and compare the best AI tools for small businesses. Honest reviews, discounts and expert picks." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={brand.url} />
        <script type="application/ld+json">{JSON.stringify(schemaWebsite)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white pt-14 pb-10 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark leading-tight mb-4">
            Find the right tools to run and grow your business
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Simple business tools for getting customers, getting paid, saving time and staying organised.
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
              placeholder="Search tools by name, category or need..."
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              aria-label="Search tools"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick filter row */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
          {QUICK_FILTERS.map((filter) => {
            const isActive = activeQuickFilter?.label === filter.label;
            return (
              <button
                key={filter.label}
                onClick={() => handleQuickFilter(filter)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Category tabs (scrollable on mobile) */}
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1 min-w-0 scrollbar-hide">
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all" && !activeQuickFilter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryFilter(cat.slug)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.slug && !activeQuickFilter
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
          {activeQuickFilter && ` for "${activeQuickFilter.label}"`}
          {!activeQuickFilter && activeCategory !== "all" && ` in ${categories.find((c) => c.slug === activeCategory)?.label}`}
          {query && ` matching "${query}"`}
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


          </>
        )}

        {/* List Your Tool CTA banner */}
        <section className="mt-12 bg-dark rounded-2xl px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Got a tool for small businesses?</h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            List your tool on Toolbase Marketplace and reach business owners looking for practical software that helps them work better.
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
