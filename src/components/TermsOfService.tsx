export default function TermsOfService() {
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
          <a href="/" className="text-sm font-medium text-brand-700 hover:text-brand-700 transition-colors">
            Back to Calculator
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-display-md text-surface-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-surface-500 mb-8">Last updated: February 19, 2026</p>

        <div className="prose prose-surface max-w-none space-y-6 text-surface-700 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TipSplit ("the Service"), you accept and agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Description of Service</h2>
            <p>
              TipSplit is a free, client-side tip calculator and bill splitter web application. The
              Service performs mathematical calculations based on user-provided inputs (bill amount,
              tip percentage, number of people). All calculations happen locally in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">3. No Warranty</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind,
              either express or implied. While we strive for mathematical accuracy, you should verify
              important calculations independently. TipSplit is not responsible for any financial
              decisions made based on the Service's output.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">4. User Responsibilities</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Attempt to interfere with the Service's operation</li>
              <li>Use automated systems to access the Service in a manner that sends more requests than a human can reasonably produce</li>
              <li>Attempt to reverse-engineer or copy the Service for commercial purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Intellectual Property</h2>
            <p>
              The TipSplit name, logo, and design are the property of their respective owners. The
              underlying source code is open-source and available under its respective license.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">6. Limitation of Liability</h2>
            <p>
              In no event shall TipSplit, its creators, or contributors be liable for any indirect,
              incidental, special, consequential, or punitive damages arising out of your use of the
              Service. Our total liability shall not exceed $0, as this is a free service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">7. Third-Party Services</h2>
            <p>
              TipSplit Pro subscriptions are processed by Stripe, Inc. Your use of Stripe's
              payment services is governed by{" "}
              <a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                Stripe's Terms of Service
              </a>. TipSplit does not store your payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on
              this page with an updated date. Continued use of the Service after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, please visit our{" "}
              <a href="https://github.com/Instabidsai/tipsplit" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                GitHub repository
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
