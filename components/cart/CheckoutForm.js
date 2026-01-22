"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../context/AuthContext";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function CheckoutForm({ amount, items, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !user) {
      setError("Payment system not ready or user not logged in");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // 1. التحقق من وجود عنوان الشحن
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        setError("User data not found");
        setLoading(false);
        return;
      }

      const userData = userDocSnap.data();
      const hasAddress =
        userData.addressCountry &&
        userData.city &&
        userData.streetName &&
        userData.addressMobile;

      if (!hasAddress) {
        setError("Please add your shipping address in Account Settings");
        setLoading(false);
        return;
      }

      // 2. إرسال العناصر
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }

      // 3. إنشاء Payment Intent
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await res.json();

      // 4. تأكيد الدفع (التعديل تم هنا)
      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/orders`,
          },
          redirect: "if_required",
        });

      if (confirmError) {
        setError(confirmError.message);
        setLoading(false);
        return;
      }

      // 5. حفظ الطلب في Firestore بعد نجاح الدفع
      if (paymentIntent && paymentIntent.status === "succeeded") {
        const orderItems = items.map((item) => ({
          id: item.id || "unknown-id",
          title: item.name || item.title || "No Title",
          price: item.price || 0,
          img: item.pic || item.img || "/placeholder.png",
          quantity: item.quantity || 1,
          category: item.category || "General",
        }));

        const orderData = {
          userId: user.uid,
          userEmail: user.email || "No Email",
          items: orderItems,
          subtotal: amount,
          shippingFee: 0,
          totalAmount: amount,
          paymentMethod: "card",
          paymentStatus: "paid",
          stripePaymentIntentId: paymentIntent.id,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
          status: "pending",
          shippingAddress: {
            country: userData.addressCountry || "",
            city: userData.city || "",
            street: userData.streetName || "",
            building: userData.buildingName || "",
            mobile: userData.addressMobile || "",
            details: userData.landmark || "",
          },
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "orders"), orderData);

        setMessage("Payment successful! Order created.");

        // استدعاء callback النجاح بعد ثانية واحدة
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "An unexpected error occurred");
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
