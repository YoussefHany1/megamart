"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";

const ForgotPasswordForm = ({ handleClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      // اختياري: العودة لشاشة الدخول بعد 3 ثواني
      setTimeout(() => onSwitchToSignIn(), 3000);
    } catch (err) {
      console.error(err);
      setError("Error sending reset email. Please check the email address.");
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4 px-2">
      <h2 className="text-center text-2xl mb-5">Reset Password</h2>
      {error && (
        <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
      )}
      {message && (
        <p className="text-green-600 text-center mb-4 text-sm">{message}</p>
      )}

      <div>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
        />
      </div>

      <div className="mt-4 px-2 space-y-2">
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-semibold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer"
        >
          Back to Sign In
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={handleClose}
          type="button"
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-200"
        >
          Close
        </button>
        <button
          type="submit"
          className="rounded bg-(--primary) px-4 py-2 text-white hover:bg-blue-700 transition duration-200"
        >
          Send Reset Link
        </button>
      </div>

      <p className="text-gray-800 text-center mt-4 text-xs">
        *Check your spam folder in your email.*
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
