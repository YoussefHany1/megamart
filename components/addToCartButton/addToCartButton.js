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
      className="btn btn-outline-primary btn-lg w-100 mx-lg-3 text-nowrap"
      // onClick={() => setShowMark(true)}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </button>
  );
}
