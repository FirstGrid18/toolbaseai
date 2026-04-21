import { Link } from "react-router-dom";
import SponsoredBadge from "./SponsoredBadge";
import categories from "../config/categories";
import g2Urls from "../config/g2Urls";

export default function ToolCard({ tool }) {
  const category = categories.find((c) => c.slug === tool.category);
  const g2Url = g2Urls[tool.slug];

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className={`group relative flex flex-col bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden ${
        tool.is_sponsored ? "border-2 border-gold/40" : "border border-gray-100"
      }`}
      aria-label={`View ${tool.name}`}
    >
      {/* Sponsored gold accent */}
      {tool.is_sponsored && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold/60 to-transparent" />
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: tool.logo_color || "#7C3AED" }}
              aria-hidden="true"
            >
              {tool.logo_letter}
            </div>
            <div>
              <h3 className="font-semibold text-dark group-hover:text-primary transition-colors leading-tight">
                {tool.name}
              </h3>
              {category && (
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 ${category.color}`}>
                  {category.label}
                </span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            {tool.is_sponsored && <SponsoredBadge />}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-600 mb-3 leading-relaxed flex-1">{tool.tagline}</p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            {tool.has_free_tier && (
              <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium">
                Free tier
              </span>
            )}
            <span className="text-xs text-gray-400 capitalize">{tool.pricing_type}</span>
          </div>

          {g2Url && (
            <a
              href={g2Url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-400 hover:text-primary transition-colors whitespace-nowrap"
            >
              G2 reviews →
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}
