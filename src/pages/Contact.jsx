import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "../lib/supabase";
import brand from "../config/brand";

const SUBJECTS = [
  "General enquiry",
  "List my tool",
  "Sponsorship enquiry",
  "Bug report",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });

      if (error) throw error;
      setStatus("success");
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Contact | ${brand.name}`}</title>
        <meta name="description" content={`Get in touch with the ${brand.name} team.`} />
        <meta property="og:title" content={`Contact | ${brand.name}`} />
        <link rel="canonical" href={`${brand.url}/contact`} />
      </Helmet>

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Get in touch</h1>
          <p className="text-gray-500 leading-relaxed">
            We read every message and aim to reply within 2 business days.
          </p>
        </header>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-100 rounded-xl px-6 py-8 text-center">
            <div className="text-4xl mb-3">✉️</div>
            <p className="text-green-800 font-semibold text-lg">
              Thanks, we'll be in touch within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="">Select a subject...</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  minLength={20}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">Minimum 20 characters.</p>
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
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </main>
    </>
  );
}
