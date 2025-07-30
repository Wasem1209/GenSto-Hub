'use client';

export default function TermsAndConditionsPage() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Welcome to <strong>GenSto Hub</strong>. By accessing or using our services, you agree 
            to the following Terms & Conditions. Please read them carefully before using our 
            website, products, and services.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using GenSto Hub’s services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms & Conditions. If you do not agree, 
              you should stop using our services immediately.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Services Provided</h2>
            <p>
              GenSto Hub provides training programs, consultancy, digital solutions, and other 
              technology-based services. We reserve the right to modify or discontinue services at 
              any time without notice.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information during sign-up or transactions.</li>
              <li>Respect intellectual property and copyright laws.</li>
              <li>Do not misuse or attempt to hack, disrupt, or exploit our services.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Payments & Refunds</h2>
            <p>
              Payments for courses, services, and events must be completed before access is granted. 
              Refunds will be provided only under specific conditions outlined in our refund policy.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Intellectual Property</h2>
            <p>
              All content, materials, and resources on GenSto Hub are protected by copyright, 
              trademark, and intellectual property laws. You may not reproduce, distribute, or 
              modify without written consent.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
            <p>
              GenSto Hub is not liable for any indirect, incidental, or consequential damages arising 
              from the use of our services. Users are responsible for how they apply the knowledge 
              and tools provided.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Amendments</h2>
            <p>
              We may update these Terms & Conditions at any time. Continued use of our services 
              after changes are made means you accept the revised terms.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Governing Law</h2>
            <p>
              These Terms & Conditions shall be governed by and interpreted in accordance with the 
              laws of Nigeria (or your company’s country of registration).
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Contact Us</h2>
            <p>
              For questions or concerns regarding these Terms & Conditions, please reach out to us:
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