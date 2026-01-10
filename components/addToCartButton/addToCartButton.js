// components/ButtonComponent.js
"use client";
// import { useMark } from "../../context/MarkContext";
import { useCartStore } from "../../app/store/cartStore";

export default function ButtonComponent({ product }) {
  // const { setShowMark } = useMark();
  console.log(product);
  const addItem = useCartStore((state) => state.addItem);
  return (
    <button
      type="button"
      className="w-full lg:mx-3 whitespace-nowrap px-6 py-3 border rounded-md border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
      // onClick={() => setShowMark(true)}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </button>
  );
}
