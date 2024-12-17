'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { TracingBeam } from '@/components/ui/tracing-beam'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
}

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 }
}

export default function AboutUs() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            ELECTRONICA ARGENTINA
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            Innovación y calidad en productos electrónicos desde 1980
          </motion.p>
        </div>
      </section>
        {/* Misión y Visión */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideFromLeft}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Nuestra Misión</h2>
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <div className="w-full md:w-1/2 aspect-video relative bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="Misión de Electrónica Argentina"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="text-base sm:text-lg w-full md:w-1/2 mt-4 md:mt-0">
                  Electrónica Argentina tiene como misión satisfacer las necesidades de sus clientes con una amplia variedad de productos electro-electrónicos, priorizando la calidad de los mismos en un nivel Premium, de acuerdo a los estándares aceptados por las políticas de la empresa; brindando también servicios integrales de armado y diseño de circuitos de acuerdo a los requerimientos de los clientes. Electrónica Argentina precautelara el patrimonio de sus propietarios; valorando el trabajo en equipo y el bienestar de sus recursos humanos; con el objetivo de constituirse en la empresa líder del rubro electro-electrónico en el mercado Argentino.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideFromRight}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Nuestra Visión</h2>
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8">
                <div className="w-full md:w-1/2 aspect-video relative bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="Visión de Electrónica Argentina"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="text-base sm:text-lg w-full md:w-1/2 mt-4 md:mt-0">
                  Constituirse en una de las empresas líderes en rubro electro-electrónico, en el mercado Argentino. Compitiendo en el mercado internacional latinoamericano, con productos de alta calidad y amplia variedad, que nos permita satisfacer las necesidades de nuestros clientes en lo que se refiere a productos y circuitos electrónicos, brindándoles un servicio integral y personalizado.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Valores y Principios */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-2xl sm:text-3xl font-bold text-center mb-8"
            >
              Nuestros Valores y Principios
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromLeft}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">Clientes</h3>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
                  <li>Atención al cliente premisa integral</li>
                  <li>Seriedad en los negocios</li>
                  <li>Solución a los problemas</li>
                </ul>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromRight}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">Recursos Humanos</h3>
                <p className="text-base sm:text-lg">Recursos con valores y principios éticos</p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromLeft}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">Calidad</h3>
                <p className="text-base sm:text-lg">Fabricar calidad en todos nuestros productos</p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromRight}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">Producción</h3>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
                  <li>Automatización</li>
                  <li>Eficiencia</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Calidad y Producción */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-2xl sm:text-3xl font-bold text-center mb-8"
            >
              Calidad y Producción
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromLeft}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 aspect-video relative bg-gray-200 rounded-lg overflow-hidden"
              >
                <Image
                  src="/placeholder.svg"
                  alt="Calidad y Producción en Electrónica Argentina"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromRight}
                transition={{ duration: 0.8 }}
                className="text-base sm:text-lg w-full md:w-1/2 mt-4 md:mt-0"
              >
                En Electrónica Argentina, nos comprometemos a fabricar productos de la más alta calidad, implementando procesos de automatización avanzados y buscando constantemente mejorar nuestra eficiencia operativa.
              </motion.p>
            </div>
          </div>  
        </section>
    </main>
  )
}
