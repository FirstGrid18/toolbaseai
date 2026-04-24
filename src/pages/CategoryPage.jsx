import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import brand from "../config/brand";
import categories from "../config/categories";
import tools from "../data/tools";
import comparisons from "../data/comparisons";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/404" replace />;

  const categoryTools = tools.filter((t) => t.category === slug);

  // Find comparisons that involve tools in this category
  const relatedComparisons = comparisons.filter((comp) => {
    const t1 = tools.find((t) => t.slug === comp.tool1_slug);
    const t2 = tools.find((t) => t.slug === comp.tool2_slug);
    return t1?.category === slug || t2?.category === slug;
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best AI ${category.label} Tools for Small Businesses`,
    url: `${brand.url}/category/${slug}`,
    numberOfItems: categoryTools.length,
    itemListElement: categoryTools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `${brand.url}/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>{`Best AI ${category.label} Tools for Small Businesses | ${brand.name}`}</title>
        <meta name="description" content={`Compare the top AI ${category.label.toLowerCase()} tools for SMBs. ${category.description.slice(0, 120)}...`} />
        <meta property="og:title" content={`Best AI ${category.label} Tools for Small Businesses | ${brand.name}`} />
        <meta property="og:description" content={category.description.slice(0, 160)} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${brand.url}/category/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{category.label}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl" aria-hidden="true">{category.icon}</span>
            <h1 className="text-3xl font-bold text-dark">
              Best AI {category.label} Tools for Small Businesses
            </h1>
          </div>
          <p className="text-gray-500 max-w-3xl leading-relaxed">{category.description}</p>
        </header>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Comparison links */}
        {relatedComparisons.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-dark mb-4">
              {category.label} Tool Comparisons
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedComparisons.map((comp) => {
                const t1 = tools.find((t) => t.slug === comp.tool1_slug);
                const t2 = tools.find((t) => t.slug === comp.tool2_slug);
                return (
                  <Link
                    key={comp.slug}
                    to={`/compare/${comp.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors shadow-sm"
                  >
                    {t1?.name} vs {t2?.name} →
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        {category.faqs && (
          <section className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6">
              Frequently Asked Questions - AI {category.label} Tools
            </h2>
            <div className="space-y-6">
              {category.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-dark mb-1.5">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
