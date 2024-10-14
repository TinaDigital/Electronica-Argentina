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
        <div className="z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 flex flex-col"
          >
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tu Carrito</h2>
                <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors">
                  <X size={24} />
                </button>
              </div>
              {!showForm && (
                <p className="mt-2 text-blue-200">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</p>
              )}
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              {!showForm ? (
                cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ShoppingCart size={64} className="mb-4" />
                    <p className="text-xl font-medium">Tu carrito está vacío</p>
                    <p className="mt-2 text-sm">¡Agrega algunos productos y vuelve aquí!</p>
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
                        className="flex items-center mb-6 bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="w-24 h-24 relative flex-shrink-0">
                          <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="flex-grow p-4">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="mx-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )
              ) : (
                <Form onBack={() => setShowForm(false)} cartItems={cartItems} />
              )}
            </div>
            {!showForm && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <button 
                  onClick={handleContinuePurchase}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
