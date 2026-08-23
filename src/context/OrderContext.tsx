import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { OrderItem } from '@/lib/whatsapp';

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearBag: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalCount: number;
  totalAmount: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('bonheur_active_bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('bonheur_active_bag', JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items]);

  const addItem = (item: Omit<OrderItem, 'id'>) => {
    setItems((prev) => {
      // Find matching item by name + weightOrSize + isEggless
      const existingIdx = prev.findIndex(
        (i) =>
          i.name === item.name &&
          i.weightOrSize === item.weightOrSize &&
          Boolean(i.isEggless) === Boolean(item.isEggless)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }

      const newItem: OrderItem = {
        ...item,
        id: `${item.name}-${item.weightOrSize || 'standard'}-${item.isEggless ? 'eggless' : 'std'}-${Date.now()}`,
      };
      return [...prev, newItem];
    });

    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const clearBag = () => {
    setItems([]);
    try {
      localStorage.removeItem('bonheur_active_bag');
    } catch {
      // ignore
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceNumeric * item.quantity,
    0
  );

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        totalCount,
        totalAmount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return ctx;
}
