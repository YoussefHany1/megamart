"use client"; // ضروري لاستخدام Hooks
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../lib/firebase"; // تأكد من صحة المسار

const SignInModal = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // للتبديل بين تسجيل الدخول وإنشاء الحساب
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        // منطق إنشاء حساب جديد
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        alert("Account created successfully!");
      } else {
        // منطق تسجيل الدخول
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
      handleClose(); // إغلاق المودال بعد النجاح
    } catch (err) {
      console.error(err);
      handleAuthError(err);
    }
  };
  // 3. دالة إرسال رابط استعادة كلمة المرور
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      // اختياري: العودة لشاشة الدخول بعد فترة قصيرة
      setTimeout(() => setIsForgotPass(false), 3000);
    } catch (err) {
      console.error(err);
      handleAuthError(err);
    }
  };

  // دالة مساعدة لمعالجة الأخطاء
  const handleAuthError = (err) => {
    if (
      err.code === "auth/invalid-credential" ||
      err.code === "auth/user-not-found"
    ) {
      setError("Invalid email or password.");
    } else if (err.code === "auth/email-already-in-use") {
      setError("Email already in use.");
    } else if (err.code === "auth/invalid-email") {
      setError("Invalid email format.");
    } else {
      setError("An error occurred. Please try again.");
    }
  };

  // إعادة ضبط الحالات عند الإغلاق
  const resetState = () => {
    setIsSignUp(false);
    setIsForgotPass(false);
    setError("");
    setMessage("");
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-down">
        <div className="p-6">
          <h1 className="text-center font-bold text-4xl text-(--primary) mb-8 mt-4">
            MegaMart
          </h1>

          {error && (
            <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
          )}
          <h2 className="text-center text-2xl mb-5">
            {isForgotPass
              ? "Reset Password"
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 px-2">
            {/* Name Input */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  required={isSignUp} // مطلوب فقط في حالة التسجيل
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
                />
              </div>
            )}
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
              />
            </div>
            {/* Password Input */}
            {!isForgotPass && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
                />
              </div>
            )}

            {/* إخفاء خيار تذكرني عند إنشاء الحساب لعدم الحاجة له */}
            <div className="mt-4 px-2 space-y-2">
              {isForgotPass ? (
                // رابط العودة لتسجيل الدخول في حالة نسيان كلمة المرور
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPass(false);
                      setError("");
                    }}
                    className="font-semibold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <>
                  {!isSignUp && (
                    <div>
                      {/* 4. زر تفعيل وضع استعادة كلمة المرور */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPass(true);
                          setError("");
                        }}
                        className="font-semibold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer"
                      >
                        Forget password?
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* زر الإرسال داخل النموذج ليعمل مع زر Enter */}
            <button
              type="submit"
              className="hidden" // مخفي ولكن موجود ليعمل الـ submit
              onClick={isForgotPass ? handleResetPassword : handleSubmit}
            ></button>
          </form>
          <div className="mt-4 px-2 space-y-2">
            {/* رابط التبديل بين الدخول والتسجيل */}
            <div className="text-gray-600">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(""); // تصفير الخطأ عند التبديل
                }}
                className="font-bold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </div>
          {isForgotPass && (
            <p className="text-gray-800 text-center mt-4">
              *Check your spam folder in your email.*
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
          <button
            onClick={handleClose}
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={isForgotPass ? handleResetPassword : handleSubmit}
            className="rounded bg-(--primary) px-4 py-2 text-white hover:bg-blue-700 transition duration-200"
          >
            {isForgotPass
              ? "Send Reset Link"
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
