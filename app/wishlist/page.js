"use client";

import { useWishlistStore } from "../store/wishlistStore";
import ProductCard from "../../components/product/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems } = useWishlistStore();

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-heading">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl text-gray-600 mb-4">
            Your wishlist is empty.
          </h2>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap px-5 justify-center">
          {wishlistItems.map((product) => (
            <div key={product.id} className="m-5 min-w-56">
              <ProductCard
                product={product}
                category={product.category || "phones"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
