export const metadata = {
  title: "Cancellation & Return Policy | MegaMart",
  description:
    "Understand MegaMart's cancellation and return policies including timelines and eligibility.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Cancellation & Return Policy
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-text">
          We want you to be completely satisfied with your purchase. Please read
          our policy below regarding cancellations and returns.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Policy Content Wrapper */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-border">
          {/* Cancellation */}
          <div className="mb-10 border-b border-line pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl p-2 rounded-lg bg-background3">🚫</span>
              <h2 className="text-2xl font-bold text-primary">
                Order Cancellation
              </h2>
            </div>
            <div className="space-y-4 text-secondary">
              <p>
                You can cancel your order at any time before it has been
                dispatched for delivery. Once the order is out for delivery, it
                cannot be canceled.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Go to "My Orders" section to cancel.</li>
                <li>
                  If canceled successfully, the refund will be initiated
                  immediately.
                </li>
                <li>
                  Customized or personalized items cannot be canceled once
                  production begins.
                </li>
              </ul>
            </div>
          </div>

          {/* Returns */}
          <div className="mb-10 border-b border-line pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl p-2 rounded-lg bg-background3">📦</span>
              <h2 className="text-2xl font-bold text-primary">Return Policy</h2>
            </div>
            <div className="space-y-4 text-secondary">
              <p>
                If you are not satisfied with your product, you can return it
                within <strong>14 days</strong> of delivery.
              </p>
              <p className="font-semibold text-heading">
                Eligibility for Return:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  The product must be unused and in its original packaging.
                </li>
                <li>All tags, manuals, and accessories must be intact.</li>
                <li>
                  Perishable goods (food, flowers) and hygiene products are
                  non-returnable.
                </li>
              </ul>
            </div>
          </div>

          {/* Refunds */}
          <div className="mb-10 border-b border-line pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl p-2 rounded-lg bg-background3">💰</span>
              <h2 className="text-2xl font-bold text-primary">
                Refund Process
              </h2>
            </div>
            <div className="space-y-4 text-secondary">
              <p>
                Once we receive your returned item and inspect it, we will
                notify you about the approval or rejection of your refund.
              </p>
              <p>
                If approved, the refund will be processed to your original
                payment method within <strong>5-7 business days</strong>.
              </p>
            </div>
          </div>

          {/* Damaged Items */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl p-2 rounded-lg bg-background3">⚠️</span>
              <h2 className="text-2xl font-bold text-primary">
                Damaged or Defective Items
              </h2>
            </div>
            <div className="space-y-4 text-secondary">
              <p>
                If you receive a damaged or incorrect item, please contact our
                support team immediately (within 24 hours of delivery) with
                photos of the product. We will arrange a free replacement.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-background2 border border-primary">
                <p className="text-sm font-semibold text-primary">
                  Need help? Contact us at support@megamart.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
