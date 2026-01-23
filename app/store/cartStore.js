import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart item type helper
const createCartItem = (item, quantity = 1) => ({
  ...item,
  quantity,
});

// Cart operations
const cartOperations = {
  addItem: (items, newItem) => {
    const existingIndex = items.findIndex((i) => i.id === newItem.id);

    if (existingIndex !== -1) {
      return items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    return [...items, createCartItem(newItem)];
  },

  removeItem: (items, id) => items.filter((item) => item.id !== id),

  increaseQty: (items, id) =>
    items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    ),

  decreaseQty: (items, id) =>
    items
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0),
};

// Store configuration
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => ({
          items: cartOperations.addItem(state.items, item),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: cartOperations.removeItem(state.items, id),
        }));
      },

      clearCart: () => set({ items: [] }),

      increaseQty: (id) => {
        set((state) => ({
          items: cartOperations.increaseQty(state.items, id),
        }));
      },

      decreaseQty: (id) => {
        set((state) => ({
          items: cartOperations.decreaseQty(state.items, id),
        }));
      },

      // Computed values
      getTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => {
          const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
          return sum + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
