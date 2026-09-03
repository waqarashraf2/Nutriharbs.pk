import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from './types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedPack?: 1 | 2 | 3, quantity?: number) => void;
  removeItem: (productId: string, selectedPack: 1 | 2 | 3) => void;
  updateQuantity: (productId: string, selectedPack: 1 | 2 | 3, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItemsCount: () => number;
  getRemainingForFreeShipping: () => number;
  isFreeShipping: () => boolean;
}

const FREE_SHIPPING_THRESHOLD = 2000;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product: Product, selectedPack: 1 | 2 | 3 = 1, quantity: number = 1) => {
        let discountMultiplier = 1;
        if (selectedPack === 2) discountMultiplier = 0.90; // 10% off
        if (selectedPack === 3) discountMultiplier = 0.85; // 15% off

        const unitPackPrice = Math.round(product.price * selectedPack * discountMultiplier);

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedPack === selectedPack
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isOpen: true };
          } else {
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  selectedPack,
                  packPrice: unitPackPrice,
                },
              ],
              isOpen: true,
            };
          }
        });
      },

      removeItem: (productId: string, selectedPack: 1 | 2 | 3) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedPack === selectedPack)
          ),
        }));
      },

      updateQuantity: (productId: string, selectedPack: 1 | 2 | 3, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedPack);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedPack === selectedPack
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.packPrice * item.quantity, 0);
      },

      getTotalItemsCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity * item.selectedPack, 0);
      },

      getRemainingForFreeShipping: () => {
        const subtotal = get().getSubtotal();
        const diff = FREE_SHIPPING_THRESHOLD - subtotal;
        return diff > 0 ? diff : 0;
      },

      isFreeShipping: () => {
        return get().getSubtotal() >= FREE_SHIPPING_THRESHOLD;
      },
    }),
    {
      name: 'nutriherbs-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
