import { useCartSummary, CASH_ON_DELIVERY_FEE } from "../hooks/useCartSummary";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";

// Card Icon Component
const CardIcon = ({ brand }) => {
  const icons = {
    visa: "💳",
    mastercard: "💳",
    amex: "💳",
  };
  return <span className="text-2xl">{icons[brand] || "💳"}</span>;
};

const CartSummary = ({ items, onClearCart }) => {
  const {
    user,
    paymentMethod,
    setPaymentMethod,
    loading,
    savedCards,
    selectedCard,
    setSelectedCard,
    useNewCard,
    setUseNewCard,
    subtotal,
    itemCount,
    finalTotal,
    handlePayWithSavedCard,
    handleCashCheckout,
    handlePaymentSuccess,
  } = useCartSummary(items, onClearCart);

  return (
    <div className="cart-summary mt-5 sm:mt-0 p-5 bg-gray-100 rounded-md">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold whitespace-nowrap mr-5">
          Cart Summary
        </h3>
        <button
          type="button"
          className="flex px-3 py-2 border rounded-md border-red-500 text-red-600 hover:bg-red-50 text-sm whitespace-nowrap"
          onClick={onClearCart}
          disabled={items.length === 0 || loading}
        >
          Clear Cart
        </button>
      </div>

      <div className="summary-details">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal ({itemCount} items):</span>
          <span className="font-semibold">{subtotal} LE</span>
        </div>

        {paymentMethod === "cash" && (
          <div className="flex justify-between mb-2 animate-fadeIn">
            <span className="text-gray-500">Cash on Delivery Fee:</span>
            <span className="font-semibold text-red-500">
              +{CASH_ON_DELIVERY_FEE} LE
            </span>
          </div>
        )}

        <hr />

        {/* Payment Method Selection */}
        {user ? (
          <div className="payment-method my-4">
            <h4 className="font-bold mb-2">Payment Method</h4>

            <div className="space-y-2 mb-3">
              <label
                className={`flex items-center cursor-pointer p-2 border border-border rounded hover:bg-gray-50 transition ${paymentMethod === "cash" ? "border-primary" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="mr-2"
                />
                Cash on Delivery (+10 LE)
              </label>

              <label
                className={`flex items-center cursor-pointer p-2 border border-border rounded hover:bg-gray-50 transition ${paymentMethod === "card" ? "border-primary" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mr-2"
                />
                Credit/Debit Card
              </label>
            </div>

            {/* Card Payment Options */}
            {paymentMethod === "card" && (
              <div className="bg-white p-4 rounded-md border border-gray-200 space-y-3">
                {/* Saved Cards */}
                {savedCards.length > 0 && !useNewCard && (
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm">Saved Cards</h5>
                    {savedCards.map((card) => (
                      <label
                        key={card.id}
                        className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="savedCard"
                            checked={selectedCard === card.id}
                            onChange={() => setSelectedCard(card.id)}
                          />
                          <CardIcon brand={card.brand} />
                          <div>
                            <p className="font-semibold capitalize text-sm">
                              {card.brand}
                            </p>
                            <p className="text-xs text-gray-500">
                              •••• {card.last4}
                            </p>
                          </div>
                        </div>
                        {card.isDefault && (
                          <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </label>
                    ))}

                    <button
                      onClick={() => setUseNewCard(true)}
                      className="w-full text-sm text-primary hover:underline"
                    >
                      + Use a different card
                    </button>
                  </div>
                )}

                {/* New Card Form */}
                {(savedCards.length === 0 || useNewCard) && (
                  <div>
                    {useNewCard && (
                      <button
                        onClick={() => setUseNewCard(false)}
                        className="text-sm text-gray-600 hover:underline mb-2"
                      >
                        ← Back to saved cards
                      </button>
                    )}
                    <Elements
                      stripe={stripePromise}
                      options={{
                        mode: "payment",
                        amount: Math.round(parseFloat(finalTotal) * 100),
                        currency: "egp",
                      }}
                    >
                      <CheckoutForm
                        amount={finalTotal}
                        items={items}
                        onSuccess={handlePaymentSuccess}
                      />
                    </Elements>
                  </div>
                )}

                {/* Link to manage cards */}
                <Link
                  href="/payments"
                  className="block text-center text-sm text-primary hover:underline mt-2"
                >
                  Manage payment methods
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-center font-bold text-red-600 py-5">
              Please Login first to proceed with checkout.
            </p>
          </div>
        )}

        <div className="flex justify-between mb-3 border-t pt-2">
          <span className="text-lg font-bold">Total Amount:</span>
          <span className="text-lg font-bold text-green-600">
            {finalTotal} LE
          </span>
        </div>

        {/* Checkout Button */}
        {paymentMethod === "cash" && (
          <button
            type="button"
            onClick={handleCashCheckout}
            disabled={loading || items.length === 0}
            className={`px-6 py-3 mt-5 rounded-md text-white transition w-full ${
              loading || items.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : `Place Order (${finalTotal} LE)`}
          </button>
        )}

        {paymentMethod === "card" && savedCards.length > 0 && !useNewCard && (
          <button
            type="button"
            onClick={handlePayWithSavedCard}
            disabled={loading || items.length === 0 || !selectedCard}
            className={`px-6 py-3 mt-5 rounded-md text-white transition w-full ${
              loading || items.length === 0 || !selectedCard
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : `Pay ${finalTotal} LE`}
          </button>
        )}
      </div>

      {/* مكون التنبيه من Material UI */}
    </div>
  );
};

export default CartSummary;
