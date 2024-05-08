import { NavLink, Link, Outlet } from "react-router-dom";
import { Alert, Box, Chat, Nolouso } from "../components";
import { routes } from "../routes/routes";
import { InputSearch } from "../components/Ui/InputSearch/InputSearch";
import { CartWidget } from "../components/Ui/CartWidget/CartWidget";
import { NavCategorias } from "../components/navCategorias/NavCategorias";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { GrUserAdmin } from "react-icons/gr";

export function Navbar() {
  const { setFilterText } = useContext(CartContext);

  const handleCategoryChange = (categoria) => {
    setFilterText(categoria);
  };

  const handleLogoClick = () => {
    document.querySelector(".border-gray-500").value = "";
  };

  return (
    <>
      <header className=" w-full border-b-[1px] border-[#61005D]">
        <nav className="flex items-center justify-between p-2 px-6 gap-1 md:gap-10 ">
          <section className="flex items-center gap-0 md:gap-3">

          <section className="flex items-center gap-0 md:gap-3">
            <Link to={routes.home} onClick={handleLogoClick}>
              <Nolouso />
            </Link>
            <InputSearch />
            <NavCategorias handleCategoryChange={handleCategoryChange} />
          </section>
          <section className="hidden md:flex">
            <ul className="flex gap-4">
              <li>
                <NavLink to={routes.error} className="flex gap-2">
                  <Box />
                  Mis Anuncios
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.error} className="flex gap-2">
                  <Chat />
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.error} className="flex gap-2">
                  <Alert />
                  Notificaciones
                </NavLink>
              </li>
  </ul>
          </section>
          <CartWidget />
          </section>
          <section>
            <NavLink to={routes.admin} className="flex gap-2">
              <GrUserAdmin className="h-6 w-6" />
              Admin
            </NavLink>
          </section>
        </nav>
      </header>
      <Outlet />
    </>
  );
}



