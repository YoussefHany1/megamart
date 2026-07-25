import { useToastStore } from "@/stores/toastStore";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getPaymentMethod } from "@/features/payments/actions/stripeActions";
import { PaymentMethodCard } from "../types";

export function useAddCardForm(userId: string, onSuccess: (card: PaymentMethodCard) => void) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { showToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (!setupIntent) {
        throw new Error("Failed to create setup intent");
      }

      const paymentMethodId = setupIntent.payment_method as string;

      const paymentMethodData = await getPaymentMethod(paymentMethodId);

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

      showToast("Card saved successfully!", "success");

      setTimeout(() => {
        onSuccess({
          id: docRef.id,
          ...cardData,
        });
      }, 1500);
    } catch (err: unknown) {
      console.error("Error adding card:", err);
      console.log({
        open: true,
        message: (err as Error).message || "Failed to add card.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    stripe,
    loading,
    handleSubmit,
  };
}
