import { useToastStore } from "@/stores/toastStore";
import { useState } from "react";
import { AddressData } from "../types";

export function useAddressForm(
  initialData: AddressData,
  onSave: (data: AddressData) => Promise<void>
) {
  const [formData, setFormData] = useState<AddressData>({
    addressCountry: initialData.addressCountry || "",
    addressFullName: initialData.addressFullName || "",
    addressMobile: initialData.addressMobile || "",
    streetName: initialData.streetName || "",
    buildingName: initialData.buildingName || "",
    city: initialData.city || "",
    district: initialData.district || "",
    governorate: initialData.governorate || "",
    landmark: initialData.landmark || "",
  });

  const { showToast } = useToastStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await onSave(formData);

      showToast("Address saved successfully!", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to save address. Please try again.", "error");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
