"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/stripe";
import AddCardForm from "../../components/payments/AddCardForm";
import Loading from "../loading";

// Credit Card Icons
const CardIcon = ({ brand }) => {
  const icons = {
    visa: (
      <svg viewBox="0 0 48 32" className="h-8 w-12">
        <rect width="48" height="32" rx="4" fill="#1434CB" />
        <text
          x="24"
          y="20"
          fill="white"
          fontSize="10"
          textAnchor="middle"
          fontWeight="bold"
        >
          VISA
        </text>
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 48 32" className="h-8 w-12">
        <rect width="48" height="32" rx="4" fill="#EB001B" />
        <circle cx="18" cy="16" r="8" fill="#FF5F00" />
        <circle cx="30" cy="16" r="8" fill="#F79E1B" />
      </svg>
    ),
    default: (
      <svg viewBox="0 0 48 32" className="h-8 w-12">
        <rect width="48" height="32" rx="4" fill="#6B7280" />
        <rect x="4" y="8" width="40" height="4" fill="white" opacity="0.5" />
        <rect x="4" y="20" width="12" height="4" fill="white" opacity="0.5" />
      </svg>
    ),
  };

  return icons[brand] || icons.default;
};

export default function PaymentMethodsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // جلب البطاقات المحفوظة
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPaymentMethods = async () => {
      try {
        const q = query(
          collection(db, "paymentMethods"),
          where("userId", "==", user.uid),
        );

        const querySnapshot = await getDocs(q);
        const methods = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPaymentMethods(methods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setMessage({
          type: "error",
          text: "Failed to load payment methods",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [user]);

  const handleShowAddCard = async () => {
    setMessage({ type: "", text: "" });

    // لو الـ Form مفتوح، نقفله ونصفر الـ secret
    if (showAddCard) {
      setShowAddCard(false);
      setClientSecret(null);
      return;
    }

    // لو هنفتح الفورم، نجيب الـ Client Secret الأول
    try {
      const res = await fetch("/api/create-setup-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, email: user.email }),
      });

      if (!res.ok) throw new Error("Failed to initialize payment setup");

      const data = await res.json();
      setClientSecret(data.clientSecret); // تخزين الـ Secret
      setShowAddCard(true); // إظهار الفورم الآن فقط
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Could not load payment form" });
    }
  };

  // حماية الصفحة
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !loading) {
        router.push("/");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user, loading, router]);

  // حذف بطاقة
  const handleDeleteCard = async (cardId, stripePaymentMethodId) => {
    if (!confirm("Are you sure you want to delete this card?")) return;

    try {
      // حذف من Stripe
      const res = await fetch("/api/delete-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: stripePaymentMethodId }),
      });

      if (!res.ok) throw new Error("Failed to delete from Stripe");

      // حذف من Firestore
      await deleteDoc(doc(db, "paymentMethods", cardId));

      setPaymentMethods(paymentMethods.filter((card) => card.id !== cardId));
      setMessage({ type: "success", text: "Card deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error deleting card:", error);
      setMessage({ type: "error", text: "Failed to delete card" });
    }
  };

  // تعيين بطاقة كـ Default
  const handleSetDefault = async (cardId) => {
    try {
      // إزالة Default من جميع البطاقات
      const batch = paymentMethods.map((card) =>
        updateDoc(doc(db, "paymentMethods", card.id), {
          isDefault: card.id === cardId,
        }),
      );

      await Promise.all(batch);

      setPaymentMethods(
        paymentMethods.map((card) => ({
          ...card,
          isDefault: card.id === cardId,
        })),
      );

      setMessage({ type: "success", text: "Default card updated!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error setting default:", error);
      setMessage({ type: "error", text: "Failed to update default card" });
    }
  };

  // بعد إضافة بطاقة جديدة بنجاح
  const handleCardAdded = (newCard) => {
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
    setClientSecret(null);
    setMessage({ type: "success", text: "Card added successfully!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  if (loading) return <Loading />;
  if (!user) return null;

  // إعدادات مظهر Stripe
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-(--primary)">
        Payment Methods
      </h1>

      {/* رسالة النجاح/الخطأ */}
      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* زر إضافة بطاقة */}
      <button
        onClick={handleShowAddCard}
        className="mb-6 px-6 py-3 bg-(--primary) text-white rounded-md hover:bg-[#0279ac] transition flex items-center gap-2"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg> */}
        {showAddCard ? "Cancel" : "Add New Card"}
      </button>

      {/* نموذج إضافة بطاقة */}
      {showAddCard && clientSecret && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Payment Method</h2>
            <button
              onClick={() => setShowAddCard(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Elements stripe={stripePromise} options={options}>
            <AddCardForm
              userId={user.uid}
              onSuccess={handleCardAdded}
              onCancel={() => setShowAddCard(false)}
            />
          </Elements>
        </div>
      )}

      {/* قائمة البطاقات */}
      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <p className="text-xl text-gray-600 mb-2">
              No payment methods saved
            </p>
            <p className="text-gray-500">Add a card to make checkout faster</p>
          </div>
        ) : (
          paymentMethods.map((card) => (
            <div
              key={card.id}
              className={`p-6 bg-white rounded-lg shadow-sm border-2 transition ${
                card.isDefault
                  ? "border-(--primary)"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* معلومات البطاقة */}
                <div className="flex items-center gap-4">
                  <CardIcon brand={card.brand} />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg capitalize">
                        {card.brand}
                      </span>
                      {card.isDefault && (
                        <span className="px-2 py-1 bg-(--primary) text-white text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">•••• •••• •••• {card.last4}</p>
                    <p className="text-sm text-gray-500">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>

                {/* الأزرار */}
                <div className="flex items-center gap-2">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="px-4 py-2 text-sm border border-(--primary) text-(--primary) rounded-md hover:bg-(--primary) hover:text-white transition"
                    >
                      Set as Default
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDeleteCard(card.id, card.stripePaymentMethodId)
                    }
                    className="px-4 py-2 text-sm border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* معلومات الأمان */}
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
              All payment information is encrypted and securely stored by
              Stripe. We never see or store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
