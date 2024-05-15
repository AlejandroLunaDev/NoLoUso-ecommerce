import React from 'react';

import { CartProvider } from './cart/context/CartContext';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './auth/context/AuthProvider';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>

  );
}
