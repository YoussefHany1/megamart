"use client";
import dynamic from "next/dynamic";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import {
  usePaymentsPage,
  STRIPE_APPEARANCE,
} from "@/features/payments/hooks/usePaymentsPage";
import PaymentMethodCard from "@/features/payments/components/PaymentMethodCard";
import SecurityInfo from "@/features/payments/components/SecurityInfo";
const Loading = dynamic(() => import("../../../../app/loading"));
const AddCardForm = dynamic(
  () => import("@/features/payments/components/AddCardForm"),
);
const EmptyState = dynamic(
  () => import("@/features/payments/components/EmptyState"),
);
const MessageAlert = dynamic(
  () => import("@/features/payments/components/MessageAlert"),
);
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

export default function PaymentsClient() {
  const {
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
  } = usePaymentsPage();

  // Loading and auth checks
  if (loading) return <Loading />;
  if (!user) return null;

  const stripeOptions = {
    clientSecret,
    appearance: STRIPE_APPEARANCE,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">Payment Methods</h1>

      <MessageAlert message={message as any} />

      <button
        onClick={handleShowAddCard}
        className="mb-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-[#0279ac] transition flex items-center gap-2"
      >
        {showAddCard ? "Cancel" : "Add New Card"}
      </button>

      {showAddCard && clientSecret && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Payment Method</h2>
            <button
              onClick={() => setShowAddCard(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <CloseIcon fontSize="medium" />
            </button>
          </div>

          <Elements stripe={stripePromise} options={stripeOptions as any}>
            <AddCardForm
              userId={user.uid}
              onSuccess={handleCardAdded}
              onCancel={() => setShowAddCard(false)}
            />
          </Elements>
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <EmptyState />
        ) : (
          paymentMethods.map((card) => (
            <PaymentMethodCard
              key={card.id}
              card={card}
              onSetDefault={handleSetDefault}
              onDelete={handleDeleteCard}
            />
          ))
        )}
      </div>

      <SecurityInfo />
    </div>
  );
}
