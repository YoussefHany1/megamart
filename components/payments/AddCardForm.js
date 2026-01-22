"use client";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AddCardForm({ userId, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. تأكيد الإعداد مباشرة (لأن clientSecret موجود بالفعل في Elements Provider)
      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          // يمكن إضافة return_url هنا لو احتجت
          // return_url: "https://example.com/account",
        },
        redirect: "if_required",
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // 2. جلب تفاصيل Payment Method من Stripe Backend
      // (نفس الكود القديم بتاعك لاستخراج البيانات)
      const paymentMethodId = setupIntent.payment_method;

      const paymentMethodRes = await fetch("/api/get-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId }),
      });

      if (!paymentMethodRes.ok) {
        throw new Error("Failed to get payment method details");
      }

      const paymentMethodData = await paymentMethodRes.json();

      // 3. حفظ معلومات البطاقة في Firestore
      const cardData = {
        userId: userId,
        stripePaymentMethodId: paymentMethodId,
        brand: paymentMethodData.card.brand,
        last4: paymentMethodData.card.last4,
        expiryMonth: paymentMethodData.card.exp_month
          .toString()
          .padStart(2, "0"),
        expiryYear: paymentMethodData.card.exp_year.toString(),
        isDefault: false,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "paymentMethods"), cardData);

      onSuccess({
        id: docRef.id,
        ...cardData,
      });
    } catch (err) {
      console.error("Error adding card:", err);
      setError(err.message || "Failed to add card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`flex-1 px-6 py-3 rounded-md text-white font-semibold transition ${
            !stripe || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save Card"}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Your card information is encrypted and securely stored by Stripe
      </p>
    </form>
  );
}
