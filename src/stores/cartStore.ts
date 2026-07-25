import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart item type helper
const createCartItem = (item, quantity = 1) => ({
  ...item,
  quantity,
});

// Cart operations
const cartOperations = {
  addItem: (items: any[], newItem: any) => {
    const existingIndex = items.findIndex((i) => i.id === newItem.id);

    if (existingIndex !== -1) {
      return items.map((item: any, index: number) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    return [...items, createCartItem(newItem)];
  },

  removeItem: (items: any[], id: any) =>
    items.filter((item: any) => item.id !== id),

  increaseQty: (items: any[], id: any) =>
    items.map((item: any) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    ),

  decreaseQty: (items: any[], id: any) =>
    items
      .map((item: any) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item: any) => item.quantity > 0),
};

type CartState = {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: any) => void;
  clearCart: () => void;
  increaseQty: (id: any) => void;
  decreaseQty: (id: any) => void;
  getTotal: () => number;
  getItemCount: () => number;
};

// Store configuration
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: any) => {
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
