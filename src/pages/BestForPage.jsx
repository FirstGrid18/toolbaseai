import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import brand from "../config/brand";
import tools from "../data/tools";
import bestForPages from "../data/bestfor.js";

export default function BestForPage() {
  const { slug } = useParams();
  const page = bestForPages.find((p) => p.slug === slug);

  if (!page) return <Navigate to="/404" replace />;

  // Get full tool objects for callouts
  const calloutTools = page.callouts
    .map((c) => {
      const tool = tools.find((t) => t.slug === c.tool_slug);
      return tool ? { ...c, tool } : null;
    })
    .filter(Boolean);

  // All tools matching the tag
  const taggedTools = tools.filter((t) => t.best_for?.includes(page.tag));

  const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.headline,
    url: `${brand.url}/best-for/${slug}`,
    numberOfItems: calloutTools.length,
    itemListElement: calloutTools.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.tool.name,
      url: `${brand.url}/tools/${c.tool.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>{page.headline} | {brand.name}</title>
        <meta name="description" content={`${page.intro.slice(0, 155)}...`} />
        <meta property="og:title" content={page.headline} />
        <meta property="og:description" content={page.intro.slice(0, 160)} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${brand.url}/best-for/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaItemList)}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-500">Best For</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">{page.label}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-dark mb-4">{page.headline}</h1>
          <p className="text-gray-500 leading-relaxed max-w-3xl">{page.intro}</p>
        </header>

        {/* Curated tool callouts */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-dark mb-6">Top Picks</h2>
          <div className="space-y-5">
            {calloutTools.map(({ tool, benefit }, i) => (
              <div
                key={tool.slug}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-card flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-200 w-7 text-center">
                      {i + 1}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: tool.logo_color || "#7C3AED" }}
                      aria-hidden="true"
                    >
                      {tool.logo_letter}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/tools/${tool.slug}`}
                      className="font-bold text-dark hover:text-primary transition-colors text-lg"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-0.5">{tool.tagline}</p>
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                      <span className="font-medium">Why it works for {page.label.toLowerCase()}:</span>{" "}
                      {benefit}
                    </p>
                    {tool.has_free_tier && (
                      <span className="inline-block mt-2 text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium">
                        Free tier available
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-2 sm:justify-center">
                  <a
                    href={tool.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors text-center whitespace-nowrap"
                  >
                    Visit Tool →
                  </a>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-primary hover:text-primary transition-colors text-center whitespace-nowrap"
                  >
                    Read Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other tools for this audience */}
        {taggedTools.length > calloutTools.length && (
          <section>
            <h2 className="text-xl font-bold text-dark mb-4">
              More Tools for {page.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {taggedTools
                .filter((t) => !page.callouts.find((c) => c.tool_slug === t.slug))
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/tools/${tool.slug}`}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary hover:shadow-card-hover transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: tool.logo_color || "#7C3AED" }}
                      aria-hidden="true"
                    >
                      {tool.logo_letter}
                    </div>
                    <div>
                      <div className="font-medium text-dark group-hover:text-primary transition-colors text-sm">
                        {tool.name}
                      </div>
                      <div className="text-xs text-gray-400">{tool.tagline.slice(0, 50)}...</div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* Navigation between best-for pages */}
        <section className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Browse By Business Type
          </h3>
          <div className="flex flex-wrap gap-3">
            {bestForPages.map((p) => (
              <Link
                key={p.slug}
                to={`/best-for/${p.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  p.slug === slug
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
