"use client";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { TextField, CircularProgress, Button } from "@mui/material";

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

  // Snackbar
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
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
        {/* email input */}
        <TextField
          type="email"
          label="Email Address"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          disabled={loading}
          variant="outlined"
          required
          fullWidth
        />
      </div>
      {/* password input */}
      <div>
        <TextField
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          disabled={loading}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      <div className="mt-4 px-2 space-y-2">
        <Button
          type="button"
          onClick={onSwitchToForgot}
          disabled={loading}
          variant="text"
          sx={{
            textTransform: "none",
            color: "var(--color-primary)",
            padding: 0,
            backgroundColor: "transparent",
            minWidth: "auto",
            "&:hover": { color: "rgba(0, 142, 204, 0.7)" },
          }}
        >
          Forget password?
        </Button>
      </div>

      {/* google sign-in */}
      <div className="pt-2">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          fullWidth
          variant="outlined"
          size="large"
          startIcon={
            loading ? null : (
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
            )
          }
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Sign in with Google"
          )}
        </Button>
      </div>
      {/* sign up button */}
      <div className="text-gray-600 mt-4 text-center">
        Don't have an account?{" "}
        <Button
          type="button"
          onClick={onSwitchToSignUp}
          disabled={loading}
          variant="text"
          sx={{
            textTransform: "none",
            color: "var(--color-primary)",
            padding: 0,
            backgroundColor: "transparent",
            minWidth: "auto",
            "&:hover": { color: "rgba(0, 142, 204, 0.7)" },
          }}
        >
          Sign up
        </Button>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        {/* close button */}
        <Button
          onClick={handleClose}
          type="button"
          disabled={loading}
          variant="contained"
          color="error"
        >
          Close
        </Button>
        {/* sign in button */}
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          color="primary"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Sign In"}
        </Button>
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
