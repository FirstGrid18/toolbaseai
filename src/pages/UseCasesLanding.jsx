import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import brand from "../config/brand";
import tools from "../data/tools";

const BUSINESS_TYPES = [
  { value: "freelancer",  label: "Freelancer",     tag: "solo" },
  { value: "startup",     label: "Startup",        tag: "startup" },
  { value: "small-biz",   label: "Small Business", tag: "startup" },
  { value: "ecommerce",   label: "E-Commerce",     tag: "smallteam" },
  { value: "consultant",  label: "Consultant",     tag: "solo" },
  { value: "agency",      label: "Agency",         tag: "startup" },
];

const NEED_FILTERS = [
  { label: "Get more customers",        categories: ["sales", "marketing"] },
  { label: "Get paid",                  categories: ["finance"] },
  { label: "Save time",                 categories: ["automation", "operations"] },
  { label: "Stay organised",            categories: ["operations", "analytics"] },
  { label: "Build your online presence", categories: ["marketing", "design", "content"] },
  { label: "Manage your team",          categories: ["hr", "customer-support", "operations"] },
];

export default function UseCasesLanding() {
  const [businessType, setBusinessType] = useState("");
  const [activeNeed, setActiveNeed] = useState(null);

  const selectedType = BUSINESS_TYPES.find((b) => b.value === businessType) || null;

  let filtered = tools;
  if (selectedType) {
    filtered = filtered.filter((t) => t.best_for?.includes(selectedType.tag));
  }
  if (activeNeed) {
    filtered = filtered.filter((t) => activeNeed.categories.includes(t.category));
  }

  return (
    <>
      <Helmet>
        <title>{`Use Cases | ${brand.name}`}</title>
        <meta name="description" content="Find the best tools for your business type and needs. Filter by Freelancer, Startup, E-Commerce and more." />
        <link rel="canonical" href={`${brand.url}/use-cases`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business type dropdown */}
        <div className="mb-8">
          <select
            value={businessType}
            onChange={(e) => {
              setBusinessType(e.target.value);
              setActiveNeed(null);
            }}
            className="w-full sm:w-72 text-sm border border-[#e0d9f0] rounded-lg px-4 py-2.5 bg-white text-[#4C1D95] font-medium focus:outline-none focus:ring-2 focus:ring-[#6D28D9] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234C1D95' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            <option value="">What type of business are you?</option>
            {BUSINESS_TYPES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">
          {/* Left sidebar — sticky */}
          <aside className="hidden md:block w-52 flex-shrink-0 sticky top-[72px] self-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Filter by need
            </p>
            <div className="flex flex-col gap-2">
              {NEED_FILTERS.map((filter) => {
                const isActive = activeNeed?.label === filter.label;
                return (
                  <button
                    key={filter.label}
                    onClick={() => setActiveNeed(isActive ? null : filter)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      isActive
                        ? "bg-[#4C1D95] text-white border-[#4C1D95]"
                        : "bg-white text-[#4C1D95] border-[#e0d9f0] hover:border-[#4C1D95]"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Mobile need filters (horizontal scroll) */}
          <div className="md:hidden w-full mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NEED_FILTERS.map((filter) => {
              const isActive = activeNeed?.label === filter.label;
              return (
                <button
                  key={filter.label}
                  onClick={() => setActiveNeed(isActive ? null : filter)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    isActive
                      ? "bg-[#4C1D95] text-white border-[#4C1D95]"
                      : "bg-white text-[#4C1D95] border-[#e0d9f0] hover:border-[#4C1D95]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Right content */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <p className="text-gray-400 py-16 text-center text-sm">
                No tools found for this combination.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
