import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

function Form({ onBack, cartItems }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    correo: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productos = cartItems
  .map(item => `- ${item.name} (Cantidad: ${item.quantity})`)
  .join('\n');

  const mensaje = `*¡Hola!* Mi nombre es *${formData.nombre}*.\n` +
  `Mi dirección es: _${formData.direccion}_\n` +
  `Correo: _${formData.correo}_\n` +
  `Teléfono: _${formData.telefono}_\n\n` +
  `He comprado los siguientes productos:\n${productos}\n\n` +
  `¡Gracias!`;

    const urlWhatsapp = `https://wa.me/5491150979192?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');

  };

  return (
    <div className="flex-grow overflow-y-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al carrito
        </button>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Enviar a WhatsApp
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Form;
