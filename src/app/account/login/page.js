'use client';
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useState} from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../../../public/LOGO-ELECTRONICA ARGENTINA-02.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError('');
    setSuccess('');

    try {
      const result = await signIn('credentials', {
        redirect: false, // Evita la redirección automática
        email,
        password,
      });

      if (!result.ok) {
        throw new Error(result.error || 'Error al iniciar sesión');
      }

      setSuccess('¡Bienvenido!');
      setTimeout(() => {
        router.push('/');
      }, 500); // Redirige después de 2 segundos
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginInProgress(false);
    }
  }

  return (
    <main className="relative min-h-screen flex md:items-center justify-center md:bg-gray-100">
        <div className="relative bg-white p-10 rounded-lg md:shadow-lg w-full max-w-lg z-10">
          <div className="flex justify-center mb-6">
            <Image src={logo} alt="Logo Electrónica Argentina" width={200} height={200} />
          </div>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Inicia sesión!</h1>
          <p className="text-center text-gray-600 mb-8">Inicia sesión para continuar</p>
          
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {success && <p className="text-center text-green-500 mb-4">{success}</p>}
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={loginInProgress}
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
                disabled={loginInProgress}
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
              disabled={loginInProgress}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginInProgress ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link href="/account/register" className="font-medium text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p> 
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Olvidaste tu contraseña?{' '}
            <Link href="/account/forget-password" className="font-medium text-blue-600 hover:underline">
              Recuperar contraseña
            </Link>
          </p>
        </div>
    </main>
  );
}