import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product, amount: number) => void;
  removeItem: (id: string, amount: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem(data: Product, amount: number) {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === data.id);
        
        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += amount;
          set({ items: updatedItems });
          toast.success(`Added ${amount} more of ${data.name} to the cart.`);
        } else {
          const updatedItem = { ...data, quantity: amount };
          const updatedItems = [...currentItems, updatedItem];
          set({ items: updatedItems });
          toast.success(`${amount} ${data.name} added to the cart.`);
        }
      },
      removeItem(id: string, amount: number) {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === id);

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity -= amount;

          if (updatedItems[existingItemIndex].quantity <= 0) {
            updatedItems.splice(existingItemIndex, 1);
            toast.success(`${get().items[existingItemIndex].name} removed from the cart.`);
          } else {
            toast.success(`Removed ${amount} of ${get().items[existingItemIndex].name} from the cart.`);
          }

          set({ items: updatedItems });
        }
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
