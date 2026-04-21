import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ComparisonTable from "../components/ComparisonTable";
import brand from "../config/brand";
import tools from "../data/tools";
import comparisons from "../data/comparisons";
import g2Urls from "../config/g2Urls";

export default function ComparisonPage() {
  const { slug } = useParams();
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) return <Navigate to="/404" replace />;

  const tool1 = tools.find((t) => t.slug === comparison.tool1_slug);
  const tool2 = tools.find((t) => t.slug === comparison.tool2_slug);

  if (!tool1 || !tool2) return <Navigate to="/404" replace />;

  const winner = tools.find((t) => t.slug === comparison.recommendation.winner);
  const budgetPick = tools.find((t) => t.slug === comparison.recommendation.best_for_budget);

  const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: comparison.headline,
    url: `${brand.url}/compare/${slug}`,
    numberOfItems: 2,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tool1.name, url: `${brand.url}/tools/${tool1.slug}` },
      { "@type": "ListItem", position: 2, name: tool2.name, url: `${brand.url}/tools/${tool2.slug}` },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{comparison.headline} | {brand.name}</title>
        <meta name="description" content={comparison.summary.slice(0, 160)} />
        <meta property="og:title" content={comparison.headline} />
        <meta property="og:description" content={comparison.summary.slice(0, 160)} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${brand.url}/compare/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaItemList)}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">
            {tool1.name} vs {tool2.name}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-dark mb-4">{comparison.headline}</h1>
          <p className="text-gray-500 leading-relaxed max-w-3xl">{comparison.summary}</p>
        </header>

        {/* Tool cards hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {[tool1, tool2].map((tool) => (
            <div
              key={tool.slug}
              className={`bg-white border rounded-xl p-6 shadow-card ${
                tool.slug === comparison.recommendation.winner
                  ? "border-primary ring-1 ring-primary"
                  : "border-gray-100"
              }`}
            >
              {tool.slug === comparison.recommendation.winner && (
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
                  ★ Our Pick
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
              <p className="text-sm text-gray-500 mb-4">{tool.pricing_summary}</p>
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

        {/* Comparison table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-4">Feature Comparison</h2>
          <ComparisonTable
            features={comparison.features}
            tool1Name={tool1.name}
            tool2Name={tool2.name}
          />
        </section>

        {/* G2 review links */}
        <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[tool1, tool2].map((tool) => {
            const g2Url = g2Urls[tool.slug];
            return (
              <div key={tool.slug} className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                <h3 className="font-semibold text-dark mb-2">{tool.name} - User Reviews</h3>
                <p className="text-xs text-gray-400 mb-3">Read verified reviews from real users on G2.</p>
                {g2Url && (
                  <a
                    href={g2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    See reviews on G2 →
                  </a>
                )}
              </div>
            );
          })}
        </section>

        {/* Recommendation block */}
        <section className="bg-primary-light border border-primary/20 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold text-dark mb-4">Our Verdict</h2>
          <p className="text-gray-600 leading-relaxed mb-5">{comparison.recommendation.reasoning}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-primary/20">
              <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Best Overall</div>
              <div className="font-bold text-dark">{winner?.name}</div>
              <p className="text-xs text-gray-500 mt-1">{winner?.tagline}</p>
              <a
                href={winner?.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm text-primary font-semibold hover:underline"
              >
                Try {winner?.name} →
              </a>
            </div>

            {budgetPick?.slug !== winner?.slug && (
              <div className="bg-white rounded-xl p-4 border border-gold/30">
                <div className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">Best Value</div>
                <div className="font-bold text-dark">{budgetPick?.name}</div>
                <p className="text-xs text-gray-500 mt-1">{budgetPick?.tagline}</p>
                <a
                  href={budgetPick?.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm text-primary font-semibold hover:underline"
                >
                  Try {budgetPick?.name} →
                </a>
              </div>
            )}
          </div>
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
      </main>
    </>
  );
}
