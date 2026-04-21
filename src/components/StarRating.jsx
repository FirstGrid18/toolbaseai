export default function StarRating({ rating, count, size = "sm" }) {
  const stars = Math.round(rating * 2) / 2; // round to nearest 0.5
  const sizeClasses = size === "lg" ? "text-xl" : "text-sm";

  return (
    <div className="flex items-center gap-1">
      <span className={`${sizeClasses} leading-none`} aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => {
          if (stars >= i) return <span key={i} className="text-gold">★</span>;
          if (stars >= i - 0.5) return <span key={i} className="text-gold opacity-60">★</span>;
          return <span key={i} className="text-gray-300">★</span>;
        })}
      </span>
      {rating && (
        <span className={`font-semibold text-gray-800 ${size === "lg" ? "text-base" : "text-sm"}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {count && (
        <span className={`text-gray-400 ${size === "lg" ? "text-sm" : "text-xs"}`}>
          ({count.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
