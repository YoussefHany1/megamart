"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

// Constants
const MAX_TITLE_LENGTH = 100;

// Utility Functions
const formatPrice = (price) => {
  if (typeof price === "string") {
    return price.replace(/[^0-9.]/g, "");
  }
  return price;
};

const calculateItemTotal = (price, quantity) => {
  const numPrice = parseFloat(formatPrice(price));
  return (numPrice * quantity).toFixed(2);
};

// Empty Cart Component
const EmptyCart = () => (
  <div className="empty-cart text-center py-5 my-5">
    <div
      className="inline-block bg-yellow-100 text-yellow-800 border border-yellow-300 rounded p-6"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="currentColor"
        className="mb-3"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
      <h2 className="text-4xl font-bold text-red-600 mb-3">
        Your Cart is Empty
      </h2>
      <p className="text-xl text-black mb-3">
        Your Shopping Cart lives to serve. Give it purpose!
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-md bg-(--primary) text-white hover:bg-[#0279ac] transition"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);

// Cart Item Component
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const truncatedName = useMemo(() => {
    if (item.name.length > MAX_TITLE_LENGTH) {
      return `${item.name.substring(0, MAX_TITLE_LENGTH)}...`;
    }
    return item.name;
  }, [item.name]);

  const itemTotal = useMemo(() => {
    return calculateItemTotal(item.price, item.quantity);
  }, [item.price, item.quantity]);

  return (
    <article className="cart-item py-4 border-b">
      <div className="flex justify-between items-center">
        {/* Product Info */}
        <div className="product-info grow mr-3">
          <h3 className="product-title font-bold mb-2 sm:text-xl">
            <Link
              href={`/product-page/phones/${item.id}`}
              className="no-underline text-black"
              title={item.name}
            >
              {truncatedName}
            </Link>
          </h3>

          {/* Price Info */}
          <div className="price-info mb-3">
            <p className="font-semibold text-lg mb-1 text-(--primary)">
              {formatPrice(item.price)} LE
              <span className="text-gray-500 ml-2">× {item.quantity}</span>
            </p>
            <p className="font-bold text-2xl mb-0 text-green-600">
              Total: {itemTotal} LE
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="quantity-controls">
            <div
              className="inline-flex gap-2 items-center"
              role="group"
              aria-label="Quantity controls"
            >
              {/* Decrease quantity */}
              <button
                type="button"
                className="px-3 py-2 border rounded-md text-xs lg:text-sm border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50"
                onClick={() => onDecrease(item.id)}
                aria-label="Decrease quantity"
                disabled={item.quantity === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
              </button>

              <span className="text-center px-4 py-2 text-xs lg:text-sm border rounded-md border-gray-400 font-bold">
                {item.quantity}
              </span>
              {/* Increase quantity */}
              <button
                type="button"
                className="px-3 py-2 border rounded-md text-xs lg:text-sm border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-white"
                onClick={() => onIncrease(item.id)}
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
              {/* Remove item */}
              <button
                type="button"
                className="flex px-3 py-2 border rounded-md text-xs lg:text-sm border-red-500 text-red-600 hover:bg-red-50 ml-2"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name} from cart`}
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
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="product-image-wrapper">
          <Image
            src={item.pic}
            alt={item.name}
            width={200}
            height={200}
            className="product-image rounded-md max-w-full h-auto outline-2 outline-(--background1) min-w-16"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
    </article>
  );
};

// Cart Summary Component
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

// Main Cart Component
function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  return (
    <main className="cart-page container mx-auto py-5 p-[10%]">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex sm:flex-nowrap flex-wrap items-center justify-center lg:gap-20 gap-5">
          <div className="lg:col-span-8">
            <div className="cart-items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increaseQty}
                  onDecrease={decreaseQty}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <CartSummary items={items} onClearCart={clearCart} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
