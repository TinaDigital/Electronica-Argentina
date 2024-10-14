import Image from "next/image";
import Link from "next/link";

const novedades = [
  {
    title: "Nuevo Microcontrolador",
    description: "Descubre el nuevo microcontrolador con mayor eficiencia energética.",
    image: "/path/to/microcontrolador.jpg",
    link: "/catalogo/microcontrolador"
  },
  {
    title: "Sensor Avanzado",
    description: "Presentamos el sensor más avanzado del mercado.",
    image: "/path/to/sensor.jpg",
    link: "/catalogo/sensor"
  },
  {
    title: "Conector de Alta Velocidad",
    description: "Conector diseñado para las aplicaciones más exigentes.",
    image: "/path/to/conector.jpg",
    link: "/catalogo/conector"
  },
];

export default function Novedades() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Novedades
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {novedades.map((novedad, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={novedad.image}
                alt={novedad.title}
                width={300}
                height={200}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{novedad.title}</h3>
                <p className="text-gray-600 mb-4">{novedad.description}</p>
                <Link
                  href={novedad.link}
                  className="inline-block w-full text-center rounded-full bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
