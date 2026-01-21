export const metadata = {
  title: "Privacy Policy | MegaMart",
  description:
    "Learn how MegaMart collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-(--primary)">
          Privacy Policy
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-(--text)">
          Your privacy is important to us. This policy explains how we handle
          and protect your personal data.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Content Wrapper */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-(--border)">
          {/* Section 1: Information Collection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-(--primary)">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed mb-4 text-(--secondary)">
              We collect information you provide directly to us when you create
              an account, make a purchase, or contact customer support. This
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-(--secondary)">
              <li>Name, email address, and phone number.</li>
              <li>Shipping and billing addresses.</li>
              <li>
                Payment information (processed securely through third-party
                providers).
              </li>
            </ul>
          </div>

          {/* Section 2: How We Use Data */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-(--primary)">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-4 text-(--secondary)">
              We use the information we collect to operate and improve our
              services, including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-(--background1)">
                <h3 className="font-semibold mb-2 text-(--primary)">
                  Order Processing
                </h3>
                <p className="text-sm text-(--text)">
                  To process and deliver your orders and send order updates.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-(--background1)">
                <h3 className="font-semibold mb-2 text-(--primary)">Support</h3>
                <p className="text-sm text-(--text)">
                  To respond to your comments, questions, and requests.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Data Sharing */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-(--primary)">
              3. Data Sharing & Disclosure
            </h2>
            <p className="leading-relaxed mb-4 text-(--secondary)">
              We do not sell your personal data. We may share your information
              with trusted third-party service providers solely for the purpose
              of fulfilling our services, such as:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-(--secondary)">
              <li>Payment processors (e.g., Stripe, PayPal).</li>
              <li>Delivery and logistics partners.</li>
              <li>Marketing services (only if you opted in).</li>
            </ul>
          </div>

          {/* Section 4: Security */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-(--primary)">
              4. Data Security
            </h2>
            <p className="leading-relaxed text-(--secondary)">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. However, no internet
              transmission is completely secure.
            </p>
          </div>

          {/* Section 5: Cookies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-(--primary)">
              5. Cookies Policy
            </h2>
            <p className="leading-relaxed text-(--secondary)">
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. You can control cookies through
              your browser settings.
            </p>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-(--line)">
            <h2 className="text-xl font-bold mb-2 text-(--heading)">
              Contact Us Regarding Privacy
            </h2>
            <p className="mb-4 text-(--secondary)">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <a
              href="mailto:support@megamart.com"
              className="font-semibold hover:underline text-(--primary)"
            >
              support@megamart.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
