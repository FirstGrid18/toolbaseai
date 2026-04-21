import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import brand from "../config/brand";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-dark text-lg hidden sm:block">{brand.name}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-gray-600 hover:text-dark"}`
            }
          >
            Browse Tools
          </NavLink>
          <NavLink
            to="/use-cases/startups"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-gray-600 hover:text-dark"}`
            }
          >
            Use Cases
          </NavLink>
          <NavLink
            to="/compare/jasper-vs-copy-ai"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-gray-600 hover:text-dark"}`
            }
          >
            Compare
          </NavLink>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/submit"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            List Your Tool
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            Browse Tools
          </NavLink>
          <NavLink
            to="/use-cases/startups"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            Use Cases
          </NavLink>
          <NavLink
            to="/compare/jasper-vs-copy-ai"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            Compare
          </NavLink>
          <Link
            to="/submit"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            List Your Tool
          </Link>
        </div>
      )}
    </header>
  );
}
