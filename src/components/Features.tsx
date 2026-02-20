const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: "Results update instantly",
    description:
      'No "Calculate" button. Every keystroke and tap updates the tip, total, and per-person amount in real-time.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    headline: "15%, 18%, 20%, 25% — or go custom",
    description:
      "Quick-tap buttons for the most common tip amounts, plus a custom field for any percentage you want.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="15" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14c3.3 0 6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    headline: "Split between 1 to 99 people",
    description:
      "From solo dining to the full team dinner. Handles rounding so nobody gets shorted.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    headline: "Built for phones, not desktops",
    description:
      "48px tap targets, one-column layout, and a clean interface designed for one-handed restaurant use.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: "No ads. No pop-ups. No tracking.",
    description:
      "Just the calculator. That's it. Your data stays on your phone — we don't collect anything.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: "Loads in under 1 second",
    description:
      "Built with React + Vite on Vercel's edge network. No heavy scripts, no ad networks slowing things down.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 bg-surface-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-display-md text-surface-900 text-center mb-4">
          Everything you need. Nothing you don't.
        </h2>
        <p className="text-surface-500 text-center mb-12 max-w-xl mx-auto">
          <span className="font-mono font-medium">53%</span> of mobile users
          abandon a site that takes more than 3 seconds to load. TipSplit loads
          in under 1.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-surface-900 mb-2">
                {f.headline}
              </h3>
              <p className="text-sm text-surface-500 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
