import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const formatPrice = (price) => {
  if (typeof price === "string") {
    return price.replace(/[^0-9.]/g, "");
  }
  return price;
};

// 1. تعريف قيمة المصاريف الإضافية كثابت
const CASH_ON_DELIVERY_FEE = 10;

const CartSummary = ({ items, onClearCart }) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [saveCard, setSaveCard] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { subtotal, itemCount } = useMemo(() => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(formatPrice(item.price));
      return sum + price * item.quantity;
    }, 0);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: total.toFixed(2), // هذا المجموع الفرعي للمنتجات فقط
      itemCount: count,
    };
  }, [items]);

  // 2. حساب الإجمالي النهائي (المنتجات + مصاريف الدفع)
  const finalTotal = useMemo(() => {
    const subtotalNum = parseFloat(subtotal);
    const fee = paymentMethod === "cash" ? CASH_ON_DELIVERY_FEE : 0;
    return (subtotalNum + fee).toFixed(2);
  }, [subtotal, paymentMethod]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("يجب عليك تسجيل الدخول أولاً لإتمام الطلب.");
      return;
    }

    setLoading(true);

    if (paymentMethod === "visa") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
        alert("Please fill in all card details.");
        return;
      }
      if (saveCard && user) {
        console.log("Saving card for user:", user.uid);
      }
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const hasAddress =
          userData.addressCountry &&
          userData.city &&
          userData.streetName &&
          userData.addressMobile;

        if (!hasAddress) {
          alert(
            "لا يوجد عنوان مسجل. سيتم توجيهك لصفحة الحساب لإضافة عنوان الشحن.",
          );
          router.push("/account");
          setLoading(false);
          return;
        }

        const orderItems = items.map((item) => ({
          id: item.id || "unknown-id",
          title: item.name || item.title || "No Title",
          price: item.price || 0,
          img: item.pic || item.img || item.image || "/placeholder.png",
          quantity: item.quantity || 1,
          category: item.category || "General",
        }));

        const orderData = {
          userId: user.uid,
          userEmail: user.email || "No Email",
          items: orderItems,
          subtotal: subtotal, // 3. حفظ المجموع الفرعي
          shippingFee: paymentMethod === "cash" ? CASH_ON_DELIVERY_FEE : 0, // 4. حفظ قيمة المصاريف
          totalAmount: finalTotal, // 5. حفظ الإجمالي النهائي الجديد
          paymentMethod: paymentMethod, // 6. حفظ طريقة الدفع
          itemCount: itemCount || 0,
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

        console.log("Order Data being sent:", orderData);

        await addDoc(collection(db, "orders"), orderData);

        alert("تم تسجيل طلبك بنجاح!");
        onClearCart();
        router.push("/orders");
      } else {
        alert("يرجى تحديث بيانات حسابك أولاً.");
        router.push("/account");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("حدث خطأ أثناء إتمام الطلب: " + error.message);
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
          aria-label="Clear all items from cart"
          disabled={items.length === 0 || loading}
        >
          {/* SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="mr-1"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg>
          Clear Cart
        </button>
      </div>

      <div className="summary-details">
        {/* Subtotal Display */}
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal ({itemCount} items):</span>
          <span className="font-semibold">{subtotal} LE</span>
        </div>

        {/* 7. عرض مصاريف الدفع عند الاستلام إذا تم اختيار كاش */}
        {paymentMethod === "cash" && (
          <div className="flex justify-between mb-2 animate-fadeIn">
            <span className="text-gray-500">Cash on Delivery Fee:</span>
            <span className="font-semibold text-red-500">
              +{CASH_ON_DELIVERY_FEE} LE
            </span>
          </div>
        )}

        <hr />

        {/* --- Payment Method Section Start --- */}
        <div className="payment-method my-4">
          <h4 className="font-bold mb-2">Payment Method</h4>

          <div className="flex gap-4 mb-3">
            <label className="flex items-center cursor-pointer sm:text-nowrap">
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
            <label className="flex items-center cursor-pointer sm:text-nowrap">
              <input
                type="radio"
                name="payment"
                value="visa"
                checked={paymentMethod === "visa"}
                onChange={() => setPaymentMethod("visa")}
                className="mr-2"
              />
              Visa / MasterCard
            </label>
          </div>

          {/* Visa Details Form */}
          {paymentMethod === "visa" && (
            <div className="visa-details bg-white p-3 rounded border border-gray-200 text-sm animate-fadeIn">
              {/* ... (نفس حقول الفيزا السابقة) ... */}
              <div className="mb-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={cardDetails.name}
                  onChange={handleCardInputChange}
                  className="w-full p-2 rounded outline-2 outline-(--border) focus-visible:outline-(--primary)! transition"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="number"
                  placeholder="Card Number"
                  maxLength="16"
                  value={cardDetails.number}
                  onChange={handleCardInputChange}
                  className="w-full p-2 rounded outline-2 outline-(--border) focus-visible:outline-(--primary)! transition"
                />
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  className="w-1/2 p-2 rounded outline-2 outline-(--border) focus-visible:outline-(--primary)! transition"
                />
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  maxLength="3"
                  value={cardDetails.cvc}
                  onChange={handleCardInputChange}
                  className="w-1/2 p-2 rounded outline-2 outline-(--border) focus-visible:outline-(--primary)! transition"
                />
              </div>
              {user && (
                <label className="flex items-center text-xs text-gray-600 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="mr-2"
                  />
                  Save card for future purchases
                </label>
              )}
            </div>
          )}
        </div>
        {/* --- Payment Method Section End --- */}

        {/* 8. عرض الإجمالي النهائي بدلاً من الـ Subtotal فقط */}
        <div className="flex justify-between mb-3 border-t pt-2">
          <span className="text-lg font-bold">Total Amount:</span>
          <span className="text-lg font-bold text-green-600">
            {finalTotal} LE
          </span>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
          className={`px-6 py-3 mt-5 rounded-md text-white transition w-full ${
            loading || items.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-(--primary) hover:bg-[#0279ac]"
          }`}
          aria-label="Proceed to checkout"
        >
          {loading ? "Processing..." : `Checkout (${finalTotal} LE)`}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
