"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useOrdersPage } from "@/features/orders/hooks/useOrdersPage";
import Loading from "../../../../app/loading";
import OrderCard from "@/features/orders/components/OrderCard";
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const DialogActions = dynamic(() => import("@mui/material/DialogActions"));
const DialogContent = dynamic(() => import("@mui/material/DialogContent"));
const DialogContentText = dynamic(
  () => import("@mui/material/DialogContentText"),
);
const DialogTitle = dynamic(() => import("@mui/material/DialogTitle"));
const Button = dynamic(() => import("@mui/material/Button"));

export default function OrdersClient() {
  const {
    user,
    orders,
    loading,
    selectedOrderId,

    handleCancelRequest,
    closeDialog,
    confirmCancelOrder,
  } = useOrdersPage();

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
        <Dialog
          open={!!selectedOrderId}
          onClose={closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Cancel Order?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
