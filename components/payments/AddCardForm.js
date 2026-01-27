"use client";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Alert, Snackbar, Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function AddCardForm({ userId, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // control alert messages (Snackbar)
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // close the alert
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Confirm setup
      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // 2. Fetch Payment Method details from Stripe Backend
      const paymentMethodId = setupIntent.payment_method;

      const paymentMethodRes = await fetch("/api/get-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId }),
      });

      if (!paymentMethodRes.ok) {
        throw new Error("Failed to get payment method details");
      }

      const paymentMethodData = await paymentMethodRes.json();

      // save card details to Firestore
      const cardData = {
        userId: userId,
        stripePaymentMethodId: paymentMethodId,
        brand: paymentMethodData.card.brand,
        last4: paymentMethodData.card.last4,
        expiryMonth: paymentMethodData.card.exp_month
          .toString()
          .padStart(2, "0"),
        expiryYear: paymentMethodData.card.exp_year.toString(),
        isDefault: false,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "paymentMethods"), cardData);

      // show success message
      setToast({
        open: true,
        message: "Card saved successfully!",
        severity: "success",
      });

      // delay execution
      setTimeout(() => {
        onSuccess({
          id: docRef.id,
          ...cardData,
        });
      }, 1500);
    } catch (err) {
      console.error("Error adding card:", err);
      // show error message
      setToast({
        open: true,
        message: err.message || "Failed to add card.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      <div className="flex gap-3 pt-4 flex-wrap">
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={!stripe || loading}
          startIcon={
            loading ? <CircularProgress /> : <SaveIcon fontSize="small" />
          }
          sx={{
            backgroundColor: "var(--color-primary)",
            "&:hover": {
              backgroundColor: "#006895",
            },
          }}
        >
          {loading ? "Saving..." : "Save Card"}
        </Button>

        <Button
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          color="primary"
          onClick={onCancel}
          startIcon={<CancelOutlinedIcon fontSize="small" />}
          className="flex items-center"
          sx={{
            color: "var-text",
            "&:hover": {
              backgroundColor: "gray-100",
            },
          }}
        >
          Cancel
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Your card information is encrypted and securely stored by Stripe
      </p>

      {/* alert */}
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
    </form>
  );
}
