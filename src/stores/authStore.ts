import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { User } from "firebase/auth";

type AuthState = {
  user: User | null;
  loading: boolean;
  logOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  logOut: () => signOut(auth),
}));

// Initialize auth listener
if (typeof window !== "undefined") {
  onAuthStateChanged(auth, (currentUser) => {
    useAuthStore.setState({ user: currentUser, loading: false });
  });
}
