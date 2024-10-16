import Image from "next/image"
import Link from "next/link"
import background from '../../public/background.jpg'
import semiconductores from '../../public/semiconductor.jpg'
import conectores from '../../public/conector.jpg'
import resistencia from '../../public/resitencia.webp'
import displays from '../../public/capacitor.webp'

const features = [
  {
    title: "Amplio Inventario",
    description: "Más de 50,000 componentes en stock",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "Envío Rápido",
    description: "Entrega en 24-48 horas a todo el país",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Soporte Técnico",
    description: "Equipo de expertos a tu disposición",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
]

const categories = [
  { name: "Microcontroladores", image: semiconductores },
  { name: "Sensores", image: conectores },
  { name: "Conectores", image: resistencia },
  { name: "Displays", image: displays },
]

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 py-24 md:px-12 lg:px-24">
          <div className="grid gap-12 md:grid-cols-2 lg:items-center">
            <Image
                src={background}
                alt="Componentes electrónicos avanzados"
                fill
                className="rounded-lg shadow-2xl object-cover"
            />
            <div className="space-y-6 z-10">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Electronica Argentina
              </h1>
              <p className="text-xl md:text-2xl">
                Tu proveedor líder en componentes electrónicos de vanguardia
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/catalogo"
                  className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-blue-50 transition duration-300"
                >
                  Explorar Catálogo
                </Link>
                <Link
                  href="/contacto"
                  className="rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-400 transition duration-300"
                >
                  Contactar Ventas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            ¿Por qué elegir Electronica Argentina?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Categorías Destacadas
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <Link
                    href={`/categoria/${category.name.toLowerCase()}`}
                    className="inline-block w-full text-center rounded-full bg-white py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Ver productos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Potencia tu Negocio con TechnoComp
          </h2>
          <p className="mb-8 text-xl max-w-2xl mx-auto">
            Únete a nuestra red de distribuidores y accede a precios mayoristas, soporte prioritario y las últimas innovaciones en componentes electrónicos.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-blue-50 transition duration-300"
          >
            Convertirse en Distribuidor
          </Link>
        </div>
      </section>
    </div>
  )
}