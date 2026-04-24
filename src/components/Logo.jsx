// Inline SVG logo — scales cleanly at all sizes, no image requests.
// variant="light" inverts "base" and "Marketplace" text for dark backgrounds.
export default function Logo({ variant = "default" }) {
  const baseColor   = variant === "light" ? "#ffffff" : "#1a1a1a";
  const subColor    = variant === "light" ? "#aaaaaa" : "#666666";

  // 3×3 grid: 18px squares, 4px gap, rx=4, colour #4C1D95
  // Total width: 3×18 + 2×4 = 62px  height: 62px
  const sq = 18;
  const gap = 4;
  const opacities = [
    [1, 0.7, 0.4],
    [0.7, 1, 0.7],
    [0.4, 0.7, 1],
  ];

  return (
    <span className="flex items-center gap-3 flex-shrink-0">
      {/* Icon */}
      <svg
        width={sq * 3 + gap * 2}
        height={sq * 3 + gap * 2}
        viewBox={`0 0 ${sq * 3 + gap * 2} ${sq * 3 + gap * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {opacities.map((row, r) =>
          row.map((opacity, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * (sq + gap)}
              y={r * (sq + gap)}
              width={sq}
              height={sq}
              rx={4}
              fill="#4C1D95"
              fillOpacity={opacity}
            />
          ))
        )}
      </svg>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.1 }}>
          <span style={{ color: "#4C1D95" }}>Tool</span>
          <span style={{ color: baseColor }}>base</span>
        </span>
        <span style={{ fontSize: 11, fontWeight: 400, color: subColor, letterSpacing: "0.01em", marginTop: 2 }}>
          Marketplace
        </span>
      </span>
    </span>
  );
}
