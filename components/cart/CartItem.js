import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
            <p className="font-semibold text-lg mb-1 text-primary">
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
                <HorizontalRuleIcon fontSize="small" />
              </button>

              <span className="text-center px-4 py-2 text-xs lg:text-sm border rounded-md border-gray-400 font-bold">
                {item.quantity}
              </span>
              {/* Increase quantity */}
              <button
                type="button"
                className="px-3 py-2 border rounded-md text-xs lg:text-sm border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => onIncrease(item.id)}
                aria-label="Increase quantity"
              >
                <AddIcon fontSize="small" />
              </button>
              {/* Remove item */}
              <button
                type="button"
                className="flex px-3 py-2 border rounded-md text-xs lg:text-sm border-red-500 text-red-600 hover:bg-red-50 ml-2"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <DeleteIcon fontSize="small" />
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
            className="product-image rounded-md max-w-full h-auto outline-2 outline-background1 min-w-16"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
    </article>
  );
};

export default CartItem;
