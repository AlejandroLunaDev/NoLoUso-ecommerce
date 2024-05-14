import React from 'react';
import { UserProvider } from './auth/context/UserContext';
import { CartProvider } from './cart/context/CartContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </UserProvider>
  );
}
