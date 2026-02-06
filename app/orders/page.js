"use client";
import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
import OrderCard from "../../components/orders/OrderCard";
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const DialogActions = dynamic(() => import("@mui/material/DialogActions"));
const DialogContent = dynamic(() => import("@mui/material/DialogContent"));
const DialogContentText = dynamic(
  () => import("@mui/material/DialogContentText"),
);
const DialogTitle = dynamic(() => import("@mui/material/DialogTitle"));
const Button = dynamic(() => import("@mui/material/Button"));
const Snackbar = dynamic(() => import("@mui/material/Snackbar"));
const Alert = dynamic(() => import("@mui/material/Alert"));

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
  const handleCancelRequest = useCallback((id) => setSelectedOrderId(id), []);
  const closeDialog = () => setSelectedOrderId(null);

  const confirmCancelOrder = async () => {
    const orderId = selectedOrderId;
    closeDialog();

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "cancelled" });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
      );
      setToast({
        open: true,
        message: "Order cancelled successfully.",
        severity: "success",
      });
    } catch (error) {
      setToast({
        open: true,
        message: "Failed to cancel order.",
        severity: "error",
      });
    }
  };

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to view your orders
        </h2>
        <Link href="/" className="text-primary hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">My Orders</h1>
        <p className="text-gray-500 mt-2">
          Manage your recent orders and tracking status.
        </p>
      </header>

      {orders.length === 0 ? (
        <EmptyOrdersState />
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={handleCancelRequest}
            />
          ))}
        </div>
      )}

      {/* Cancel confirmation dialog */}
      {selectedOrderId && (
        <Dialog open={!!selectedOrderId} onClose={closeDialog}>
          <DialogTitle>Cancel Order?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure? This action will cancel order #
              {selectedOrderId.slice(0, 8)} and cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions className="p-4">
            <Button
              onClick={confirmCancelOrder}
              color="error"
              variant="contained"
            >
              Confirm Cancellation
            </Button>
            <Button onClick={closeDialog} variant="contained">
              Keep Order
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </main>
  );
}

// empty state
function EmptyOrdersState() {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
      <p className="text-xl text-gray-600 mb-6">
        You haven't placed any orders yet.
      </p>
      <Link
        href="/"
        className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:brightness-110 transition"
      >
        Explore Products
      </Link>
    </div>
  );
}
