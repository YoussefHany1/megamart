"use client";
import { useSignUpForm } from "../hooks/useSignUpForm";
import {
  TextField,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";

const SignUpForm = ({ handleClose, onSwitchToSignIn }) => {
  const {
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
    loading,
    handleSubmit,
    handleGoogleSignUp,
  } = useSignUpForm(handleClose);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2">
      <h2 className="text-center text-2xl mb-5">Sign Up</h2>
      {/* Name Input */}
      <div>
        <TextField
          type="text"
          label="Full Name"
          placeholder="Youssef Hany"
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={name}
          disabled={loading}
          variant="outlined"
          required
          fullWidth
        />
      </div>
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
      {/* Gender Input */}
      <div>
        <FormControl fullWidth required variant="outlined">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
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
    </form>
  );
};

export default SignUpForm;
