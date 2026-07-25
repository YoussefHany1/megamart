import { Metadata } from "next";
import CartClient from "@/features/cart/components/CartClient";

export const metadata: Metadata = {
  title: "My Cart | MegaMart",
  description: "View and manage items in your shopping cart.",
};

export default function CartPage() {
  return <CartClient />;
}
