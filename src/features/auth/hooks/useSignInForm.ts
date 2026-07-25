import { useToastStore } from "@/stores/toastStore";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useSignInForm(handleClose: () => void) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      showToast("Logged in successfully!", "success");

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      showToast("Invalid email or password.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(true);

      showToast("Logged in with Google successfully!", "success");

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: unknown) {
      console.error(err);
      if ((err as any).code === "auth/cancelled-popup-request") {
      } else {
        showToast("Failed to sign in with Google.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
    handleGoogleSignIn,
  };
}
