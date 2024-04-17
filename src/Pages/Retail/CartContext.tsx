import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  warehouse: {
    id: string;
    name: string;
    location: string;
    capacity: number;
  };
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  onBehalfOf: string | null;
  setOnBehalfOf: (retailerId: string | null) => void;
};

const initialContext: CartContextType = {
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (itemId) => {},
  onBehalfOf: null,
  setOnBehalfOf: (retailerId) => {},
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    initialContext.cartItems
  );
  const [onBehalfOf, setOnBehalfOf] = useState<string | null>(
    initialContext.onBehalfOf
  );
  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        onBehalfOf,
        setOnBehalfOf,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
