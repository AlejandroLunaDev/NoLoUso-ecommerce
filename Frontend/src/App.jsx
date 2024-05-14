import React from 'react';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
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
