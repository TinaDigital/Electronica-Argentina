import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

function Form({ onBack, cartItems }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!formData.direccion) newErrors.direccion = 'La dirección es requerida';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productos = cartItems
      .map(item => `- ${item.name} (Cantidad: ${item.quantity})`)
      .join('\n');

    const mensaje = `*¡Hola!* Mi nombre es *${formData.nombre}*.\n` +
      `Mi dirección es: _${formData.direccion}_\n` +
      `Teléfono: _${formData.telefono}_\n\n` +
      `Quiero comprar los siguientes productos:\n${productos}\n\n` +
      `¡Gracias!`;

    const urlWhatsapp = `https://wa.me/5491152267065?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');
  };

  return (
    <div className="flex-grow overflow-y-auto xxsm:p-3 xsm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al carrito
        </button>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.div>
            <motion.input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900`}
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </motion.div>
          <motion.div>
            <motion.input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900`}
            />
            {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
          </motion.div>
          <motion.div>
            <motion.input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900`}
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 sm:px-1 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 flex items-center justify-center text-[12px] sm:text-[15px]"
          >
            Completar compra en WhatsApp <FaWhatsapp className="ml-2" size={20} />
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Form;
