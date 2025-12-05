"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// 1. Define the shape of a cart item and the context
export interface CartItem {
  sku: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextType extends CartState {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

// 2. Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Define the reducer to manage cart state changes

type CartAction = 
    | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
    | { type: 'REMOVE_FROM_CART'; payload: { sku: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { sku: string; quantity: number } }
    | { type: 'SET_STATE_FROM_STORAGE'; payload: CartState }
    | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(item => item.sku === action.payload.sku);
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.sku !== action.payload.sku) };
    case 'UPDATE_QUANTITY':
        if (action.payload.quantity <= 0) {
            return { ...state, items: state.items.filter(item => item.sku !== action.payload.sku) };
        }
        return {
            ...state,
            items: state.items.map(item => 
                item.sku === action.payload.sku ? { ...item, quantity: action.payload.quantity } : item
            )
        };
    case 'CLEAR_CART':
        return { ...state, items: [] };
    case 'SET_STATE_FROM_STORAGE':
        return action.payload;
    default:
      return state;
  }
}

// 4. Create the CartProvider component
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Load cart from localStorage on initial render
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('shoppingCart');
            if (storedCart) {
                dispatch({ type: 'SET_STATE_FROM_STORAGE', payload: JSON.parse(storedCart) });
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('shoppingCart', JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [state]);

    const contextValue = {
        ...state,
        addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
        removeFromCart: (sku) => dispatch({ type: 'REMOVE_FROM_CART', payload: { sku } }),
        updateQuantity: (sku, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { sku, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        itemCount: state.items.reduce((total, item) => total + item.quantity, 0)
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

// 5. Create a custom hook for easy access to the cart
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
