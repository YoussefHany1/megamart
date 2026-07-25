import { useToastStore } from "@/stores/toastStore";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useForgotPasswordForm(handleClose: () => void, onSwitchToSignIn: () => void) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToastStore();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      showToast("Please enter your email address.", "warning");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);

      showToast("Password reset email sent! Check your inbox.", "success");

      setTimeout(() => onSwitchToSignIn(), 3000);
    } catch (err) {
      console.error(err);
      showToast(
        "Error sending reset email. Please check the email address.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleResetPassword,
  };
}
