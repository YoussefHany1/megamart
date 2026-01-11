"use client";
import { useCartStore } from "../../app/store/cartStore";

export default function ButtonComponent({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      className="w-full lg:mx-3 whitespace-nowrap px-6 py-3 border rounded-md border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-white transition"
      onClick={() => addItem(product)}
    >
      Add to Cart
    </button>
  );
}
