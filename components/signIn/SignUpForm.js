"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";

const SignUpForm = ({ handleClose, onSwitchToSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      alert("Account created successfully!");
      handleClose();
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else {
        setError("An error occurred during sign up.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2">
      <h2 className="text-center text-2xl mb-5">Create Account</h2>
      {error && (
        <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
      )}

      <div>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={handleClose}
          type="button"
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-200"
        >
          Close
        </button>
        <button
          type="submit"
          className="rounded bg-(--primary) px-4 py-2 text-white hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </div>

      <div className="text-gray-600 mt-4 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-bold text-(--primary) hover:text-blue-800 hover:underline bg-transparent border-0 cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
