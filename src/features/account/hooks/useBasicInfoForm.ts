import { useToastStore } from "@/stores/toastStore";
import { useState } from "react";
import { BasicInfoData } from "../types";
import dayjs from "dayjs";

export function useBasicInfoForm(
  initialData: BasicInfoData,
  onSave: (data: BasicInfoData) => Promise<void>,
  onResetPassword: () => Promise<void>
) {
  const [formData, setFormData] = useState<BasicInfoData>({
    displayName: initialData.displayName || "",
    email: initialData.email || "",
    gender: initialData.gender || "",
    birthDate: initialData.birthDate ? dayjs(initialData.birthDate) : null,
    phoneNumber: initialData.phoneNumber || "",
  });

  const { showToast } = useToastStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await onSave(formData);

      showToast("Basic info updated successfully!", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to update info. Please try again.", "error");
    }
  };

  const handleResetClick = async () => {
    try {
      await onResetPassword();
      showToast("Password reset link sent to your email!", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to send reset link.", "error");
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleResetClick,
  };
}
