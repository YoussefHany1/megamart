"use client";
import { useCartStore } from "../../app/store/cartStore";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleBuyNow = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <button
      type="button"
      className="w-full lg:mx-3 lg:mb-0 mb-3 whitespace-nowrap px-6 py-3 rounded-md bg-[var(--primary)] text-white hover:bg-[#0279ac] transition"
      onClick={handleBuyNow}
      aria-label={`Buy ${product.name} now`}
    >
      Buy Now
    </button>
  );
}
