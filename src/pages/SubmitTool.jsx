import { useState } from "react";
import { Helmet } from "react-helmet-async";
import brand from "../config/brand";
import categories from "../config/categories";
import { supabase } from "../lib/supabase";

const initialForm = {
  company_name: "",
  tool_name: "",
  website_url: "",
  category: "",
  description: "",
  affiliate_url: "",
  discount_offer: "",
  contact_email: "",
  apply_sponsored: false,
  apply_newsletter: false,
};

export default function SubmitTool() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const { error } = await supabase.from("tool_submissions").insert({
        company_name: form.company_name.trim(),
        tool_name: form.tool_name.trim(),
        website_url: form.website_url.trim(),
        category: form.category,
        description: form.description.trim(),
        affiliate_url: form.affiliate_url.trim() || null,
        discount_offer: form.discount_offer.trim() || null,
        contact_email: form.contact_email.trim(),
        apply_sponsored: form.apply_sponsored,
        apply_newsletter: form.apply_newsletter,
        status: "pending",
      });

      if (error) throw error;
      setStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        <Helmet>
          <title>Tool Submitted | {brand.name}</title>
        </Helmet>
        <main className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-dark mb-2">Thanks! We'll review your submission within 3–5 business days.</h1>
          <button
            onClick={() => { setForm(initialForm); setStatus("idle"); }}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Submit another tool
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>List Your Tool | {brand.name}</title>
        <meta name="description" content={`Submit your tool to ${brand.name} and reach thousands of small business owners looking for tools like yours.`} />
        <meta property="og:title" content={`List Your Tool | ${brand.name}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${brand.url}/submit`} />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">List Your Tool</h1>
          <p className="text-gray-500 leading-relaxed">
            Reach thousands of small business owners actively looking for AI tools. Submit your listing
            and our team will review it within 3–5 business days.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-semibold text-dark">Tool Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company name *
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  required
                  value={form.company_name}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="tool_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tool name *
                </label>
                <input
                  id="tool_name"
                  name="tool_name"
                  type="text"
                  required
                  value={form.tool_name}
                  onChange={handleChange}
                  placeholder="AcmeAI"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 mb-1">
                Website URL *
              </label>
              <input
                id="website_url"
                name="website_url"
                type="url"
                required
                value={form.website_url}
                onChange={handleChange}
                placeholder="https://yourtool.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                minLength={50}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what your tool does and why it's great for small businesses..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* Commercial info */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-semibold text-dark">Commercial Details (optional)</h2>

            <div>
              <label htmlFor="affiliate_url" className="block text-sm font-medium text-gray-700 mb-1">
                Affiliate / tracking URL
              </label>
              <input
                id="affiliate_url"
                name="affiliate_url"
                type="url"
                value={form.affiliate_url}
                onChange={handleChange}
                placeholder="https://yourtool.com?ref=toolbase"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-gray-400 mt-1">If you have an affiliate programme, share your unique link here.</p>
            </div>

            <div>
              <label htmlFor="discount_offer" className="block text-sm font-medium text-gray-700 mb-1">
                Exclusive discount offer
              </label>
              <input
                id="discount_offer"
                name="discount_offer"
                type="text"
                value={form.discount_offer}
                onChange={handleChange}
                placeholder="e.g. 20% off first 3 months - code: TOOLBASE20"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Sponsorship options */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-semibold text-dark">Promotion Options</h2>
            <p className="text-sm text-gray-500">
              Interested in featured placement? Check the options below and our team will be in touch with pricing.
            </p>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="apply_sponsored"
                  checked={form.apply_sponsored}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-dark">Apply for sponsored listing</span>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Get prominent placement with a subtle gold border and "Sponsored" badge.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="apply_newsletter"
                  checked={form.apply_newsletter}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <div>
                  <span className="text-sm font-medium text-dark">Apply for newsletter sponsorship</span>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Reach our subscriber list of SMB owners directly in their inbox.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card">
            <h2 className="font-semibold text-dark mb-4">Contact</h2>
            <div>
              <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                Contact email *
              </label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                required
                value={form.contact_email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {status === "submitting" ? "Submitting..." : "Submit Your Tool →"}
          </button>

          <p className="text-xs text-center text-gray-400">
            By submitting, you agree that {brand.name} may publish your tool listing on the site.
            We review all submissions before publishing.
          </p>
        </form>
      </main>
    </>
  );
}
