"use client";
import dynamic from "next/dynamic";
import { useCartStore } from "../store/cartStore";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
const EmptyCart = dynamic(() => import("../../components/cart/EmptyCart"));

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

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

export default Cart;
