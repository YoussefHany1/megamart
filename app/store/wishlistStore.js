import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: (item) => {
        const { wishlistItems } = get();
        const exists = wishlistItems.find((i) => i.id === item.id);

        if (exists) {
          set({
            wishlistItems: wishlistItems.filter((i) => i.id !== item.id),
          });
        } else {
          set({ wishlistItems: [...wishlistItems, item] });
        }
      },

      isInWishlist: (id) => {
        return !!get().wishlistItems.find((item) => item.id === id);
      },
    }),
    {
      name: "wishlist-storage", // localStorage key name
    }
  )
);
