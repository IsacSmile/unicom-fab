import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('unicom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('unicom_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Add Item to Wholesale Order
  const addToCart = (product, colour, size, initialQuantity) => {
    const moq = product.minOrderQuantity || 30;
    const step = product.quantityStep || 5;
    const qty = Math.max(moq, initialQuantity || moq);

    if (qty > product.stockQuantity) {
      addToast(`Requested quantity (${qty} PCS) exceeds available batch stock (${product.stockQuantity} PCS)`, 'error');
      return false;
    }

    setCartItems((prev) => {
      // Find existing item with exact product + colour + size variant match
      const existingIndex = prev.findIndex(
        (i) => i.productId === product.id && i.colour === colour && i.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + qty;
        if (newQty > product.stockQuantity) {
          addToast(`Cannot add. Total requested (${newQty} PCS) exceeds available stock (${product.stockQuantity} PCS)`, 'error');
          return prev;
        }
        updated[existingIndex].quantity = newQty;
        return updated;
      }

      return [
        ...prev,
        {
          cartItemId: `${product.id}_${colour}_${size}`,
          productId: product.id,
          name: product.name,
          category: product.category,
          batchNumber: product.batchNumber,
          wholesalePrice: product.wholesalePrice,
          colour,
          size,
          quantity: qty,
          minOrderQuantity: moq,
          quantityStep: step,
          stockQuantity: product.stockQuantity,
          image: product.images && product.images[0] ? product.images[0] : ''
        }
      ];
    });

    addToast(`Added ${qty} PCS of ${product.name} (${colour} / ${size}) to your Wholesale Order`, 'success');
    return true;
  };

  // Update Item Quantity with step rules
  const updateQuantity = (cartItemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId !== cartItemId) return item;

        const moq = item.minOrderQuantity || 30;
        const step = item.quantityStep || 5;

        let validatedQty = Math.max(moq, newQuantity);
        if (validatedQty > item.stockQuantity) {
          addToast(`Maximum stock limit reached (${item.stockQuantity} PCS)`, 'error');
          validatedQty = item.stockQuantity;
        }

        return { ...item, quantity: validatedQty };
      })
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    addToast('Item removed from wholesale order', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('unicom_cart');
  };

  const totalItemsCount = cartItems.length;
  const totalQuantityCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWholesaleAmount = cartItems.reduce((acc, item) => acc + item.wholesalePrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalQuantityCount,
        totalWholesaleAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
