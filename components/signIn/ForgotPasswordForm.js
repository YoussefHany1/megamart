"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Alert, Snackbar, TextField, CircularProgress } from "@mui/material";
const ForgotPasswordForm = ({ handleClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
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

      // success message
      setToast({
        open: true,
        message: "Password reset email sent! Check your inbox.",
        severity: "success",
      });

      // return to sign-in screen after 3 seconds
      setTimeout(() => onSwitchToSignIn(), 3000);
    } catch (err) {
      console.error(err);
      // error message
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
      {/* email input */}
      <div>
        <TextField
          required
          fullWidth
          label="Email Address"
          name="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          variant="outlined"
        />
      </div>

      <div className="mt-4 px-2 space-y-2">
        {/* back to sign in button */}
        <Button
          type="button"
          variant="text"
          onClick={onSwitchToSignIn}
          disabled={loading}
          sx={{
            textTransform: "none",
            color: "var(--color-primary)",
            padding: 0,
            backgroundColor: "transparent",
            "&:hover": { color: "rgba(0, 142, 204, 0.7)" },
          }}
        >
          Back to Sign In
        </Button>
      </div>
      <p className="text-gray-800 text-center mt-4 text-xs">
        *Check your spam folder in your email.*
      </p>
      <div className="flex justify-end gap-3 pt-4">
        {/* close button */}
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={handleClose}
          disabled={loading}
        >
          Close
        </Button>
        {/* send button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ backgroundColor: "var(--color-primary)" }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Send Reset Link"
          )}
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

export default ForgotPasswordForm;
