"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import Loading from "../loading";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        // الاستعلام عن الطلبات الخاصة بالمستخدم الحالي
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          // ملاحظة: لاستخدام orderBy مع where، قد يطلب منك Firestore إنشاء Index في الـ Console
          // orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ترتيب الطلبات حسب التاريخ (الأحدث أولاً) يدوياً لتجنب مشاكل الـ Index مؤقتاً
        ordersData.sort((a, b) => {
          const dateA = a.createdAt?.toDate
            ? a.createdAt.toDate()
            : new Date(0);
          const dateB = b.createdAt?.toDate
            ? b.createdAt.toDate()
            : new Date(0);
          return dateB - dateA;
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    // تأكيد من المستخدم
    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?",
    );
    if (!confirmCancel) return;

    try {
      const orderRef = doc(db, "orders", orderId);

      // تحديث الحالة في قاعدة البيانات
      await updateDoc(orderRef, {
        status: "cancelled",
      });

      // تحديث الواجهة فوراً (Optimistic Update)
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order,
        ),
      );

      alert("Order has been cancelled.");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please check your connection.");
    }
  };

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to view your orders
        </h2>
        <Link href="/" className="text-(--primary) hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-(--primary)">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">
            You haven't placed any orders yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-(--primary) text-white px-6 py-2 rounded hover:bg-[#0279ac] transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* رأس الطلب: التاريخ، الإجمالي، الحالة */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Placed</p>
                  <p className="font-medium text-gray-900">
                    {order.createdAt?.toDate().toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium text-gray-900">
                    {order.totalAmount} LE
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-sm text-gray-700">
                    #{order.id.slice(0, 8)}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                  {order.status === "pending" && (
                    <div>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* تفاصيل المنتجات في الطلب */}
              <div className="p-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center py-4 border-b last:border-0 border-gray-100"
                  >
                    <div className="shrink-0 w-16 h-16 relative border rounded bg-gray-100">
                      {/* تأكد من أن الصور لها روابط صحيحة أو استخدم صورة افتراضية */}
                      <Image
                        src={item.img || "/placeholder.png"}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <Link
                        href={`/product-page/${item.category}/${item.id}`}
                        className="text-sm font-bold text-gray-900 line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {item.quantity} × {item.price}LE
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* عنوان الشحن (اختياري) */}
              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-sm text-gray-600">
                <span className="font-semibold">Shipping to: </span>
                {order.shippingAddress?.street}, {order.shippingAddress?.city}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
