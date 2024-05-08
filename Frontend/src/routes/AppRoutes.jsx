import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Navbar } from "@/layout/Navbar";
import { Footer } from '@/layout/Footer';
import { Error404, Home } from "../pages";
import { ItemlistContainer } from "../components/ItemListContainer/ItemlistContainer";
import { ItemDetailContainer } from '../components/ItemDetailcontainer/ItemDetailContainer';
import { CheckOut } from "../pages/CheckOut";

export function AppRoutes() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categoria/:categoryId" element={<ItemlistContainer />} />
          <Route path={"/search/:categoria"} element={<ItemlistContainer  />} />
          <Route path="/product/:itemId" element={<ItemDetailContainer />} />
          <Route path="/CheckOut" element={<CheckOut />} />
        </Route>
        <Route path={routes.error} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}


function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
