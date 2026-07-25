import { useToastStore } from "@/stores/toastStore";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { Order } from "@/types";

export function useOrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { showToast } = useToastStore();

  // Fetch Orders Logic
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Order,
        );

        // Sorting
        ordersData.sort(
          (a, b) =>
            (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0),
        );
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Handlers
  const handleCancelRequest = useCallback(
    (id: string) => setSelectedOrderId(id),
    [],
  );
  const closeDialog = () => setSelectedOrderId(null);

  const confirmCancelOrder = async () => {
    const orderId = selectedOrderId;
    closeDialog();

    try {
      const orderRef = doc(db, "orders", orderId as any);
      await updateDoc(orderRef, { status: "cancelled" });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
      );
      showToast("Order cancelled successfully.", "success");
    } catch (error) {
      showToast("Failed to cancel order.", "error");
    }
  };

  return {
    user,
    orders,
    loading,
    selectedOrderId,
    handleCancelRequest,
    closeDialog,
    confirmCancelOrder,
  };
}
