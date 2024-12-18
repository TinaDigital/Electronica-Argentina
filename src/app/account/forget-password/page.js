'use client';
import Link from "next/link";
import {useState} from "react";
import Image from 'next/image';
import logo from '../../../../public/LOGO-ELECTRONICA ARGENTINA-02.png';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetInProgress, setResetInProgress] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setResetInProgress(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/forget-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el correo de recuperación');
      }

      setSuccess('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
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
            <Image src={logo} alt="Logo Electrónica Argentina" width={200} height={200} />
          </div>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Recupera tu contraseña</h1>
          <p className="text-center text-gray-600 mb-8">Ingresa tu correo electrónico para recibir un enlace de recuperación</p>
          
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {success && <p className="text-center text-green-500 mb-4">{success}</p>}
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
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
              {resetInProgress ? 'Enviando...' : 'Enviar'}
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
