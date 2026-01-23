import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: (item) => {
        const { wishlistItems } = get();
        // looking for an element that matches both the ID and the category
        const exists = wishlistItems.find(
          (i) => i.id === item.id && i.category === item.category,
        );

        if (exists) {
          set({
            wishlistItems: wishlistItems.filter(
              (i) => !(i.id === item.id && i.category === item.category),
            ),
          });
        } else {
          set({ wishlistItems: [...wishlistItems, item] });
        }
      },

      isInWishlist: (id, category) => {
        return !!get().wishlistItems.find(
          (item) => item.id === id && item.category === category,
        );
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
