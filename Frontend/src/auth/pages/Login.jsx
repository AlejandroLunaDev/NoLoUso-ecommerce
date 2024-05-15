import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthProvider';

export function Login() {
  const { user, login, logout } = useContext(AuthContext); 

  return (
    <section className='flex items-center justify-center h-dvh'>
      <LoginForm user={user} login={login} logout={logout} />
    </section>
  );
}
