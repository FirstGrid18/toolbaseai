import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ReviewForm({ toolId, toolName }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) return;

    setStatus("submitting");
    try {
      const { error } = await supabase.from("reviews").insert({
        tool_id: toolId,
        reviewer_name: name.trim(),
        rating,
        body: body.trim(),
        approved: false,
      });

      if (error) throw error;
      setStatus("success");
    } catch (err) {
      console.error("Review submission error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <p className="font-semibold text-green-800">Thanks - your review is pending approval.</p>
        <p className="text-green-700 text-sm mt-1">
          We review all submissions to ensure quality. Your review will appear shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-dark">Write a review for {toolName}</h3>

      {/* Star picker */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Your rating *</label>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
              className={`text-3xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                star <= (hovered || rating) ? "text-gold" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              ★
            </button>
          ))}
        </div>
        {rating === 0 && status !== "idle" && (
          <p className="text-red-500 text-xs mt-1">Please select a rating.</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="reviewer-name" className="text-sm font-medium text-gray-700 block mb-1">
          Your name *
        </label>
        <input
          id="reviewer-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sarah M."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Review body */}
      <div>
        <label htmlFor="review-body" className="text-sm font-medium text-gray-700 block mb-1">
          Your review *
        </label>
        <textarea
          id="review-body"
          required
          minLength={20}
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience with this tool..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || rating === 0}
        className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
