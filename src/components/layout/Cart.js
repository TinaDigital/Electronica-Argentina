'use client'

import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import Form from './Form'

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeItem, updateQuantity } = useContext(CartContext)
  const [showForm, setShowForm] = useState(false);

  const handleContinuePurchase = () => {
    setShowForm(true);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative h-full w-[88%] max-w-[400px] bg-white shadow-lg flex flex-col"
          >
            <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tu Carrito</h2>
                <button 
                  onClick={onClose} 
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X size={24} />
                </button>
              </div>
              {!showForm && (
                <p className="mt-2 text-gray-300">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</p>
              )}
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              {!showForm ? (
                cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ShoppingCart size={64} className="mb-4" />
                    <p className="text-xl font-medium">Tu carrito está vacío</p>
                    <p className="mt-2 text-sm text-center">¡Agrega algunos productos y vuelve aquí!</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center mb-6 bg-gray-50 rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="flex-grow p-4">
                          <h3 className="font-medium text-gray-800 text-sm sm:text-base">{item.name}</h3>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-gray-600 hover:text-gray-800 transition-colors p-1"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 font-medium text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-gray-600 hover:text-gray-800 transition-colors p-1"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Eliminar artículo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )
              ) : (
                <Form onBack={() => setShowForm(false)} cartItems={cartItems} />
              )}
            </div>
            {!showForm && cartItems.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <button 
                  onClick={handleContinuePurchase}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-gradient-to-bl hover:from-slate-900 hover:to-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Continuar Compra
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}