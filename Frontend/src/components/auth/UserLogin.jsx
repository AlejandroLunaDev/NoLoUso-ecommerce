import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { GrUserAdmin, GrUserExpert } from 'react-icons/gr';
import { UserContext } from '../../context/UserContext';

export const UserLogin = () => {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      // Redirigir u realizar otras acciones después del logout si es necesario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="relative">
      {user ? (
        <button
          className="flex items-center gap-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user?.role === 'admin' ? (
            <GrUserAdmin className="h-6 w-6" />
          ) : (
            <GrUserExpert className="h-6 w-6" />
          )}
          <p>{user?.first_name}</p>
        </button>
      ) : (
        <NavLink to={routes.login}>Login</NavLink>
      )}
      {user && menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          {user?.role === 'admin' && (
            <NavLink
              to={routes.admin}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Admin
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
