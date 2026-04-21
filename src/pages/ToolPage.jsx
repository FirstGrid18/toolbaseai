import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import StarRating from "../components/StarRating";
import SponsoredBadge from "../components/SponsoredBadge";
import ReviewForm from "../components/ReviewForm";
import brand from "../config/brand";
import categories from "../config/categories";
import tools from "../data/tools";
import g2Urls from "../config/g2Urls";
import { supabase } from "../lib/supabase";

export default function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((t) => t.slug === slug);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("tool_id", tool?.id)
          .eq("approved", true)
          .order("created_at", { ascending: false });
        if (!error && data) setReviews(data);
      } catch {
        // Supabase not configured — reviews unavailable
      } finally {
        setLoadingReviews(false);
      }
    }
    if (tool) fetchReviews();
  }, [tool]);

  if (!tool) return <Navigate to="/404" replace />;

  const category = categories.find((c) => c.slug === tool.category);
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);
  const g2Url = g2Urls[tool.slug];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.name,
    description: tool.description,
    url: `${brand.url}/tools/${tool.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      ...(tool.has_free_tier && { price: "0" }),
    },
  };

  return (
    <>
      <Helmet>
        <title>{tool.name} Review — {brand.name}</title>
        <meta name="description" content={`${tool.name}: ${tool.tagline} Read reviews, pricing and features. Best for small businesses.`} />
        <meta property="og:title" content={`${tool.name} — ${brand.name}`} />
        <meta property="og:description" content={tool.tagline} />
        <meta property="og:type" content="product" />
        <link rel="canonical" href={`${brand.url}/tools/${tool.slug}`} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link to={`/category/${category.slug}`} className="hover:text-primary transition-colors">
                {category.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-600 font-medium">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tool header */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                  style={{ backgroundColor: tool.logo_color || "#7C3AED" }}
                  aria-hidden="true"
                >
                  {tool.logo_letter}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h1 className="text-2xl font-bold text-dark">{tool.name}</h1>
                      {category && (
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1 ${category.color}`}>
                          {category.label}
                        </span>
                      )}
                    </div>
                    {tool.is_sponsored && <SponsoredBadge />}
                  </div>
                  <p className="text-gray-500 mt-2 leading-relaxed">{tool.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href={tool.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Visit {tool.name} →
                </a>
                {g2Url && (
                  <a
                    href={g2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    See reviews on G2 →
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-dark mb-3">About {tool.name}</h2>
              <p className="text-gray-600 leading-relaxed">{tool.description}</p>
            </section>

            {/* Use cases */}
            {tool.use_cases && (
              <section>
                <h2 className="text-xl font-bold text-dark mb-3">Best Use Cases</h2>
                <ul className="space-y-2">
                  {tool.use_cases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                      {uc}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Pros and cons */}
            {(tool.pros || tool.cons) && (
              <section>
                <h2 className="text-xl font-bold text-dark mb-4">Pros &amp; Cons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tool.pros && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-1">
                        <span>👍</span> Pros
                      </h3>
                      <ul className="space-y-1.5">
                        {tool.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-green-700 flex items-start gap-1.5">
                            <span className="mt-0.5">+</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tool.cons && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-1">
                        <span>👎</span> Cons
                      </h3>
                      <ul className="space-y-1.5">
                        {tool.cons.map((con, i) => (
                          <li key={i} className="text-sm text-red-700 flex items-start gap-1.5">
                            <span className="mt-0.5">−</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Community reviews */}
            <section>
              <h2 className="text-xl font-bold text-dark mb-4">Community Reviews</h2>
              {loadingReviews ? (
                <p className="text-sm text-gray-400">Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <p className="text-sm text-gray-500">No community reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-dark text-sm">{review.reviewer_name}</span>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
                    </div>
                  ))}
                </div>
              )}
              <ReviewForm toolId={tool.id} toolName={tool.name} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Pricing card */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
              <h3 className="font-semibold text-dark mb-3">Pricing</h3>
              {tool.has_free_tier && (
                <span className="inline-block text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-1 rounded-full font-medium mb-3">
                  ✓ Free tier available
                </span>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">{tool.pricing_summary}</p>
              <div className="mt-3">
                <span className="inline-block text-xs text-gray-400 capitalize bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                  {tool.pricing_type}
                </span>
              </div>
            </div>

            {/* Best for */}
            {tool.best_for?.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                <h3 className="font-semibold text-dark mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.best_for.map((tag) => {
                    const labels = {
                      solo: "Solo founders",
                      startup: "Startups",
                      smallteam: "Small teams",
                      sme: "SMEs",
                    };
                    return (
                      <span
                        key={tag}
                        className="text-xs bg-primary-light text-primary px-2.5 py-1 rounded-full font-medium"
                      >
                        {labels[tag] || tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* G2 reviews link */}
            {g2Url && (
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                <h3 className="font-semibold text-dark mb-2">Independent Reviews</h3>
                <p className="text-xs text-gray-400 mb-3">Read verified user reviews on G2.</p>
                <a
                  href={g2Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  See reviews on G2 →
                </a>
              </div>
            )}

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                <h3 className="font-semibold text-dark mb-3">Related Tools</h3>
                <div className="space-y-3">
                  {relatedTools.map((rt) => (
                    <Link
                      key={rt.slug}
                      to={`/tools/${rt.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: rt.logo_color || "#7C3AED" }}
                        aria-hidden="true"
                      >
                        {rt.logo_letter}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-dark group-hover:text-primary transition-colors">
                          {rt.name}
                        </div>
                        <div className="text-xs text-gray-400">{rt.tagline.slice(0, 45)}...</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={tool.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              Visit {tool.name} →
            </a>
          </aside>
        </div>
      </main>
    </>
  );
}
