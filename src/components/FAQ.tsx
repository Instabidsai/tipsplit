import { useState } from "react";

const faqs = [
  {
    q: "Is TipSplit really free?",
    a: "Yes. No hidden fees, no premium tier, no ads. The calculator is 100% free to use, now and always. We don't even have a payment system — there's literally nothing to charge you for.",
  },
  {
    q: "How does TipSplit calculate tips?",
    a: "Simple math: your bill amount multiplied by the tip percentage you choose. We then divide the total (bill + tip) by the number of people splitting. All amounts are rounded to the nearest cent. If the split doesn't divide evenly, we'll note that one person covers the extra penny or two.",
  },
  {
    q: "What's the right tip percentage?",
    a: "That's up to you, but here's the data: the average tip at full-service U.S. restaurants is 19.4% (2025). TipSplit defaults to 18%, which is the most common preset across tip calculators. For exceptional service, 20-25% is standard. For counter service, 10-15% is typical.",
  },
  {
    q: "Does TipSplit work offline?",
    a: "TipSplit works as a web page — you need an internet connection to load it. Once loaded, the calculator runs entirely in your browser. We may add offline support (PWA) in a future update.",
  },
  {
    q: "Do you collect my data?",
    a: "No. TipSplit runs 100% in your browser. Your bill amounts, tips, and splits never leave your phone. We don't use analytics, cookies, or tracking scripts. There's no account, no login, and no database.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-display-md text-surface-900 text-center mb-12">
          Questions? We've got answers.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-surface-200 overflow-hidden transition-shadow duration-200 hover:shadow-card"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left min-h-touch"
              >
                <span className="font-semibold text-surface-900 pr-4">
                  {faq.q}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`shrink-0 text-surface-400 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M5 7.5l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 animate-fade-in">
                  <p className="text-sm text-surface-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
