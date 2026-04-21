import { Link } from "react-router-dom";
import brand from "../config/brand";
import categories from "../config/categories";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              <span className="text-white font-bold">{brand.name}</span>
            </Link>
            <p className="text-sm leading-relaxed">{brand.tagline}</p>
            <p className="text-sm mt-3">
              <a href={`mailto:${brand.contactEmail}`} className="hover:text-white transition-colors">
                {brand.contactEmail}
              </a>
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">More</h3>
            <ul className="space-y-2">
              {categories.slice(6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Best for */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Best For</h3>
            <ul className="space-y-2">
              {[
                { slug: "freelancers", label: "Freelancers" },
                { slug: "startups", label: "Startups" },
                { slug: "ecommerce", label: "E-Commerce" },
                { slug: "consultants", label: "Consultants" },
              ].map((page) => (
                <li key={page.slug}>
                  <Link
                    to={`/best-for/${page.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/submit" className="text-sm hover:text-white transition-colors">
                  List Your Tool
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p className="text-center text-gray-500">
            Affiliate disclosure: {brand.name} may earn a commission when you click links to partner tools at no extra cost to you.
            We only feature tools we believe provide genuine value to small businesses.
          </p>
        </div>
        <p className="text-center text-gray-600 text-xs mt-4">
          Toolbase Marketplace is an independent directory. Some links may become affiliate links in future.
        </p>
      </div>
    </footer>
  );
}
