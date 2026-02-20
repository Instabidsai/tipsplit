const steps = [
  {
    num: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 3.5v21M8.75 8.75h7.875a2.625 2.625 0 010 5.25H8.75v0h8.75a2.625 2.625 0 010 5.25H8.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    headline: "Enter your bill",
    copy: "Type the total from your receipt. We handle the math from there.",
  },
  {
    num: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 8.75v10.5M8.75 14h10.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="14"
          cy="14"
          r="10.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9.625 17.5h8.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    headline: "Pick your tip",
    copy: "Tap 15%, 18%, 20%, or 25% — or enter a custom amount. The default is 18%, right in line with the national average.",
  },
  {
    num: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="11" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="11" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 22.75c0-3.314 2.686-5.25 6-5.25s6 1.936 6 5.25M16 22.75c0-3.314 2.686-5.25 6-5.25s6 1.936 6 5.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    headline: "Split it up",
    copy: "Set how many people are sharing. Everyone sees their exact share, down to the penny.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-display-md text-surface-900 mb-12">
          Three taps. That's it.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold">
                {step.num}
              </div>
              <h3 className="text-lg font-semibold text-surface-900">
                {step.headline}
              </h3>
              <p className="text-surface-500 text-sm leading-relaxed">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-surface-400 italic">
          The average tip at full-service U.S. restaurants is{" "}
          <span className="font-mono font-medium text-surface-600">19.4%</span>{" "}
          as of 2025.
        </p>
      </div>
    </section>
  );
}
