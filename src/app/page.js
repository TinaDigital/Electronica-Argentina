'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import Image from 'next/image'
import banner01 from "../../public/banner01.jpg"
import banner02 from "../../public/banner02.jpg"
import banner03 from "../../public/banner03.jpg"
import variador from "../../public/variador.png"
import fuente from "../../public/fuente.png"
import control from "../../public/control.png"


const bannerItems = [
  {
    image: banner01,
    title: "Detector de Movimiento",
  },
  {
    image: banner02, 
    title: "Detector de Movimiento",
  },
  {
    image: banner03,
    title: "Cargador Modular USB A+ C CR",
  }
]

const productos = [
  {
    image: variador,
    title: "Variador de Voltaje",
    subtitle: "Variador de voltaje con 1000W",
  },
  {
    image: fuente,
    title: "Fuente de Poder", 
    subtitle: "Fuente de poder con 1000W",
  },
  {
    image: control,
    title: "Control Remoto",
    subtitle: "Control remoto con 1000W",
  }
]

const servicios = [
  { 
    title: 'Diseño de circuitos',
    description: 'Creamos circuitos personalizados adaptados a tus necesidades específicas.',
    link: '#'
  },
  {
    title: 'Armado de productos',
    description: 'Ensamblamos productos electrónicos con precisión y calidad.',
    link: '#'
  },
  {
    title: 'Asesoría técnica',
    description: 'Ofrecemos orientación experta para tus proyectos electrónicos.',
    link: '#'
  },
  {
    title: 'Soporte post-venta',
    description: 'Brindamos asistencia continua después de tu compra.',
    link: '#'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

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
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Banner más compacto */}
      <motion.div 
        variants={itemVariants}
        className="w-full relative h-[25vh] md:h-[40vh] overflow-hidden"
      >
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
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors"
          aria-label="Anterior slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </motion.div>
      {/* Sección de título y catálogo */}
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-7xl mx-auto py-12 px-4"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 lg:order-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ELECTRONICA <span className="text-sky-500">ARGENTINA</span>
            </h1>
            <HeroHighlight className="text-xl text-gray-600 mb-6">
              <Highlight>Innovación y calidad</Highlight> en productos electrónicos, liderando el mercado nacional con soluciones tecnológicas de vanguardia.
            </HeroHighlight>
          </motion.div>
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 lg:order-2"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-200 rounded-lg mb-4">
              <div className="absolute bottom-4 left-4">
                <HoverBorderGradient>Ver Catálogo</HoverBorderGradient>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Sección de Productos Destacados */}
      <motion.section 
        variants={itemVariants}
        className="w-full py-12 bg-white"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Productos Destacados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:px-2 max-w-7xl mx-auto px-4">
          {productos.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
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
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Sección de Servicios con diseño mejorado */}
      <motion.section 
        variants={itemVariants}
        className="w-full py-16 px-4 bg-gray-50"
      >
        <div className="w-full flex justify-center">
          <div className="relative inline-block text-center">
            <motion.h2 
              initial={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12 text-gray-800 relative pb-2 inline-block whitespace-nowrap"
            >
              Nuestros Servicios
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-1 bg-sky-400"
              />
            </motion.h2>
          </div>
        </div>
        <HoverEffect items={servicios} className="max-w-7xl mx-auto" /> 
      </motion.section>

      {/* Sección de Contacto con diseño mejorado */}
      <motion.section 
        variants={itemVariants}
        className="w-full py-16 px-4 bg-gradient-to-b from-gray-100 to-gray-200"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-gray-800"
          >
            Contáctanos!
          </motion.h2>
          <TextGenerateEffect words="¿Tienes alguna pregunta o necesitas más información? No dudes en contactarnos." className="text-xl mb-8 text-gray-600" />
          <motion.button 
            whileHover={{
              scale: 1.1,
              transition: {
                duration: 0.3,
                yoyo: Infinity
              }
            }}
            whileTap={{ scale: 0.9 }}
            initial={{
              background: "linear-gradient(45deg, #0ea5e9, #0284c7)",
              boxShadow: "0 0 0 0 rgba(14, 165, 233, 0.7)"
            }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(14, 165, 233, 0.7)",
                "0 0 0 20px rgba(14, 165, 233, 0)",
              ],
              background: [
                "linear-gradient(45deg, #0ea5e9, #0284c7)",
                "linear-gradient(225deg, #0ea5e9, #0284c7)", 
                "linear-gradient(405deg, #0ea5e9, #0284c7)",
                "linear-gradient(45deg, #0ea5e9, #0284c7)",
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              },
              background: {
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="relative px-8 py-3 text-white text-lg rounded-md shadow-lg overflow-hidden"
          >
            <motion.span
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <motion.span 
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
              className="relative inline-block"
            >
              Enviar mensaje
            </motion.span>
          </motion.button>
        </div>
      </motion.section>
    </motion.main>
  )
}
