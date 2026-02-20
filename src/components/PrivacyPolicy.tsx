export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-surface-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="shrink-0">
              <rect width="48" height="48" rx="12" fill="#14B8A6" />
              <text x="24" y="32" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="600" fill="white">$</text>
            </svg>
            <span className="text-lg font-semibold text-surface-900">TipSplit</span>
          </a>
          <a href="/" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
            Back to Calculator
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-display-md text-surface-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-surface-400 mb-8">Last updated: February 19, 2026</p>

        <div className="prose prose-surface max-w-none space-y-6 text-surface-700 text-base leading-relaxed">
          <section className="card-result">
            <p className="font-semibold text-surface-900 mb-1">The short version:</p>
            <p>
              TipSplit does not collect, store, or transmit any personal data. Your bill amounts and
              calculations stay entirely in your browser. We don't use cookies, analytics, or tracking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Information We Collect</h2>
            <p className="font-semibold text-brand-700">None.</p>
            <p className="mt-2">
              TipSplit is a 100% client-side application. All calculations (bill amount, tip
              percentage, split amounts) are performed locally in your web browser. No data is sent
              to our servers. We do not collect:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Personal information (name, email, phone number)</li>
              <li>Financial information (bill amounts, tip calculations)</li>
              <li>Device information or browser fingerprints</li>
              <li>Location data</li>
              <li>Usage analytics or behavioral data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Cookies &amp; Tracking</h2>
            <p>
              TipSplit does not use cookies, local storage, session storage, or any other browser
              storage mechanisms to track you. We do not use any analytics services (no Google
              Analytics, no Meta Pixel, no tracking scripts of any kind).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">3. Third-Party Services</h2>
            <p>TipSplit uses the following third-party services:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Vercel</strong> — Hosts the website. Vercel may collect standard server access
                logs (IP address, request URL, timestamp) as part of normal web hosting. See{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                  Vercel's Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Google Fonts</strong> — Serves the Inter and DM Mono typefaces. Google may
                collect limited data when fonts are loaded. See{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                  Google's Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Stripe</strong> — If you subscribe to TipSplit Pro, Stripe processes your
                payment. Payment data is handled entirely by Stripe and is never stored on our
                servers. See{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                  Stripe's Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">4. Children's Privacy</h2>
            <p>
              TipSplit does not knowingly collect information from children under 13. Since we collect
              no personal information from any user, this is inherently satisfied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Data Retention</h2>
            <p>
              Since we do not collect any data, there is nothing to retain or delete. When you close
              or refresh the page, all entered values are gone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">6. Your Rights</h2>
            <p>
              Under GDPR, CCPA, and similar privacy regulations, you have the right to access,
              correct, and delete your personal data. Since TipSplit collects no personal data,
              there is nothing to access, correct, or delete. You are welcome to verify this by
              inspecting the source code on our{" "}
              <a href="https://github.com/Instabidsai/tipsplit" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                GitHub repository
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">7. Changes to This Policy</h2>
            <p>
              If we ever change our data practices, we will update this policy and change the "Last
              updated" date. We will never retroactively collect data without explicit notice and consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">8. Contact</h2>
            <p>
              For questions about this Privacy Policy, please visit our{" "}
              <a href="https://github.com/Instabidsai/tipsplit" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                GitHub repository
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
