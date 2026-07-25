import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuthStore } from "@/stores/authStore";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createPaymentIntent } from "@/features/payments/actions/stripeActions";

import { CartItem } from "@/types";

export function useCheckoutForm(amount: string | number, items: CartItem[], onSuccess: () => void) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !user) {
      setError("Payment system not ready or user not logged in");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
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

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Failed to submit");
        setLoading(false);
        return;
      }

      const { clientSecret } = await createPaymentIntent(Math.round(parseFloat(amount.toString()) * 100));
      if (!clientSecret) {
        setError("Failed to initialize payment");
        setLoading(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/orders`,
          },
          redirect: "if_required" as any,
        });

      if (confirmError) {
        setError(confirmError.message || "Confirmation error");
        setLoading(false);
        return;
      }

      if (paymentIntent && (paymentIntent as any).status === "succeeded") {
        const orderItems = items.map((item: CartItem) => ({
          id: (item as any).id || "unknown-id",
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

        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);
      setError((err as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    stripe,
    loading,
    error,
    message,
    handleSubmit,
  };
}
