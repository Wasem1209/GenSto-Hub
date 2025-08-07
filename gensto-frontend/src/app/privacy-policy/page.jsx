'use client';

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gray-50 py-16 px-4 mt-8 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">

        {/*  Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            At <strong>GenSto Hub</strong>, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains how we
            collect, use, and safeguard your data.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect personal information that you provide directly to us, such as your name,
              email address, phone number, and payment details when you register, contact us, or
              purchase our services. We may also collect non-personal information like your browser
              type, IP address, and usage data for analytics.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our services.</li>
              <li>To communicate updates, promotions, and important notices.</li>
              <li>To process payments and issue receipts.</li>
              <li>To comply with legal obligations and prevent fraudulent activity.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share your data only with trusted
              partners who assist us in operating our website, conducting business, or serving you –
              as long as they agree to keep your information confidential. We may also disclose
              information if required by law or to protect our rights and safety.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy, unless a longer retention period is
              required by law.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Cookies & Tracking Technologies</h2>
            <p>
              Our website uses cookies to improve your browsing experience and gather analytics
              data. You can adjust your browser settings to refuse cookies, but some site
              features may not function properly as a result.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Your Rights</h2>
            <p>
              You have the right to request access, correction, or deletion of your personal
              information. You may also opt out of receiving promotional emails at any time
              by clicking the unsubscribe link or contacting us directly.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Security of Your Information</h2>
            <p>
              We use industry-standard measures to protect your personal information from
              unauthorized access, alteration, or disclosure. However, no method of data
              transmission over the Internet is 100% secure.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices
              or legal requirements. Updates will be posted on this page with a revised “Last
              Updated” date.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data,
              please contact us at:
            </p>
            <p className="mt-2">
              <a href="mailto:genstohub1@gmail.com" className="text-blue-600 hover:underline">
                genstohub1@gmail.com
              </a>
            </p>
          </div>

        </div>

        {/*  Last Updated Date */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>Last updated: {new Date().getFullYear()} </p>
        </div>

      </div>
    </section>
  );
}