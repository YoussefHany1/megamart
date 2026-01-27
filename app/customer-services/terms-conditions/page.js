export const metadata = {
  title: "Terms & Conditions | MegaMart",
  description:
    "Read the Terms & Conditions for using MegaMart services and website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Terms & Conditions
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-text">
          Welcome to MegaMart. Please read these terms carefully before using
          our website or services.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Content Wrapper */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-border">
          {/* Section 1: Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              1. Introduction
            </h2>
            <p className="leading-relaxed mb-4 text-secondary">
              By accessing or using MegaMart, you agree to be bound by these
              Terms & Conditions. If you disagree with any part of the terms,
              you may not access the service.
            </p>
          </div>

          {/* Section 2: User Accounts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              2. User Accounts
            </h2>
            <p className="leading-relaxed mb-4 text-secondary">
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for safeguarding the
              password that you use to access the service and for any activities
              or actions under your password.
            </p>
            <div className="p-4 rounded-lg bg-background3 border-l-4 border-primary">
              <p className="text-sm text-text">
                <strong>Note:</strong> We reserve the right to terminate
                accounts, edit or remove content, and cancel orders at our sole
                discretion.
              </p>
            </div>
          </div>

          {/* Section 3: Products & Pricing */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              3. Products and Pricing
            </h2>
            <ul className="list-disc list-inside space-y-2 text-secondary">
              <li>
                Prices for our products are subject to change without notice.
              </li>
              <li>
                We reserve the right to modify or discontinue any product at any
                time.
              </li>
              <li>
                We have made every effort to display as accurately as possible
                the colors and images of our products. We cannot guarantee that
                your computer monitor's display of any color will be accurate.
              </li>
            </ul>
          </div>

          {/* Section 4: Intellectual Property */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              4. Intellectual Property
            </h2>
            <p className="leading-relaxed text-secondary">
              The content, features, and functionality strictly owned by
              MegaMart are protected by international copyright, trademark,
              patent, trade secret, and other intellectual property or
              proprietary rights laws.
            </p>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed text-secondary">
              In no event shall MegaMart, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>
          </div>

          {/* Section 6: Changes */}
          <div className="pt-8 border-t border-line">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              6. Changes to Terms
            </h2>
            <p className="leading-relaxed mb-4 text-secondary">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. By continuing to access or use our
              service after those revisions become effective, you agree to be
              bound by the revised terms.
            </p>
            <p className="text-sm mt-6 text-light">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
