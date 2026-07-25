import { useMemo } from "react";
import { CartItem } from "@/types";

const MAX_TITLE_LENGTH = 100;

export const formatPrice = (price: string | number) => {
  if (typeof price === "string") {
    return price.replace(/[^0-9.]/g, "");
  }
  return price;
};

const calculateItemTotal = (price: string | number, quantity: number) => {
  const numPrice = parseFloat(formatPrice(price).toString());
  return (numPrice * quantity).toFixed(2);
};

export function useCartItem(item: CartItem) {
  const truncatedName = useMemo(() => {
    if (item.name.length > MAX_TITLE_LENGTH) {
      return `${item.name.substring(0, MAX_TITLE_LENGTH)}...`;
    }
    return item.name;
  }, [item.name]);

  const itemTotal = useMemo(() => {
    return calculateItemTotal(item.price, item.quantity);
  }, [item.price, item.quantity]);

  return {
    truncatedName,
    itemTotal,
  };
}
