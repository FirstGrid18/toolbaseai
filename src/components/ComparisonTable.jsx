export default function ComparisonTable({ features, tool1Name, tool2Name }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-600 w-1/3">Feature</th>
            <th className="text-left px-4 py-3 font-semibold text-dark">{tool1Name}</th>
            <th className="text-left px-4 py-3 font-semibold text-dark">{tool2Name}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <td className="px-4 py-3 font-medium text-gray-700">{row.feature}</td>
              <td className="px-4 py-3 text-gray-600">{row.tool1}</td>
              <td className="px-4 py-3 text-gray-600">{row.tool2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
