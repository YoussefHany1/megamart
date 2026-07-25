"use client";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { Alert, Snackbar, TextField, CircularProgress, Button } from "@mui/material";
const ForgotPasswordForm = ({ handleClose, onSwitchToSignIn }) => {
  const {
    email,
    setEmail,
    loading,
    handleResetPassword,
  } = useForgotPasswordForm(handleClose, onSwitchToSignIn);

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
      
    </form>
  );
};

export default ForgotPasswordForm;
