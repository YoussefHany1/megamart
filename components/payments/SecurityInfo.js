export default function SecurityInfo() {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <div>
          <h3 className="font-bold text-blue-900 mb-1">
            Your cards are secure
          </h3>
          <p className="text-sm text-blue-800">
            All payment information is encrypted and securely stored by Stripe.
            We never see or store your full card details.
          </p>
        </div>
      </div>
    </div>
  );
}
