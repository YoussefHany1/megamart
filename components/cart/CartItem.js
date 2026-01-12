import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const MAX_TITLE_LENGTH = 100;

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

export default CartItem;
