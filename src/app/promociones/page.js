import Image from "next/image";
import Link from "next/link";

const promociones = [
  {
    title: "Descuento en Microcontroladores",
    description: "Aprovecha un 20% de descuento en todos los microcontroladores.",
    image: "/path/to/microcontroladores.jpg",
    link: "/catalogo/microcontroladores",
  },
  {
    title: "Ofertas en Sensores",
    description: "Compra 2 sensores y obtén el tercero gratis.",
    image: "/path/to/sensores.jpg",
    link: "/catalogo/sensores",
  },
  {
    title: "Conectores a Precios Reducidos",
    description: "Hasta un 30% de descuento en conectores seleccionados.",
    image: "/path/to/conectores.jpg",
    link: "/catalogo/conectores",
  },
];

const Promociones = () => (
  <div className="bg-gray-100 py-24">
    <div className="container mx-auto px-6">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
        Promociones Exclusivas
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {promociones.map((promo, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <Image
              src={promo.image}
              alt={promo.title}
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{promo.title}</h3>
            <p className="text-gray-600 mb-4">{promo.description}</p>
            <Link
              href={promo.link}
              className="inline-block w-full text-center rounded-full bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Ver Promoción
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Promociones;