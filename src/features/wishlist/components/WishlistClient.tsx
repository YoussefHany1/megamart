"use client";
import { useState, useEffect } from "react";
import { useWishlistStore } from "@/stores/wishlistStore";
import ProductCard from "@/features/product/components/ProductCard";
import ProductCardSkeleton from "@/features/product/components/ProductCardSkeleton";
import Link from "next/link";

export default function WishlistClient() {
  const { wishlistItems } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-6 text-heading">My Wishlist</h1>
        <div className="flex flex-wrap px-5 justify-center">
          {Array.from(new Array(4)).map((_, index) => (
            <div key={index} className="m-5 min-w-56">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
