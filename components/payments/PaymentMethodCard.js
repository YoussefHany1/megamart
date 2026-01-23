import CardIcon from "./CardIcon";

export default function PaymentMethodCard({ card, onSetDefault, onDelete }) {
  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-sm border-2 transition ${
        card.isDefault
          ? "border-(--primary)"
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

        <div className="flex items-center gap-2">
          {!card.isDefault && (
            <button
              onClick={() => onSetDefault(card.id)}
              className="px-4 py-2 text-sm border border-(--primary) text-(--primary) rounded-md hover:bg-(--primary) hover:text-white transition"
            >
              Set as Default
            </button>
          )}

          <button
            onClick={() => onDelete(card.id, card.stripePaymentMethodId)}
            className="px-4 py-2 text-sm border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
