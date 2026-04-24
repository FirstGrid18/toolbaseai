import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import brand from "../config/brand";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>{`Page Not Found | ${brand.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🔭</div>
        <h1 className="text-3xl font-bold text-dark mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist. It may have been moved or the URL might be incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Back to {brand.name}
        </Link>
      </main>
    </>
  );
}
