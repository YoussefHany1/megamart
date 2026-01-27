import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/stripe";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";
import { Alert, Snackbar } from "@mui/material";

const formatPrice = (price) => {
  if (typeof price === "string") {
    return price.replace(/[^0-9.]/g, "");
  }
  return price;
};

const CASH_ON_DELIVERY_FEE = 10;

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
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [useNewCard, setUseNewCard] = useState(false);
  const router = useRouter();

  // Snackbar
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'warning' | 'info'
  });

  // close the toast
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  const { subtotal, itemCount } = useMemo(() => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(formatPrice(item.price));
      return sum + price * item.quantity;
    }, 0);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: total.toFixed(2),
      itemCount: count,
    };
  }, [items]);

  const finalTotal = useMemo(() => {
    const subtotalNum = parseFloat(subtotal);
    const fee = paymentMethod === "cash" ? CASH_ON_DELIVERY_FEE : 0;
    return (subtotalNum + fee).toFixed(2);
  }, [subtotal, paymentMethod]);

  // Fetch saved cards
  useEffect(() => {
    if (!user) return;

    const fetchSavedCards = async () => {
      try {
        const q = query(
          collection(db, "paymentMethods"),
          where("userId", "==", user.uid),
        );

        const querySnapshot = await getDocs(q);
        const cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSavedCards(cards);

        // Automatically select the default card
        const defaultCard = cards.find((card) => card.isDefault);
        if (defaultCard) {
          setSelectedCard(defaultCard.id);
        }
      } catch (error) {
        console.error("Error fetching saved cards:", error);
      }
    };

    fetchSavedCards();
  }, [user]);

  // Handle payment with saved card
  const handlePayWithSavedCard = async () => {
    if (!user || !selectedCard) {
      setToast({
        open: true,
        message: "Please select a card",
        severity: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        setToast({
          open: true,
          message: "User data not found",
          severity: "error",
        });
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
        setToast({
          open: true,
          message: "Please add your shipping address in Account Settings",
          severity: "warning",
        });
        // delay before redirecting
        setTimeout(() => {
          router.push("/account");
        }, 1500);
        setLoading(false);
        return;
      }

      // Find the selected card
      const card = savedCards.find((c) => c.id === selectedCard);
      if (!card) {
        setToast({ open: true, message: "Card not found", severity: "error" });
        setLoading(false);
        return;
      }

      // Process payment with saved card
      const res = await fetch("/api/charge-saved-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: card.stripePaymentMethodId,
          amount: parseFloat(finalTotal),
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      const { paymentIntentId } = await res.json();

      // Save order in Firestore
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
        subtotal: subtotal,
        shippingFee: 0,
        totalAmount: finalTotal,
        paymentMethod: "card",
        paymentStatus: "paid",
        stripePaymentIntentId: paymentIntentId,
        itemCount: itemCount,
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

      setToast({
        open: true,
        message: "Payment successful! Order created.",
        severity: "success",
      });
      onClearCart();
      setTimeout(() => {
        router.push("/orders");
      }, 1500);
    } catch (error) {
      console.error("Payment error:", error);
      setToast({
        open: true,
        message: "Payment failed: " + error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cash checkout
  const handleCashCheckout = async () => {
    if (!user) {
      setToast({
        open: true,
        message: "Please login to proceed with checkout",
        severity: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        setToast({
          open: true,
          message: "User data not found",
          severity: "error",
        });
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
        setToast({
          open: true,
          message: "Please add shipping address",
          severity: "warning",
        });
        setTimeout(() => {
          router.push("/account");
        }, 1500);
        setLoading(false);
        return;
      }

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
        subtotal: subtotal,
        shippingFee: CASH_ON_DELIVERY_FEE,
        totalAmount: finalTotal,
        paymentMethod: "cash",
        paymentStatus: "pending",
        itemCount: itemCount,
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

      setToast({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
      onClearCart();
      setTimeout(() => {
        router.push("/orders");
      }, 1500);
    } catch (error) {
      console.error("Error placing order:", error);
      setToast({
        open: true,
        message: "Failed to place order: " + error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
                        onSuccess={() => {
                          // إضافة رسالة نجاح هنا أيضاً لعملية الدفع ببطاقة جديدة
                          setToast({
                            open: true,
                            message: "Order placed successfully!",
                            severity: "success",
                          });
                          onClearCart();
                          setTimeout(() => {
                            router.push("/orders");
                          }, 1500);
                        }}
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
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CartSummary;
