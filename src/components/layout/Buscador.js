'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Buscador({ isSearchOpen, closeSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarMas, setMostrarMas] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const fetchProductos = useCallback(async () => {
    if (searchTerm.trim().length > 0) { // Enviar consulta con un carácter o más
      try {
        setError(null);
        const search = encodeURIComponent(searchTerm.trim());
        console.log('Buscando:', search);
        
        const response = await fetch(`/api/products?search=${search}`);
        console.log('Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const productosRecibidos = await response.json();
        console.log('Productos recibidos:', productosRecibidos);
        
        setProductos(Array.isArray(productosRecibidos) ? productosRecibidos : []);
      } catch (error) {
        console.error('Error detallado:', error);
        setError('Error al buscar productos');
        setProductos([]);
      }
    } else {
      setProductos([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProductos();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchProductos]);

  const productosAMostrar = mostrarMas ? productos : productos.slice(0, 4);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="bg-white shadow-lg z-50 p-4 absolute top-16 left-0 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center max-w-5xl mx-auto">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full p-2 border-b border-gray-300 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              onClick={closeSearch}
              className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productosAMostrar.map(producto => (
              <div 
                key={producto._id} 
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => {
                  closeSearch();
                  router.push(`/catalogo/${producto.name}`);
                }}
              >
                <img src={producto.images[0]} alt={producto.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{producto.name}</h3>
                  <p className="text-gray-600">{producto.description}</p>
                </div>
              </div>
            ))}
            {productos.length > 4 && !mostrarMas && (
              <button 
                onClick={() => setMostrarMas(true)}
                className="mt-2 text-blue-500 hover:underline col-span-full"
              >
                Mostrar más
              </button>
            )}
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-center">{error}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
