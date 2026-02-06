import OrderItem from "./OrderItem";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

export default function OrderCard({ order, onCancel }) {
  const statusClass = STATUS_STYLES[order.status] || STATUS_STYLES.default;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
          <div>
            <p className="text-xs text-gray-500 uppercase">Order Placed</p>
            <p className="font-medium text-gray-900">
              {order.createdAt?.toDate().toLocaleDateString("en-GB")}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Total</p>
            <p className="font-medium text-gray-900">{order.totalAmount} LE</p>
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-gray-500 uppercase">Order ID</p>
            <p className="font-mono text-sm text-gray-700">
              #{order.id.slice(0, 8)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusClass}`}
          >
            {order.status || "Pending"}
          </span>
          {order.status === "pending" && (
            <button
              onClick={() => onCancel(order.id)}
              className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {order.items.map((item, index) => (
          <OrderItem key={`${order.id}-${index}`} item={item} />
        ))}
      </div>

      <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-sm text-gray-600">
        <span className="font-semibold text-gray-900">Shipping to: </span>
        {order.shippingAddress?.street}, {order.shippingAddress?.city}
      </div>
    </div>
  );
}
