import { useState } from "react";
import Input from "../account/Input";
// استيراد مكونات Material UI
import { Alert, Snackbar } from "@mui/material";

export default function AddressForm({ initialData, onSave, loading }) {
  const [formData, setFormData] = useState({
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

  // حالة للتحكم في رسائل التنبيه (Snackbar)
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'warning' | 'info'
  });

  // دالة لإغلاق التنبيه
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // انتظار اكتمال عملية الحفظ القادمة من الأب
      await onSave(formData);

      // إظهار رسالة نجاح
      setToast({
        open: true,
        message: "Address saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      // إظهار رسالة خطأ
      setToast({
        open: true,
        message: "Failed to save address. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-6 mt-6 border-t border-gray-100 space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
        Address Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country Input */}
        <Input
          label="Country / Region"
          name="addressCountry"
          value={formData.addressCountry}
          onChange={handleChange}
          placeholder="e.g. Egypt"
        />
        {/* Governorate Input */}
        <Input
          label="Governorate"
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          placeholder="e.g. Cairo"
        />
        {/* Name Input */}
        <Input
          label="Full Name (Recipient)"
          name="addressFullName"
          value={formData.addressFullName}
          onChange={handleChange}
        />
        {/* Mobile Number Input */}
        <Input
          label="Mobile Number (Address)"
          type="tel"
          name="addressMobile"
          value={formData.addressMobile}
          onChange={handleChange}
          placeholder="For delivery contact"
        />
        {/* City Input */}
        <Input
          label="City / Area"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Nasr City"
        />
        {/* District Input */}
        <Input
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="e.g. 7th District"
        />
        {/* Street Name Input */}
        <Input
          label="Street Name"
          name="streetName"
          value={formData.streetName}
          onChange={handleChange}
        />
        {/* Building Name Input */}
        <Input
          label="Building Name / No"
          name="buildingName"
          value={formData.buildingName}
          onChange={handleChange}
        />
      </div>

      {/* Nearest Landmark Input */}
      <Input
        label="Nearest Landmark"
        name="landmark"
        value={formData.landmark}
        onChange={handleChange}
        placeholder="e.g. Near Al-Ahly Club"
      />

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-(--primary) text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>

      {/* مكون التنبيه من Material UI */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
