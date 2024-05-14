import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import RegisterForm from './RegisterForm'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router'; 

const LoginForm = () => {
  const { login } = useContext(UserContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const data = await login(credentials);
      navigate('/');
   
    } catch (error) {
      setError('Usuario o contraseña incorrectos'); 
    }
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
      {showRegister ? (
        <RegisterForm onClose={() => setShowRegister(false)} />
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className=" text-sm font-medium text-gray-700 flex justify-between">
                Contraseña:
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} className="cursor-pointer text-gray-500" />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} className="cursor-pointer text-gray-500" />
                )}
              </label>
              <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Iniciar Sesión</button>
            <p className="text-center mt-4">¿No tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={handleRegister}>Regístrate aquí</span></p>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
