import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  // 1. Cart Items with LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("paryavaran_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Wishlist Items with LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("paryavaran_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem("paryavaran_cart", JSON.stringify(cartItems));
    localStorage.setItem("paryavaran_wishlist", JSON.stringify(wishlist));
  }, [cartItems, wishlist]);

  // 🛒 Add to Cart Logic
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 🔄 Update Quantity (Checkout aur Cart ke liye zaroori)
  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  // 💰 Get Total Amount (Checkout page isi wajah se crash ho raha tha)
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return total + (price * qty);
    }, 0);
  };

  // ❤️ Wishlist Logics
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        getTotalAmount, 
        wishlist, 
        addToWishlist, 
        removeFromWishlist 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}