const rows = [
  { feature: "Ads", calc: "Heavy", soup: "Heavy", tip: "None" },
  {
    feature: "Real-time results",
    calc: "No (button required)",
    soup: "No (button required)",
    tip: "Yes",
  },
  {
    feature: "Mobile-first",
    calc: "No (desktop-first)",
    soup: "No (desktop-first)",
    tip: "Yes",
  },
  {
    feature: "Load speed",
    calc: "Slow (ad scripts)",
    soup: "Slow (ad scripts)",
    tip: "< 1 second",
  },
  { feature: "App download", calc: "No", soup: "No", tip: "No" },
  { feature: "Cost", calc: "Free", soup: "Free", tip: "Free" },
];

export default function Comparison() {
  return (
    <section className="py-16 px-4 bg-surface-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-display-md text-surface-900 text-center mb-4">
          Why not just Google it?
        </h2>
        <p className="text-surface-500 text-center mb-10 max-w-xl mx-auto text-sm leading-relaxed">
          You could. The top results are Calculator.net and CalculatorSoup —
          tools built in the early 2000s, plastered with ads, and designed for
          desktop screens. TipSplit was built for your phone, in 2026.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-surface-200 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left p-4 font-medium text-surface-500 uppercase tracking-wider text-xs">
                  Feature
                </th>
                <th className="text-center p-4 font-medium text-surface-400 text-xs uppercase tracking-wider">
                  Calculator.net
                </th>
                <th className="text-center p-4 font-medium text-surface-400 text-xs uppercase tracking-wider">
                  CalculatorSoup
                </th>
                <th className="text-center p-4 font-semibold text-brand-600 text-xs uppercase tracking-wider">
                  TipSplit
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i < rows.length - 1 ? "border-b border-surface-100" : ""
                  }
                >
                  <td className="p-4 font-medium text-surface-800">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center text-surface-400">
                    {row.calc}
                  </td>
                  <td className="p-4 text-center text-surface-400">
                    {row.soup}
                  </td>
                  <td className="p-4 text-center font-semibold text-brand-600">
                    {row.tip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
