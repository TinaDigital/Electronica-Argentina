import { Instagram, Facebook } from 'lucide-react'

export const metadata = {
  title: 'Electronica Argentina - En Construcción',
  description: 'Sitio web en construcción de Electronica Argentina',
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
          Estamos trabajando en Nuestra Pagina Web
        </h1>
        <p className="text-xl text-blue-800 max-w-2xl mx-auto">
          Muy pronto tendremos lista nuestra nueva página web con un diseño renovado y mejores funcionalidades para nuestros clientes.
        </p>
        <div className="animate-bounce">
          <svg className="w-16 h-16 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div className="text-blue-800 bg-white p-6 rounded-lg shadow-lg">
          <p className="font-medium mb-4">
            Mientras tanto, podes contactarnos en:
          </p>
          <div className="space-y-3">
            <a href="mailto:Ventas@electronicargentina.com.ar" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Ventas@electronicargentina.com.ar
            </a>
            <a href="tel:+54 9 2229433411" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300">
              +54 9 2229433411
            </a>
            <a href="https://www.instagram.com/electronicasrl/" className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 bg-blue-50 p-2 rounded-lg" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} /> @electronicasrl
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063790187794" className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 bg-blue-50 p-2 rounded-lg" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
