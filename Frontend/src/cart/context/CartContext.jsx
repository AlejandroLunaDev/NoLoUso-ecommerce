// CartContext.js
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
  
      // Obtener los datos del carrito
      let cartData = await cartsService.getCart();
      // Si el carrito no existe o está vacío, crearlo
      if (!cartData || !cartData.products) {
        console.log('Cart not found, creating a new cart.'); // Log de depuración
        await cartsService.createCart();
        // Volver a obtener los datos del carrito después de crear uno nuevo
        cartData = await cartsService.getCart();
        console.log('New cart data:', cartData); // Log de depuración
      }
  
      // Asegurarse de que el carrito existe antes de agregar el producto
      if (cartData && cartData.products) {
        // Agregar el producto al carrito
        await cartsService.addProductToCart(productId, quantity);
  
        // Obtener el carrito actualizado después de agregar el producto
        cartData = await cartsService.getCart();
        console.log('Updated cart data:', cartData); // Log de depuración
  
        // Actualizar el estado del carrito y los totales
        setCart(cartData.products || []);
        updateTotals(cartData.products || []);
      } else {
        console.error('Cart was not created properly.');
      }
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

  const addQuantity = async (productId, quantity) => {
    try {
      await cartsService.addProductToCart(productId, quantity);
      const cartData = await cartsService.getCart();
      setCart(cartData.products || []);
      updateTotals(cartData.products || []);
    } catch (error) {
      console.error('Error al aumentar la cantidad del producto:', error);
    }
  };

  const removeQuantity = async (productId, quantity) => {
    try {
      const product = cart.find((item) => item.product._id === productId);
      if (product.quantity > 1) {
        await cartsService.updateProductQuantity(productId, product.quantity - quantity);
      } else {
        await cartsService.removeProductFromCart(productId);
      }
      const cartData = await cartsService.getCart();
      setCart(cartData.products || []);
      updateTotals(cartData.products || []);
    } catch (error) {
      console.error('Error al reducir la cantidad del producto:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await cartsService.removeProductFromCart(productId);
      const cartData = await cartsService.getCart();
      setCart(cartData.products || []);
      updateTotals(cartData.products || []);
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
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
        addQuantity,
        removeQuantity,
        removeItem,
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
