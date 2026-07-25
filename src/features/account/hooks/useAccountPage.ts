import { useState, useEffect } from "react";
import { BasicInfoData, AddressData } from "../types";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useAccountManager } from "./useAccountManager";

export function useAccountPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const {
    loading: actionLoading,
    fetchUserData,
    updateBasicInfo,
    updateAddress,
    sendResetLink,
    deleteAccount,
  } = useAccountManager(user);

  const [initialData, setInitialData] = useState<Partial<BasicInfoData & AddressData> | null>(null);
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
        setInitialData((data as BasicInfoData & AddressData) || {});
        setPageLoading(false);
      });
    } else {
      // If no user initially, stop loading to activate route protection
      setTimeout(() => setPageLoading(false), 1000);
    }
  }, [user, fetchUserData]);

  return {
    user,
    router,
    actionLoading,
    updateBasicInfo,
    updateAddress,
    sendResetLink,
    deleteAccount,
    initialData,
    pageLoading,
  };
}
