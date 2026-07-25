import { Metadata } from "next";
import OrdersClient from "@/features/orders/components/OrdersClient";

export const metadata: Metadata = {
  title: "My Orders | MegaMart",
  description: "Manage your recent orders and tracking status.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
