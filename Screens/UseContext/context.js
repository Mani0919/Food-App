import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, count: item.count + 1 }
            : item
        );
      }
      return [...prevCart, { productId, count: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  const increaseCount = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.productId === productId
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const addToWishlist = (productId) => {
    setWishlist((prevWishlist) => [...prevWishlist, { productId }]);
  };

  const removeFromWishlist = (productId) => {
    console.log("Removing from wishlist:", productId);
    setWishlist(
      (prevWishlist) =>
        prevWishlist.filter((item) => item.productId !== productId) 
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        increaseCount,
        decreaseCount,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
