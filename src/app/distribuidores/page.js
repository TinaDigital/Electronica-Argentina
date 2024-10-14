import React from 'react';

const distribuidores = [
  {
    nombre: "Distribuidor A",
    direccion: "Calle Falsa 123, Ciudad A",
    telefono: "123-456-7890",
    email: "contacto@distribuidora.com",
  },
  {
    nombre: "Distribuidor B",
    direccion: "Avenida Siempre Viva 742, Ciudad B",
    telefono: "098-765-4321",
    email: "info@distribuidorab.com",
  },
  {
    nombre: "Distribuidor C",
    direccion: "Boulevard de los Sueños Rotos 456, Ciudad C",
    telefono: "456-123-7890",
    email: "ventas@distribuidorac.com",
  },
];

export default function DistribuidoresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Distribuidores Cercanos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distribuidores.map((distribuidor, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{distribuidor.nombre}</h2>
            <p className="text-gray-700 mb-1">Dirección: {distribuidor.direccion}</p>
            <p className="text-gray-700 mb-1">Teléfono: {distribuidor.telefono}</p>
            <p className="text-gray-700">Email: {distribuidor.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
