import { useMemo } from "react";

const formatPrice = (price) => {
  if (typeof price === "string") {
    return price.replace(/[^0-9.]/g, "");
  }
  return price;
};

const CartSummary = ({ items, onClearCart }) => {
  const { subtotal, itemCount } = useMemo(() => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(formatPrice(item.price));
      return sum + price * item.quantity;
    }, 0);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: total.toFixed(2),
      itemCount: count,
    };
  }, [items]);

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
        >
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
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Items ({itemCount}):</span>
          <span className="font-semibold">{subtotal} LE</span>
        </div>
        <hr />
        <div className="flex justify-between mb-3">
          <span className="text-lg font-bold">Subtotal:</span>
          <span className="text-lg font-bold text-green-600">
            {subtotal} LE
          </span>
        </div>

        <button
          type="button"
          className="px-6 py-3 mt-5 rounded-md bg-(--primary) text-white hover:bg-[#0279ac] transition w-full"
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
