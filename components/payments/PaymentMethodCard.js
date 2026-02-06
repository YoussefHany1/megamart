import CardIcon from "./CardIcon";
import Button from "@mui/material/Button";

function PaymentMethodCard({ card, onSetDefault, onDelete }) {
  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-sm border-2 transition ${
        card.isDefault
          ? "border-primary"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CardIcon brand={card.brand} />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg capitalize">{card.brand}</span>
              {card.isDefault && (
                <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
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

        <div className="flex items-center gap-2">
          {!card.isDefault && (
            <Button
              onClick={() => onSetDefault(card.id)}
              variant="outlined"
              color="primary"
              sx={{
                "&:hover": {
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                },
              }}
            >
              Set as Default
            </Button>
          )}

          <Button
            onClick={() => onDelete(card.id, card.stripePaymentMethodId)}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
export default PaymentMethodCard;
