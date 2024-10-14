import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Nuevo estado para controlar si el carrito está abierto

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (newItem) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);
    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + newItem.quantity };
        }
        return item;
      });
    } else {
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para alternar el estado del carrito
  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, updateQuantity, isCartOpen, toggleCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
