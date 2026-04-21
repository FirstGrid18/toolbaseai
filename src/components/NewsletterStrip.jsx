import { useState } from "react";
import brand from "../config/brand";

// Replace the inner form with your Beehiiv embed URL on production.
// Example: <iframe src={import.meta.env.VITE_BEEHIIV_URL} ... />
// See: https://www.beehiiv.com/support/article/embed-forms

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Replace with Beehiiv embed or API call
    if (email) setSubmitted(true);
  }

  return (
    <section className="bg-primary-light border border-primary/20 rounded-xl px-6 py-8 my-8 text-center">
      <div className="max-w-xl mx-auto">
        <div className="text-2xl mb-2">📬</div>
        <h2 className="text-lg font-bold text-dark mb-1">
          Get AI tool discounts, new discoveries and expert picks straight to your inbox.
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Join thousands of SMB owners using {brand.name} to find the right tools. No spam — ever.
        </p>

        {submitted ? (
          <p className="text-primary font-semibold">
            You're in! Check your inbox to confirm your subscription.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 max-w-xs px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 mt-3">
          {/* Replace with Beehiiv embed URL on production */}
          Powered by Beehiiv · Unsubscribe any time
        </p>
      </div>
    </section>
  );
}
