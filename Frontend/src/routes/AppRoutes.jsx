import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../layout/components/navbar/Navbar';
import { Footer } from '../layout/components/Footer';
import { Home } from '../layout/pages/Home';
import { Login } from '../auth/pages/Login';
import { Error404 } from '../layout/pages/Error404';
import { Admin } from '../admin/pages/Admin';
import { Chat} from '../chat/pages/Chat';
import { ItemlistContainer, ItemDetailContainer } from '../product/components';

import { CheckOut } from '../checkOut/pages/CheckOut';
import ProtectedRoutes from './ProtectedRoutes';

export function AppRoutes() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categoria/:categoryId" element={<ItemlistContainer />} />
        <Route path="/search/:categoria" element={<ItemlistContainer />} />
        <Route path="/product/:itemId" element={<ItemDetailContainer />} />
        <Route path="/CheckOut" element={<ProtectedRoutes element={<CheckOut />} />} />
        <Route path="/admin" element={<ProtectedRoutes element={<Admin />} />} />
        <Route path="/chat" element={<ProtectedRoutes element={<Chat />} />} />
      </Routes>
    </>
  );
}




