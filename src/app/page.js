'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LampContainer } from '@/components/ui/lamp'
import { motion } from 'framer-motion'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import Image from 'next/image'
import variador from "../../public/variadores_familia.jpg"

const bannerItems = [
  {
    title: "Fotocontroles Premium",
    subtitle: "Control automático de iluminación",
    image: variador,
  },
  {
    title: "Cargadores Inteligentes", 
    subtitle: "Soluciones de carga rápida USB",
    image: variador,
  },
  {
    title: "Transformadores de Alta Eficiencia",
    subtitle: "Tecnología de conversión de energía", 
    image: variador,
  },
  {
    title: "Variadores de Velocidad",
    subtitle: "Control preciso de motores",
    image: variador,
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + bannerItems.length) % bannerItems.length)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Banner más compacto */}
      <div className="w-full relative h-[25vh] md:h-[40vh] overflow-hidden">
        {bannerItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 0.95
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{objectFit: 'cover'}}
                priority={index === 0}
              />
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors"
          aria-label="Anterior slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Sección de Productos Destacados */}
      <section className="w-full py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Productos Destacados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:px-2 max-w-7xl mx-auto">
          {bannerItems.map((product) => (
            <div
              key={product.title}
              className="bg-white overflow-hidden cursor-pointer"
            >
              <div className="relative h-[160px] sm:h-64 lg:h-[300px] bg-gray-100 flex items-center justify-center group">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="mb-3 sm:mb-0 text-sm sm:text-xl font-semibold text-gray-800">
                  {product.title}
                </h2>
                <p className="hidden md:block text-xs sm:text-sm text-gray-600">
                  {product.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Título de la empresa con animación mejorada */}
      <LampContainer className="w-full py-12 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          ELECTRONICA ARGENTINA
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-center text-gray-600"
        >
          Innovación y calidad en productos electrónicos
        </motion.p>
      </LampContainer>

      {/* Sección de Servicios con diseño mejorado */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { 
              title: 'Diseño de circuitos',
              description: 'Creamos circuitos personalizados adaptados a tus necesidades específicas.'
            },
            {
              title: 'Armado de productos',
              description: 'Ensamblamos productos electrónicos con precisión y calidad.'
            },
            {
              title: 'Asesoría técnica',
              description: 'Ofrecemos orientación experta para tus proyectos electrónicos.'
            },
            {
              title: 'Soporte post-venta',
              description: 'Brindamos asistencia continua después de tu compra.'
            }
          ].map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sección de Contacto con diseño mejorado */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Contáctanos</h2>
          <TextGenerateEffect words="¿Tienes alguna pregunta o necesitas más información? No dudes en contactarnos." className="text-xl mb-8 text-gray-600" />
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg transition-all duration-300 transform hover:scale-105 rounded-md shadow-lg hover:shadow-xl">
            Enviar mensaje
          </button>
        </div>
      </section>
    </main>
  )
}
