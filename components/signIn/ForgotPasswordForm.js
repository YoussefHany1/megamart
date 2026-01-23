"use client";
import { useState } from "react";
// استيراد مكونات Material UI
import { Alert, Snackbar } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";

const ForgotPasswordForm = ({ handleClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setToast({
        open: true,
        message: "Please enter your email address.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);

      // إظهار رسالة النجاح
      setToast({
        open: true,
        message: "Password reset email sent! Check your inbox.",
        severity: "success",
      });

      // العودة لشاشة الدخول بعد 3 ثواني ليتمكن المستخدم من قراءة الرسالة
      setTimeout(() => onSwitchToSignIn(), 3000);
    } catch (err) {
      console.error(err);
      // إظهار رسالة الخطأ
      setToast({
        open: true,
        message: "Error sending reset email. Please check the email address.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4 px-2">
      <h2 className="text-center text-2xl mb-5">Reset Password</h2>

      {/* تم إزالة رسائل الخطأ والنجاح النصية القديمة من هنا */}

      <div>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50 disabled:opacity-50"
        />
      </div>

      <div className="mt-4 px-2 space-y-2">
        <button
          type="button"
          onClick={onSwitchToSignIn}
          disabled={loading}
          className="font-semibold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer disabled:opacity-50"
        >
          Back to Sign In
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={handleClose}
          type="button"
          disabled={loading}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-200 disabled:opacity-50"
        >
          Close
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-(--primary) px-4 py-2 text-white hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>

      <p className="text-gray-800 text-center mt-4 text-xs">
        *Check your spam folder in your email.*
      </p>

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
};

export default ForgotPasswordForm;
