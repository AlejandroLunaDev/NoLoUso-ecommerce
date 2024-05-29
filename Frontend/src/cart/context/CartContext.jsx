import React, { useState, createContext, useEffect } from "react";
import cartsService from "../../service/db/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartsService.getCart();
        console.log('Fetched Cart Data:', cartData);
        setCart(cartData.products || []);
        updateTotals(cartData.products || []);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();
  }, []);

  const updateTotals = (cartItems) => {
    const descuento = 0; // Esto podría ser una variable dinámica si el descuento cambia
    const updatedTotalQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalQuantity(updatedTotalQuantity);
  
    const updatedSubtotal = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0);
    setSubtotal(updatedSubtotal);
  
    // Considerando que `descuento` es una variable externa o estática
    const totalf = updatedSubtotal - descuento; 
    setTotal(totalf);
  };

  const addItem = async (productToAdd) => {
    try {
      const { itemId: productId, quantity } = productToAdd; // Corrección aquí

      console.log('Adding product to cart:', { productId, quantity }); // Log de depuración

      let cartData = await cartsService.getCart();

      if (!cartData || !cartData.products || cartData.products.length === 0) {
        await cartsService.createCart();
        cartData = await cartsService.getCart();
      }

      await cartsService.addProductToCart(productId, quantity);

      // Fetch the updated cart after adding the product
      cartData = await cartsService.getCart();

      setCart(cartData.products || []);
      updateTotals(cartData.products || []);
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartsService.clearCart();
      setCart([]);
      setTotalQuantity(0);
      setSubtotal(0);
      setTotal(0);
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  };
  
  const isInCart = (productId) => {
    return cart.some((item) => item.product === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        totalQuantity,
        subtotal,
        total,
        clearCart,
        isInCart,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};
