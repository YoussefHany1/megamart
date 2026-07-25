"use client";
import { useAccountPage } from "@/features/account/hooks/useAccountPage";
import BasicInfoForm from "@/features/account/components/BasicInfoForm";
import AddressForm from "@/features/account/components/AddressForm";
import DeleteAccount from "@/features/account/components/DeleteAccount";
import Loading from "../../../../app/loading";

export default function AccountClient() {
  const {
    user,
    router,
    actionLoading,
    updateBasicInfo,
    updateAddress,
    sendResetLink,
    deleteAccount,
    initialData,
    pageLoading,
  } = useAccountPage();

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
