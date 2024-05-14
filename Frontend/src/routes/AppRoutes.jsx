import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { Error404, Home, Admin, Chat, Login } from '../pages';
import { ItemlistContainer } from '../components/ItemListContainer/ItemlistContainer';
import { ItemDetailContainer } from '../components/ItemDetailcontainer/ItemDetailContainer';
import { CheckOut } from '../pages/CheckOut';

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
        {/* ItemDetailContainer no requiere autenticación */}
        <Route path="/product/:itemId" element={<ItemDetailContainer />} />
        <Route path="/CheckOut" element={<PrivateRoute element={<CheckOut />} />} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
      </Routes>
    </>
  );
}

// PrivateRoute solo para rutas que requieren autenticación
function PrivateRoute({ element }) {
  // No se verifica el estado de inicio de sesión para ItemDetailContainer
  return element;
}

