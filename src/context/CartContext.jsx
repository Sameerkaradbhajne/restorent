import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === itemId);
            if (existing.quantity === 1) {
                return prev.filter((i) => i.id !== itemId);
            }
            return prev.map((i) =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            );
        });
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const cartCount = useMemo(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    const getItemQuantity = (itemId) => {
        const item = cartItems.find((i) => i.id === itemId);
        return item ? item.quantity : 0;
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                cartTotal,
                cartCount,
                getItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
