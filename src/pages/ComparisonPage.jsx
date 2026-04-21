import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ComparisonTable from "../components/ComparisonTable";
import brand from "../config/brand";
import tools from "../data/tools";
import comparisons from "../data/comparisons";
import categories from "../config/categories";
import g2Urls from "../config/g2Urls";

function getCategoryLabel(slug) {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

function formatPricingType(type) {
  return { freemium: "Freemium", paid: "Paid", free: "Free" }[type] ?? type;
}

const sortedTools = [...tools].sort((a, b) => a.name.localeCompare(b.name));

export default function ComparisonPage() {
  const { slug } = useParams();
  const preset = comparisons.find((c) => c.slug === slug);

  const [tool1Slug, setTool1Slug] = useState(
    preset?.tool1_slug ?? sortedTools[0]?.slug ?? ""
  );
  const [tool2Slug, setTool2Slug] = useState(
    preset?.tool2_slug ?? sortedTools[1]?.slug ?? ""
  );

  const tool1 = tools.find((t) => t.slug === tool1Slug);
  const tool2 = tools.find((t) => t.slug === tool2Slug);
  const different = tool1 && tool2 && tool1.slug !== tool2.slug;

  const autoFeatures = different
    ? [
        { feature: "Category", tool1: getCategoryLabel(tool1.category), tool2: getCategoryLabel(tool2.category) },
        { feature: "Pricing Model", tool1: formatPricingType(tool1.pricing_type), tool2: formatPricingType(tool2.pricing_type) },
        { feature: "Free Tier", tool1: tool1.has_free_tier ? "Yes" : "No", tool2: tool2.has_free_tier ? "Yes" : "No" },
        { feature: "G2 Rating", tool1: tool1.g2_rating ? `${tool1.g2_rating} / 5` : "N/A", tool2: tool2.g2_rating ? `${tool2.g2_rating} / 5` : "N/A" },
        { feature: "G2 Reviews", tool1: tool1.g2_review_count ? tool1.g2_review_count.toLocaleString() : "N/A", tool2: tool2.g2_review_count ? tool2.g2_review_count.toLocaleString() : "N/A" },
      ]
    : [];

  const winner =
    different && (tool1.g2_rating ?? 0) >= (tool2.g2_rating ?? 0) ? tool1 : tool2;

  const title = different ? `${tool1.name} vs ${tool2.name}` : "Compare Tools";

  return (
    <>
      <Helmet>
        <title>{title} | {brand.name}</title>
        <meta
          name="description"
          content={`Compare ${title} - pricing, features, ratings and reviews to find the best tool for your small business.`}
        />
        <meta property="og:title" content={`${title} | ${brand.name}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${brand.url}/compare/${slug ?? "compare"}`} />
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Compare Tools</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">{title}</h1>
          <p className="text-gray-500">Select any two tools to compare side by side.</p>
        </header>

        {/* Tool selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 p-5 bg-white border border-gray-100 rounded-xl shadow-card">
          {[
            { label: "Tool 1", value: tool1Slug, set: setTool1Slug, other: tool2Slug },
            { label: "Tool 2", value: tool2Slug, set: setTool2Slug, other: tool1Slug },
          ].map(({ label, value, set, other }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {label}
              </label>
              <select
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-dark"
              >
                {sortedTools.map((t) => (
                  <option key={t.slug} value={t.slug} disabled={t.slug === other}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {!different && (
          <p className="text-center text-gray-400 py-10">
            Please select two different tools to compare.
          </p>
        )}

        {different && (
          <>
            {/* Tool cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {[tool1, tool2].map((tool) => (
                <div
                  key={tool.slug}
                  className={`bg-white border rounded-xl p-6 shadow-card ${
                    winner?.slug === tool.slug
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-100"
                  }`}
                >
                  {winner?.slug === tool.slug && (
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
                      ★ Higher Rated
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                      style={{ backgroundColor: tool.logo_color || "#7C3AED" }}
                      aria-hidden="true"
                    >
                      {tool.logo_letter}
                    </div>
                    <div>
                      <h2 className="font-bold text-dark">{tool.name}</h2>
                      <p className="text-xs text-gray-400">{tool.tagline}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {formatPricingType(tool.pricing_type)}
                    </span>
                    {tool.has_free_tier && (
                      <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-1 rounded-full">
                        Free tier
                      </span>
                    )}
                    {tool.g2_rating && (
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                        ★ {tool.g2_rating}
                      </span>
                    )}
                  </div>
                  <a
                    href={tool.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Visit {tool.name} →
                  </a>
                </div>
              ))}
            </div>

            {/* Feature comparison table */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-dark mb-4">Feature Comparison</h2>
              <ComparisonTable
                features={autoFeatures}
                tool1Name={tool1.name}
                tool2Name={tool2.name}
              />
            </section>

            {/* Pros & Cons */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-dark mb-4">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[tool1, tool2].map((tool) => (
                  <div key={tool.slug} className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                    <h3 className="font-semibold text-dark mb-3">{tool.name}</h3>
                    {tool.pros?.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {tool.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    )}
                    {tool.cons?.length > 0 && (
                      <ul className="space-y-2">
                        {tool.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* G2 review links */}
            <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[tool1, tool2].map((tool) => {
                const g2Url = g2Urls[tool.slug];
                return (
                  <div key={tool.slug} className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                    <h3 className="font-semibold text-dark mb-2">{tool.name} - User Reviews</h3>
                    <p className="text-xs text-gray-400 mb-3">
                      Read verified reviews from real users on G2.
                    </p>
                    {g2Url ? (
                      <a
                        href={g2Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary font-semibold hover:underline"
                      >
                        See reviews on G2 →
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">No G2 listing available.</span>
                    )}
                  </div>
                );
              })}
            </section>

            {/* Links to full tool pages */}
            <div className="flex flex-wrap gap-4">
              <Link to={`/tools/${tool1.slug}`} className="text-sm text-primary hover:underline font-medium">
                Full {tool1.name} review →
              </Link>
              <Link to={`/tools/${tool2.slug}`} className="text-sm text-primary hover:underline font-medium">
                Full {tool2.name} review →
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}
