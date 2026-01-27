import { useState, useCallback } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import {
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { db, auth } from "../lib/firebase";

export const useAccountManager = (user) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // function to display messages
  const setMsg = (type, text) => {
    setMessage({ type, text });
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    // Hide the message automatically after 5 seconds (optional)
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    if (!user) return null;
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), email: user.email };
      }
      return { displayName: user.displayName, email: user.email };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }, [user]);

  // Update basic info
  const updateBasicInfo = async (formData) => {
    setLoading(true);
    try {
      const promises = [];

      if (formData.displayName !== user.displayName) {
        promises.push(
          updateProfile(user, { displayName: formData.displayName }),
        );
      }

      const userRef = doc(db, "users", user.uid);
      let formattedBirthDate = formData.birthDate;
      if (
        formattedBirthDate &&
        typeof formattedBirthDate.format === "function"
      ) {
        formattedBirthDate = formattedBirthDate.format("YYYY-MM-DD");
      } else if (formattedBirthDate instanceof Date) {
        formattedBirthDate = formattedBirthDate.toISOString().split("T")[0];
      }

      const basicInfoData = {
        gender: formData.gender || "",
        birthDate: formattedBirthDate || "",
        phoneNumber: formData.phoneNumber || "",
        displayName: formData.displayName || "",
        email: user.email,
      };

      promises.push(setDoc(userRef, basicInfoData, { merge: true }));
      await Promise.all(promises);
      setMsg("success", "Basic info saved successfully!");
    } catch (error) {
      console.error(error);
      setMsg("error", "An error occurred while updating basic info.");
    } finally {
      setLoading(false);
    }
  };

  // Update address
  const updateAddress = async (addressData) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, addressData, { merge: true });
      setMsg("success", "Address updated successfully!");
    } catch (error) {
      console.error(error);
      setMsg("error", "An error occurred while updating the address.");
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const sendResetLink = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMsg("success", `Password reset link sent to ${user.email}`);
    } catch (error) {
      console.error(error);
      setMsg(
        "error",
        "An error occurred while sending the password reset link.",
      );
    }
  };

  // Delete account
  const deleteAccount = async (router) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(userRef);
      await deleteUser(user);
      router.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.code === "auth/requires-recent-login") {
        setMsg("error", "Please log in again to delete your account.");
      } else {
        setMsg("error", "An error occurred while deleting the account.");
      }
    }
  };

  return {
    loading,
    message,
    fetchUserData,
    updateBasicInfo,
    updateAddress,
    sendResetLink,
    deleteAccount,
  };
};
