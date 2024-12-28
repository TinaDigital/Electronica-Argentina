'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import Link from 'next/link'
import Image from 'next/image'
import banner01mobile from "../../public/BANNERS WEB_banner promo-celu.jpg"
import banner02mobile from "../../public/BANNERS WEB_banner 02-mobile.jpg"
import banner03mobile from "../../public/BANNERS WEB_banner 03-mobile.jpg"
import banner01desktop from "../../public/BANNERS WEB_banner promo-desktop.jpg"
import banner02desktop from "../../public/BANNERS WEB_banner 02-desktop.jpg"
import banner03desktop from "../../public/BANNERS WEB_banner 03-desktop.jpg"
import banner01laptop from "../../public/BANNERS WEB_banner promo-tablet.jpg"
import banner02laptop from "../../public/BANNERS WEB_banner 02-laptop.jpg"
import banner03laptop from "../../public/BANNERS WEB_banner 03-laptop.jpg"
import variador from "../../public/variador.png"
import fuente from "../../public/fuente.png"
import control from "../../public/control.png"
import prueba from "../../public/BANNERS WEB_banner-1x1 a.jpg"
import anillo from "../../public/anillo.png"


const bannerItems = [
  {
    mobile: banner01mobile,
    tablet: banner01laptop,
    desktop: banner01desktop,
    title: "Variador de Voltaje",
  },
  {
    mobile: banner02mobile,
    tablet: banner02laptop,
    desktop: banner02desktop,
    title: "Detector de Movimiento",
  },
  {
    mobile: banner03mobile,
    tablet: banner03laptop,
    desktop: banner03desktop,
    title: "Cargador Modular USB A+ C CR",
  }
]

const productos = [
  {
    image: variador,
    title: "FotoControl",
    subtitle: "Detector de movimiento",
  },
  {
    image: fuente,
    title: "Cargador Modular USB A+ C CR", 
    subtitle: "Cargador modular con 1000W",
  },
  {
    image: control,
    title: "Variador",
    subtitle: "Variador de voltaje",
  }
]

const servicios = [
  { 
    title: 'Garantía',
    description: 'Todos nuestros productos cuentan con garantía por defectos de fabricación.',
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
  const [windowWidth, setWindowWidth] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // Set initial width
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prevSlide) => (prevSlide - 1 + bannerItems.length) % bannerItems.length)
  }

  const getResponsiveImage = (item) => {
    if (windowWidth < 768) {
      return item.mobile
    } else if (windowWidth < 1024) {
      return item.tablet
    } else {
      return item.desktop
    }
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setDirection(1)
      nextSlide()
    }
    if (isRightSwipe) {
      setDirection(-1)
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1
    })
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
        className="w-full relative lg:aspect-[55/9] aspect-[16/9] sm:aspect-[25/9] md:aspect-[35/9] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.5 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={getResponsiveImage(bannerItems[currentSlide])}
                alt={bannerItems[currentSlide].title}
                fill
                style={{objectFit: 'cover'}}
                priority={currentSlide === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {bannerItems.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1)
                setCurrentSlide(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        {windowWidth >= 768 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors z-10"
              aria-label="Anterior slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/40 transition-colors z-10"
              aria-label="Siguiente slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </>
        )}
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
              ELECTRONICA <span className="text-gray-700 font-normal ">Argentina</span>
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
            
              <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-200 rounded-lg mb-4 overflow-hidden sm:overflow-visible">
                <Image
                  src={prueba}
                  alt="Imagen de prueba"
                  fill
                  className="object-cover rounded-lg z-10"
                />
                <Image 
                  src={anillo}
                  alt="Anillo decorativo"
                  width={150}
                  height={150}
                  className="absolute -top-10 -right-10 z-20 opacity-800 -rotate-[70deg]"
                />
                <Image
                  src={anillo}
                  alt="Anillo decorativo"
                  width={150}
                  height={150} 
                  className="absolute -bottom-10 -left-10 z-20 opacity-800 rotate-[100deg]"
                />
                <div className="absolute top-[37%] left-[10%] z-30">
                  <div className="relative overflow-hidden">
                    <button 
                      href="/catalogo" 
                      className="px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center group relative overflow-hidden text-[12px] xxsm:text-[14px] xsm:text-[17px] rounded-md"
                    >
                      <span className="relative z-10 group-hover:text-black transition-colors duration-300">Ver Catálogo</span>
                      <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></div>
                    </button>
                  </div>
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
        <div className="w-full flex justify-center">
          <div className="relative inline-block text-center">
            <motion.h2 
              initial={{ opacity: 1 }}
              className="text-2xl xsm:text-3xl font-bold text-center mb-8 text-gray-800 relative pb-2 inline-block whitespace-nowrap"
            >
              Productos Destacados
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
        className="w-full py-16 px-4 bg-gray-50 flex flex-col items-center justify-center"
      >
        <div className="w-full flex justify-center">
          <div className="relative inline-block text-center ">
            <motion.h2 
              initial={{ opacity: 1 }}
              className="text-2xl xsm:text-3xl font-bold text-center mb-8 text-gray-800 relative pb-2 inline-block whitespace-nowrap"
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
        <div className="max-w-7xl w-full flex justify-center">
          <HoverEffect items={servicios} className="mx-auto" />
        </div>
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
            ¡Contáctanos!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-900 font-bold"
          >
            ¿Tenés alguna pregunta o necesitás más información?
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-900 font-bold"
          >
            No dudes en contactarnos
          </motion.p>
          <motion.button 
            onClick={() => window.open('https://wa.me/541150979192', '_blank')}
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
