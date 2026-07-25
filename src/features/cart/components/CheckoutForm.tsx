"use client";

import { PaymentElement } from "@stripe/react-stripe-js";
import { useCheckoutForm } from "../hooks/useCheckoutForm";

export default function CheckoutForm({ amount, items, onSuccess }) {
  const { stripe, loading, error, message, handleSubmit } = useCheckoutForm(amount, items, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {message && (
        <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md border border-green-200">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-md text-white font-semibold transition ${
          !stripe || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay ${amount} LE`
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Payments are securely processed by Stripe
      </p>
    </form>
  );
}
