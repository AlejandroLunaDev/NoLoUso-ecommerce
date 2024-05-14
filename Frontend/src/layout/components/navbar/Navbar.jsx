import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Alert, BoxIcon, Chat, Nolouso } from '@/common/components';
import { routes } from '@/routes/routes';
import { InputSearch } from '../navbar/InputSearch';
import { CartWidget } from '@/cart/components/CartWidget';
import { NavCategorias } from '../navbar/NavCategorias';
import { UserLogin } from '@/auth/components/UserLogin'; 


export function Navbar() {
  const handleLogoClick = () => {
    document.querySelector('.border-gray-500').value = '';
  };

  return (
    <>
      <header className="w-full border-b-[1px] border-[#61005D]">
        <nav className="flex items-center justify-between p-2 px-6 gap-1 md:gap-10 ">
          <section className="flex items-center gap-0 md:gap-3">
            <section className="flex items-center gap-0 md:gap-3">
              <Link to={routes.home} onClick={handleLogoClick}>
                <Nolouso />
              </Link>
              <InputSearch />
              <NavCategorias />
            </section>
            <section className="hidden md:flex">
              <ul className="flex gap-4">
                <li>
                  <NavLink to={routes.error} className="flex gap-2">
                    <BoxIcon />
                    Mis Anuncios
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chat" className="flex gap-2">
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
            <UserLogin /> 
          </section>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
