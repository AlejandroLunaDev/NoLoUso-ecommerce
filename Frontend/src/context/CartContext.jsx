import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addItem = (productToAdd) => {
    const { id, name, price, quantity, stock } = productToAdd;
    const img = productToAdd.img || "";
    if (!isInCart(productToAdd.id)) {
      setCart((prev) => [...prev, { id, name, price, quantity, img, stock }]);
    } else {
      console.error("El producto ya está agregado");
    }
  };

  const addQuantity = (productId, quantityToAdd) => {
    const productToUpdateIndex = cart.findIndex(
      (item) => item.id === productId
    );
    if (productToUpdateIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productToUpdateIndex].quantity += quantityToAdd;
      setCart(updatedCart);
      setTotalQuantity(
        (prevTotalQuantity) => prevTotalQuantity + quantityToAdd
      );
    } else {
      console.error("El producto no está en el carrito");
    }
  };

  const removeQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((prod) => prod.id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    const updatedQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalQuantity(updatedQuantity);
  }, [cart]);

  const getTotal = () => {
    let acumulador = 0;
    cart.forEach((prod) => {
      acumulador += prod.quantity * prod.price;
    });
    return acumulador;
  };

  const total = getTotal();

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        addQuantity,
        removeQuantity,
        totalQuantity,
        setTotalQuantity,
        total,
        clearCart,
        isInCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
