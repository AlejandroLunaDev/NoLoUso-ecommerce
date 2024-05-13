import React, { useContext } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { UserContext } from '../context/UserContext'; // Importa el contexto de usuario

export function Login() {
  const { user, login, logout } = useContext(UserContext); // Obtiene los valores del contexto

  return (
    <section className='flex items-center justify-center h-dvh'>
      <LoginForm user={user} login={login} logout={logout} />
    </section>
  );
}
