"use client";
import { useSignInForm } from "../hooks/useSignInForm";
import { TextField, CircularProgress, Button } from "@mui/material";
import Image from "next/image";

const SignInForm = ({ handleClose, onSwitchToSignUp, onSwitchToForgot }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
    handleGoogleSignIn,
  } = useSignInForm(handleClose);

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
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                width={20}
                height={20}
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
    </form>
  );
};

export default SignInForm;
