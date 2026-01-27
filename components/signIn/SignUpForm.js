"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Alert, Snackbar } from "@mui/material";
import { TextField, CircularProgress, Button } from "@mui/material";

const SignUpForm = ({ handleClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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
      // error message
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
        {/* Email input */}
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
      {/* Password input */}
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
      {/* Confirm Password input */}
      <div>
        <TextField
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
          value={confirmPassword}
          disabled={loading}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      {/* sign up with Google */}
      <div className="pt-2">
        <Button
          type="button"
          onClick={handleGoogleSignUp}
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
            "Sign up with Google"
          )}
        </Button>
      </div>
      {/* have an account button */}
      <div className="text-gray-600 mt-4 text-center">
        Already have an account?
        <Button
          type="button"
          variant="text"
          onClick={onSwitchToSignIn}
          disabled={loading}
          sx={{
            textTransform: "none",
            color: "var(--color-primary)",
            padding: 0,
            minWidth: "auto",
            backgroundColor: "transparent",
            "&:hover": { color: "rgba(0, 142, 204, 0.7)" },
          }}
        >
          Sign in
        </Button>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
        {/* close button */}
        <Button
          type="button"
          onClick={handleClose}
          disabled={loading}
          variant="contained"
          color="error"
        >
          Close
        </Button>
        {/* sign up button */}
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          color="primary"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Sign Up"}
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

export default SignUpForm;
