import { Metadata } from "next";
import WishlistClient from "@/features/wishlist/components/WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist | MegaMart",
  description: "View and manage your saved items.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
