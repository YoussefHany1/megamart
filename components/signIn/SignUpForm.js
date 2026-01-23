"use client";
import { useState } from "react";
// إضافة GoogleAuthProvider و signInWithPopup
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Alert, Snackbar } from "@mui/material";

const SignUpForm = ({ handleClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // toast state for error and success messages (Snackbar)
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'warning' | 'info'
  });
  // close toast handler
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  // form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setToast({
        open: true,
        message: "Passwords do not match.",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setToast({
        open: true,
        message: "Account created successfully!",
        severity: "success",
      });
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      let errorMsg = "Failed to create an account.";
      if (err.code === "auth/email-already-in-use") {
        errorMsg = "Email is already in use.";
      } else if (err.code === "auth/weak-password") {
        errorMsg = "Password should be at least 6 characters.";
      }
      // show error message
      setToast({ open: true, message: errorMsg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // google sign up handler
  const handleGoogleSignUp = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      setToast({
        open: true,
        message: "Account created with Google successfully!",
        severity: "success",
      });

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/cancelled-popup-request") {
      } else {
        setToast({
          open: true,
          message: "Failed to sign up with Google.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2">
      <h2 className="text-center text-2xl mb-5">Sign Up</h2>
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
      <div>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50 disabled:opacity-50"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50 disabled:opacity-50"
        />
      </div>

      {/* زر التسجيل بجوجل */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Sign up with Google
            </>
          )}
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>

      <div className="text-gray-600 mt-4 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          disabled={loading}
          className="font-bold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer disabled:opacity-50"
        >
          Sign in
        </button>
      </div>
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

export default SignUpForm;
