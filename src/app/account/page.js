import Image from 'next/image'
import { Send, Mail, CircleHelp } from 'lucide-react'
import Link from 'next/link'
import banner from '../../../public/banner.jpg'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={banner}
          alt="Background"
          fill
          objectFit="fill"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-6">MI CUENTA</h1>
          <div className="space-x-4 md:flex">
            <Link href="/account/login">
            <button className="flex bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors">
              INICIAR SESIÓN
            </button>
            </Link>
            <Link href="/account/register">
            <button className="flex bg-white text-gray-800 px-6 py-2 rounded border border-gray-800 hover:bg-gray-100 transition-colors">
              CREAR CUENTA
            </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Send className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h2 className="text-xl font-semibold mb-2">EMPEZAR</h2>
            <p className="text-gray-600 mb-4">
                Registre su producto y obtenga toda la información que necesita para empezar.
            </p>
            <a href="#" className="text-blue-600 hover:underline">Catalogo</a>
          </div>
          <div className="text-center">
            <CircleHelp className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h2 className="text-xl font-semibold mb-2">ASISTENCIA</h2>
            <p className="text-gray-600 mb-4">
                ¿Tiene preguntas sobre su producto? Tenemos las respuestas.
            </p>
            <a href="#" className="text-blue-600 hover:underline">Contacto</a>
          </div>
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h2 className="text-xl font-semibold mb-2">CORREO ELECTRONICO</h2>
            <p className="text-gray-600 mb-4">
                Manténgase al día con Logitech mediante una suscripción a nuestra newsletter.
            </p>
            <a href="#" className="text-blue-600 hover:underline">Foro</a>
          </div>
        </div>
      </div>
    </div>
  )
}