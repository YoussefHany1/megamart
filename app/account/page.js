"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useAccountManager } from "../../hooks/useAccountManager";
import Loading from "../loading";
import BasicInfoForm from "../../components/account/BasicInfoForm";
import AddressForm from "../../components/account/AddressForm";
import DeleteAccount from "../../components/account/DeleteAccount";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    loading: actionLoading,
    fetchUserData,
    updateBasicInfo,
    updateAddress,
    sendResetLink,
    deleteAccount,
  } = useAccountManager(user);

  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Protect Route
  useEffect(() => {
    if (!user && !pageLoading) {
      // short time to check the user's status before redirecting
      const timer = setTimeout(() => router.push("/"), 500);
      return () => clearTimeout(timer);
    }
  }, [user, pageLoading, router]);

  // Fetch Data
  useEffect(() => {
    if (user) {
      fetchUserData().then((data) => {
        setInitialData(data || {});
        setPageLoading(false);
      });
    } else {
      // If no user initially, stop loading to activate route protection
      setTimeout(() => setPageLoading(false), 1000);
    }
  }, [user, fetchUserData]);

  if (pageLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-primary text-nowrap">
        Account Settings
      </h1>

      {/* Forms Section */}
      {initialData && (
        <>
          <BasicInfoForm
            initialData={initialData}
            onSave={updateBasicInfo}
            onResetPassword={sendResetLink}
            loading={actionLoading}
          />

          <AddressForm
            initialData={initialData}
            onSave={updateAddress}
            loading={actionLoading}
          />

          <DeleteAccount
            onDelete={() => deleteAccount(router)}
            loading={actionLoading}
          />
        </>
      )}
    </div>
  );
}
