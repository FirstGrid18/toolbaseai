// Inline SVG logo — no image requests, scales cleanly at all sizes.
// variant="light" flips "base" and "Marketplace" text for dark backgrounds.
export default function Logo({ variant = "default" }) {
  const baseColor = variant === "light" ? "#ffffff" : "#1a1a1a";
  const subColor  = variant === "light" ? "#aaaaaa" : "#666666";

  // 3×3 grid: 9px squares, 2px gaps → total icon size 31×31px
  const sq  = 9;
  const gap = 2;
  const iconSize = sq * 3 + gap * 2; // 31

  const opacities = [
    [1,   0.7, 0.4],
    [0.7, 1,   0.7],
    [0.4, 0.7, 1  ],
  ];

  // Both wordmark lines forced to the same pixel width via SVG textLength
  const wordW = 78;
  const wordH = 33;

  return (
    <span className="flex items-center gap-2.5 flex-shrink-0">
      {/* Icon — 31×31px */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox={`0 0 ${iconSize} ${iconSize}`}
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
              rx={3}
              fill="#4C1D95"
              fillOpacity={opacity}
            />
          ))
        )}
      </svg>

      {/* Wordmark — SVG so textLength enforces identical widths on both lines */}
      <svg
        width={wordW}
        height={wordH}
        viewBox={`0 0 ${wordW} ${wordH}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Toolbase Marketplace"
        overflow="visible"
      >
        {/* "Toolbase" line — purple + dark, weight 500 */}
        <text
          x="0"
          y="17"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontSize="17"
          fontWeight="500"
          textLength={wordW}
          lengthAdjust="spacingAndGlyphs"
        >
          <tspan fill="#4C1D95">Tool</tspan>
          <tspan fill={baseColor}>base</tspan>
        </text>

        {/* "Marketplace" line — stretched to exactly match "Toolbase" width */}
        <text
          x="0"
          y="30"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontSize="10.5"
          fontWeight="400"
          fill={subColor}
          textLength={wordW}
          lengthAdjust="spacingAndGlyphs"
        >
          Marketplace
        </text>
      </svg>
    </span>
  );
}
