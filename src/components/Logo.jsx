// Inline SVG logo — no image requests, scales cleanly at all sizes.
// variant="light" is used by Footer (dark background context).
export default function Logo({ variant = "default", animated = false }) {
  // "base" is always white on dark backgrounds; "Marketplace" always deep purple
  const baseColor      = "#ffffff";
  const marketplaceColor = "#6D28D9";

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
          row.map((opacity, c) => {
            const delay = `${(r + c) * 0.08}s`;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * (sq + gap)}
                y={r * (sq + gap)}
                width={sq}
                height={sq}
                rx={3}
                fill="#A78BFA"
                fillOpacity={opacity}
                className={animated ? "logo-square" : undefined}
                style={animated ? { animationDelay: delay } : undefined}
              />
            );
          })
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
        {/* "Toolbase" line — purple + white, weight 500 */}
        <text
          x="0"
          y="17"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontSize="17"
          fontWeight="500"
          textLength={wordW}
          lengthAdjust="spacingAndGlyphs"
        >
          <tspan fill="#A78BFA">Tool</tspan>
          <tspan fill={baseColor}>base</tspan>
        </text>

        {/* "Marketplace" line — stretched to exactly match "Toolbase" width */}
        <text
          x="0"
          y="30"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontSize="10.5"
          fontWeight="400"
          fill={marketplaceColor}
          textLength={wordW}
          lengthAdjust="spacingAndGlyphs"
        >
          Marketplace
        </text>
      </svg>
    </span>
  );
}
