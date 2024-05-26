import React from 'react';

import { CartProvider } from './cart/context/CartContext';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './auth/context/AuthProvider';
import { CategoryProvider } from './product/context/categoryProvider';

export function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>

  );
}
