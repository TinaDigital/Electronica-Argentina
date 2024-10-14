'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../../../public/Logo-electronica-argentina.jpg';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetInProgress, setResetInProgress] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (!tokenParam) {
      setError('Token no proporcionado');
    } else {
      setToken(tokenParam);
    }
  }, []);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setResetInProgress(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setResetInProgress(false);
      return;
    }

    try {
      const result = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.message || 'Error al restablecer la contraseña');
      }

      setSuccess('¡Contraseña restablecida con éxito!');
      setTimeout(() => {
        router.push('/account/login');
      }, 2000); // Redirige después de 2 segundos
    } catch (error) {
      setError(error.message);
    } finally {
      setResetInProgress(false);
    }
  }

  return (
    <main className="relative min-h-screen flex md:items-center justify-center md:bg-gray-100">
        <div className="relative bg-white p-10 rounded-lg md:shadow-lg w-full max-w-lg z-10">
          <div className="flex justify-center mb-6">
            <Image src={logo} alt="Logo Electrónica Argentina" width={150} height={150} />
          </div>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Restablece tu contraseña</h1>
          <p className="text-center text-gray-600 mb-8">Ingresa tu nueva contraseña y confírmala</p>
          
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {success && <p className="text-center text-green-500 mb-4">{success}</p>}
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
                disabled={resetInProgress}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                disabled={resetInProgress}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={resetInProgress}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetInProgress ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <Link href="/account/login" className="font-medium text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
    </main>
  );
}
