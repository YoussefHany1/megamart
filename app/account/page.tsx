import { Metadata } from "next";
import AccountClient from "@/features/account/components/AccountClient";

export const metadata: Metadata = {
  title: "Account Settings | MegaMart",
  description: "Manage your personal information and address.",
};

export default function AccountPage() {
  return <AccountClient />;
}
