"use client";
import { useState, useEffect } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const SignInModal = ({ show, handleClose }) => {
  const [view, setView] = useState("signin");

  // reset to sign-in view
  useEffect(() => {
    if (show) {
      setView("signin");
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-down">
        <div className="p-6">
          <h1 className="text-center font-bold text-4xl text-primary mb-8 mt-4">
            MegaMart
          </h1>

          {view === "signin" && (
            <SignInForm
              handleClose={handleClose}
              onSwitchToSignUp={() => setView("signup")}
              onSwitchToForgot={() => setView("forgot")}
            />
          )}

          {view === "signup" && (
            <SignUpForm
              handleClose={handleClose}
              onSwitchToSignIn={() => setView("signin")}
            />
          )}

          {view === "forgot" && (
            <ForgotPasswordForm
              handleClose={handleClose}
              onSwitchToSignIn={() => setView("signin")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
