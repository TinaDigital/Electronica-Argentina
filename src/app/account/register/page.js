'use client';
import Link from "next/link";
import {useState} from "react";
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../../../public/Logo-electronica-argentina.jpg';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError('');
    setUserCreated(false);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({nombre, email, password}),
      headers: {'Content-Type': 'application/json'},
    });

    setCreatingUser(false);

    if (response.ok) {
      setUserCreated(true);
    }
    else {
      const errorData = await response.json();
      setError(errorData.error || 'Error al crear el usuario');
    }
  }

  return (
    <main className="relative min-h-screen flex md:items-center justify-center md:bg-gray-100">
        <section className="relative bg-white p-10 rounded-lg md:shadow-lg w-full max-w-lg z-10">
          <header className="flex justify-center mb-6">
            <Image src={logo} alt="Logo Electrónica Argentina" width={150} height={150} />
          </header>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Registrate!</h1>
          <p className="text-center text-gray-600 mb-8">Crea tu cuenta para continuar</p>
          
          {userCreated && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              Usuario creado. Ahora puedes <Link href="/account/login" className="font-medium underline">Iniciar sesión</Link>
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(ev) => setNombre(ev.target.value)}
                disabled={creatingUser}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={creatingUser}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Cambia el tipo de input según el estado
                placeholder="Contraseña"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={creatingUser}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                {showPassword ? <Eye /> : <EyeOff />} {/* Icono de ojo */}
              </button>
            </div>
            <button
              type="submit"
              disabled={creatingUser}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creatingUser ? 'Registrando...' : 'Registrar'}
            </button>
          </form>

          <footer className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/account/login" className="font-medium text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </footer>
        </section>
    </main>
  );
}
