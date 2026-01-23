"use client";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

const SignInForm = ({ handleClose, onSwitchToSignUp, onSwitchToForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // display success message
      setToast({
        open: true,
        message: "Logged in successfully!",
        severity: "success",
      });

      // delay before closing the form
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      // display error message
      setToast({
        open: true,
        message: "Invalid email or password.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      setToast({
        open: true,
        message: "Logged in with Google successfully!",
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
          message: "Failed to sign in with Google.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2">
      <h2 className="text-center text-2xl mb-5">Sign In</h2>
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

      <div className="mt-4 px-2 space-y-2">
        <button
          type="button"
          onClick={onSwitchToForgot}
          disabled={loading}
          className="font-semibold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer disabled:opacity-50"
        >
          Forget password?
        </button>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleGoogleSignIn}
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
              Sign in with Google
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
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </div>

      <div className="text-gray-600 mt-4 text-center">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          disabled={loading}
          className="font-bold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer disabled:opacity-50"
        >
          Sign up
        </button>
      </div>

      {/* snackbar for toast messages */}
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

export default SignInForm;
