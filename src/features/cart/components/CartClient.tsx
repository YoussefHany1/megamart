"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import CartItem from "@/features/cart/components/CartItem";
import CartSummary from "@/features/cart/components/CartSummary";
import EmptyCart from "@/features/cart/components/EmptyCart";
import { Skeleton } from "@mui/material";

export default function CartClient() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="cart-page container mx-auto py-5">
        <div className="flex md:flex-nowrap flex-wrap justify-center lg:gap-20 gap-5 mb-16">
          <div className="lg:col-span-8 w-full">
            <Skeleton variant="rectangular" height={150} sx={{ mb: 2, borderRadius: 2 }} />
            <Skeleton variant="rectangular" height={150} sx={{ mb: 2, borderRadius: 2 }} />
          </div>
          <div className="lg:col-span-4 w-full">
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container mx-auto py-5">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex md:flex-nowrap flex-wrap justify-center lg:gap-20 gap-5 mb-16">
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
