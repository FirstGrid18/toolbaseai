import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0D0618] border-b border-white/[0.06] shadow-sm">
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <Logo animated />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#A78BFA]" : "text-[#ccc] hover:text-white"}`
            }
          >
            Browse Tools
          </NavLink>
          <NavLink
            to="/use-cases/startups"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#A78BFA]" : "text-[#ccc] hover:text-white"}`
            }
          >
            Use Cases
          </NavLink>
          <NavLink
            to="/compare/jasper-vs-copy-ai"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#A78BFA]" : "text-[#ccc] hover:text-white"}`
            }
          >
            Compare
          </NavLink>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/submit"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-transparent text-[#A78BFA] text-sm font-semibold border border-[#6D28D9] rounded-[6px] hover:bg-[#6D28D9]/10 transition-colors"
          >
            List Your Tool
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#ccc] hover:bg-white/10 transition-colors"
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
        <div className="md:hidden bg-[#0D0618] border-t border-white/[0.06] px-4 py-4 flex flex-col gap-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#A78BFA]" : "text-[#ccc] hover:text-white"}`
            }
          >
            Browse Tools
          </NavLink>
          <NavLink
            to="/use-cases/startups"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#A78BFA]" : "text-[#ccc] hover:text-white"}`
            }
          >
            Use Cases
          </NavLink>
          <NavLink
            to="/compare/jasper-vs-copy-ai"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-[#A78BFA]" : "text-[#ccc] hover:text-white"}`
            }
          >
            Compare
          </NavLink>
          <Link
            to="/submit"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center px-4 py-2 bg-transparent text-[#A78BFA] text-sm font-semibold border border-[#6D28D9] rounded-[6px] hover:bg-[#6D28D9]/10 transition-colors"
          >
            List Your Tool
          </Link>
        </div>
      )}
    </header>
  );
}
