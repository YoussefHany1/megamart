import { useState } from "react";
import Input from "../account/Input";
// استيراد مكونات Material UI
import { Alert, Snackbar } from "@mui/material";

export default function BasicInfoForm({
  initialData,
  onSave,
  onResetPassword,
  loading,
}) {
  const [formData, setFormData] = useState({
    displayName: initialData.displayName || "",
    email: initialData.email || "",
    gender: initialData.gender || "",
    birthDate: initialData.birthDate || "",
    phoneNumber: initialData.phoneNumber || "",
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

  // تعديل دالة الحفظ للتعامل مع التنبيهات
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // نفترض أن onSave تعيد Promise
      await onSave(formData);

      setToast({
        open: true,
        message: "Basic info updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "Failed to update info. Please try again.",
        severity: "error",
      });
    }
  };

  // دالة جديدة للتعامل مع زر تغيير كلمة المرور وإظهار التنبيه
  const handleResetClick = async () => {
    try {
      await onResetPassword();
      setToast({
        open: true,
        message: "Password reset link sent to your email!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "Failed to send reset link.",
        severity: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
        Basic Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Input */}
        <Input
          label="Full Name"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
        />
        {/* Email Input */}
        <Input
          label="Email Address"
          name="email"
          value={formData.email}
          disabled={true}
        />
      </div>

      {/* Password Reset Block */}
      <div className="p-4 bg-blue-50 rounded-md border border-blue-100 flex flex-col sm:flex-row justify-between items-center my-4">
        <div>
          <h3 className="font-bold text-gray-700">Password</h3>
          <p className="text-sm text-gray-500">
            Do you want to change your password?
          </p>
        </div>
        <button
          type="button"
          // تم استبدال الاستدعاء المباشر بالدالة الجديدة التي تحتوي على التنبيه
          onClick={handleResetClick}
          className="mt-3 sm:mt-0 text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm transition duration-200"
        >
          Send Reset Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {/* Birth Date Input */}
        <Input
          label="Birth Date"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      {/* Phone Number Input */}
      <Input
        label="Primary Phone Number"
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-(--primary) text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Basic Info"}
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
