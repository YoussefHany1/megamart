import { Metadata } from "next";
import PaymentsClient from "@/features/payments/components/PaymentsClient";

export const metadata: Metadata = {
  title: "Payment Methods | MegaMart",
  description: "Manage your payment methods and credit cards securely.",
};

export default function PaymentMethodsPage() {
  return <PaymentsClient />;
}
