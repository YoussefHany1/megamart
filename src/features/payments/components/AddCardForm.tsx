"use client";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useAddCardForm } from "../hooks/useAddCardForm";
import { PaymentMethodCard } from "../types";

type AddCardFormProps = {
  userId: string;
  onSuccess: (card: PaymentMethodCard) => void;
  onCancel: () => void;
};

export default function AddCardForm({
  userId,
  onSuccess,
  onCancel,
}: AddCardFormProps) {
  const { stripe, loading, handleSubmit } = useAddCardForm(userId, onSuccess);

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
    </form>
  );
}
