import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { PaymentMethodCard } from "../types";
import {
  fetchPaymentMethods,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  createSetupIntent,
} from "../../account/services/paymentService";

export const STRIPE_APPEARANCE = { theme: "stripe" };
const MESSAGE_TIMEOUT = 3000;

export function usePaymentsPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodCard[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch payment methods on mount
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadPaymentMethods();
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !loading) {
        router.push("/");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user, loading, router]);

  const loadPaymentMethods = async () => {
    if (!user) return;
    try {
      const methods = await fetchPaymentMethods(user.uid);
      setPaymentMethods(methods);
    } catch (error) {
      showMessage("error", "Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAddCard = async () => {
    clearMessage();

    if (showAddCard) {
      setShowAddCard(false);
      setClientSecret(null);
      return;
    }

    try {
      if (!user) return;
      const secret = await createSetupIntent(user.uid, user?.email || "");
      setClientSecret(secret);
      setShowAddCard(true);
    } catch (error) {
      showMessage("error", "Could not load payment form");
    }
  };

  const handleDeleteCard = async (cardId: string, stripePaymentMethodId: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;

    try {
      await deletePaymentMethod(stripePaymentMethodId, cardId);
      setPaymentMethods(paymentMethods.filter((card) => card.id !== cardId));
      showMessage("success", "Card deleted successfully!");
    } catch (error) {
      showMessage("error", "Failed to delete card");
    }
  };

  const handleSetDefault = async (cardId: string) => {
    try {
      await setDefaultPaymentMethod(cardId, paymentMethods);
      setPaymentMethods(
        paymentMethods.map((card) => ({
          ...card,
          isDefault: card.id === cardId,
        })),
      );
      showMessage("success", "Default card updated!");
    } catch (error) {
      showMessage("error", "Failed to update default card");
    }
  };

  const handleCardAdded = (newCard: PaymentMethodCard) => {
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
    setClientSecret(null);
    showMessage("success", "Card added successfully!");
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), MESSAGE_TIMEOUT);
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  return {
    user,
    loading,
    paymentMethods,
    showAddCard,
    setShowAddCard,
    clientSecret,
    message,
    handleShowAddCard,
    handleDeleteCard,
    handleSetDefault,
    handleCardAdded,
  };
}
