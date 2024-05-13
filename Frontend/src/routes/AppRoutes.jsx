import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Error404, Home, Admin, Chat, Login } from "../pages";
import { ItemlistContainer } from "../components/ItemListContainer/ItemlistContainer";
import { ItemDetailContainer } from "../components/ItemDetailcontainer/ItemDetailContainer";
import { CheckOut } from "../pages/CheckOut";

export function AppRoutes() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<MainLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>

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
        <Route path="/product/:itemId" element={<PrivateRoute element={<ItemDetailContainer />} />} />
        <Route path="/CheckOut" element={<PrivateRoute element={<CheckOut />} />} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
      </Routes>
    </>
  );
}

function PrivateRoute({ element }) {
  const { user } = React.useContext(UserContext);
  console.log("user", user);

  return user ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
