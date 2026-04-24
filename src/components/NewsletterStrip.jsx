import { useState } from "react";

const SUBSCRIBE_URL =
  "https://bxrwkdlwplziqcaoyknk.supabase.co/functions/v1/newsletter-subscribe";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-primary-light border border-primary/20 rounded-xl px-6 py-8 my-8 text-center">
      <div className="max-w-xl mx-auto">
        <div className="text-2xl mb-2">📬</div>
        <h2 className="text-lg font-bold text-dark mb-1">
          Get tool discounts, new discoveries and practical picks straight to your inbox
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Join small business owners using Toolbase Marketplace to find the right tools without wasting hours researching.
        </p>

        {status === "success" ? (
          <p className="text-primary font-semibold">You're in! Check your inbox.</p>
        ) : (
          <>
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
                disabled={status === "submitting"}
                className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Subscribing..." : "Subscribe Free"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-500 text-sm mt-3">Something went wrong. Try again.</p>
            )}
            <p className="text-xs text-gray-400 mt-3">Unsubscribe any time</p>
          </>
        )}
      </div>
    </section>
  );
}
