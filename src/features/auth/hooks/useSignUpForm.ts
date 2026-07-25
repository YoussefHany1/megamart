import { useToastStore } from "@/stores/toastStore";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useSignUpForm(handleClose: () => void) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        email: email,
        gender: gender,
        phoneNumber: "",
        birthDate: "",
      });
      showToast("Account created successfully!", "success");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
      let errorMsg = "Failed to create an account.";
      if ((err as any).code === "auth/email-already-in-use") {
        errorMsg = "Email is already in use.";
      } else if ((err as any).code === "auth/invalid-email") {
        errorMsg = "Password should be at least 6 characters.";
      }
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(true);
      const user = result.user;
      await setDoc(
        doc(db, "users", user.uid),
        {
          displayName: user.displayName,
          email: user.email,
        },
        { merge: true },
      );

      showToast("Account created with Google successfully!", "success");

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: unknown) {
      console.error(err);
      if ((err as any).code === "auth/cancelled-popup-request") {
      } else {
        showToast("Failed to sign up with Google.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    gender,
    setGender,
    error,
    loading,
    handleSubmit,
    handleGoogleSignUp,
  };
}
