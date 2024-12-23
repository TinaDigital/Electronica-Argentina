"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion"; 
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";
import Lampara from "../../../public/lampara1.png";
import Lampara2 from "../../../public/lampara2.png";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const words = [
    {
      text: "¿Conocías",
      className: "text-white font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    },
    {
      text: "Electrónica",
      className: "text-white font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    },
    {
      text: "Argentina?",
      className: "text-white font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    },
  ];

  const testimonials = [
    {
      quote: "Atención personalizada y respuesta inmediata",
      name: "Servicio al Cliente",
      title: "Tu satisfacción es nuestra prioridad",
    },
    {
      quote: "Equipo profesional altamente capacitado",
      name: "Nuestro Personal", 
      title: "Experiencia y compromiso garantizado",
    },
    {
      quote: "Productos que superan las expectativas",
      name: "Calidad Superior",
      title: "Excelencia en cada detalle",
    },
    {
      quote: "Tecnología de última generación",
      name: "Innovación",
      title: "Eficiencia y precisión en la fabricación",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="bg-gradient-to-r from-quartz-50 to-white text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Título inicial con imagen de fondo */}
        <motion.div 
          className="relative h-48 md:h-64 mb-12"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="relative z-10 flex items-center justify-center h-full bg-[#004271]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center">
              {isMobile ? (
                <TextGenerateEffect words="¿Conocías Electrónica Argentina?" textColor="text-white" />
              ) : (
                <TypewriterEffectSmooth words={words} />
              )}
            </h1>
          </div>
        </motion.div>

        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Sección de estadísticas */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 mb-12 sm:mb-20"
            variants={itemVariants}
          >
            <StatItem number={30} text="Años de experiencia" />
            <StatItem number={1994} text="Año de fundación" suffix="" />
            <StatItem number={1000} text="Clientes satisfechos" />
          </motion.div>

          {/* Sección de Misión y Visión */}
          <motion.div
            className="flex flex-col items-center mb-12 lg:flex-row lg:items-start"
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full lg:w-1/2 lg:pr-16 mb-8 lg:mb-0">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 font-sans relative inline-block"
              >
                Nuestra Misión
                <motion.div
                  className="absolute left-0 -bottom-2 h-1 bg-[#004271]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Electrónica Argentina tiene como misión satisfacer las necesidades
                de sus clientes con una amplia variedad de productos
                electro-electrónicos, priorizando la calidad de los mismos en un
                nivel Premium, de acuerdo a los estándares aceptados por las
                políticas de la empresa; brindando también servicios integrales de
                armado y diseño de circuitos de acuerdo a los requerimientos de
                los clientes. Electrónica Argentina precautelara el patrimonio de
                sus propietarios; valorando el trabajo en equipo y el bienestar de
                sus recursos humanos; con el objetivo de constituirse en la
                empresa líder del rubro electro-electrónico en el mercado
                Argentino.
              </motion.p>
            </div>
            <motion.div 
              className="w-full lg:w-1/2 lg:pl-16 flex justify-center items-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]">
                <Image
                  src={Lampara}
                  alt="Imagen de nuestra misión"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 340px"
                  className="object-contain transform rotate-45"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center mt-12 sm:mt-20 lg:flex-row-reverse lg:items-start"
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full lg:w-1/2 lg:pr-10">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 font-sans relative inline-block"
              >
                Nuestra Visión
                <motion.div
                  className="absolute left-0 -bottom-2 h-1 bg-[#004271]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Constituirse en una de las empresas líderes en rubro
                electro-electrónico, en el mercado Argentino. Compitiendo en el
                mercado internacional latinoamericano, con productos de alta
                calidad y amplia variedad, que nos permita satisfacer las
                necesidades de nuestros clientes en lo que se refiere a productos
                y circuitos electrónicos, brindándoles un servicio integral y
                personalizado.
              </motion.p>
            </div>
            <motion.div 
              className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center items-center mt-10 sm:mt-0"
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]">
                <Image
                  src={Lampara2}
                  alt="Imagen de nuestra visión"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 340px"
                  className="object-contain transform -rotate-45"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Sección de Valores y Principios */}
          <motion.div 
            className="h-[40vh] md:h-[45vh] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center overflow-hidden mb-20"
            variants={itemVariants}
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#004271]"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Nuestros Valores y Principios
            </motion.h2>
            <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
          </motion.div>

          {/* Sección de Ubicación */}
          <motion.div 
            className="w-full mb-20"
            variants={itemVariants}
            whileInView={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#004271]"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Encontranos Aqui
            </motion.h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878895468!2d-58.38375908417444!3d-34.60373446500755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses!2sar!4v1635959481548!5m2!1ses!2sar"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h3 
                className="text-xl font-semibold text-[#004271] mb-2"
                whileHover={{ scale: 1.1 }}
              >
                Electrónica Argentina
              </motion.h3>
              <motion.p className="text-lg text-gray-600">Av. Corrientes 1234</motion.p>
              <motion.p className="text-lg text-gray-600">Ciudad Autónoma de Buenos Aires</motion.p>
              <motion.p className="text-lg text-gray-600">Argentina</motion.p>
              <motion.p 
                className="text-lg text-[#004271] font-semibold mt-4"
                whileHover={{ scale: 1.1 }}
              >
                Tel: (011) 4567-8900
              </motion.p>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatItem({ number, text, suffix = "+" }) {
  return (
    <motion.div
      className="text-center mb-8 lg:mb-20"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-[#004271] font-mono"
        whileHover={{ scale: 1.1 }}
      >
        <CountUp end={number} duration={2.5} suffix={suffix} />
      </motion.h3>
      <motion.p 
        className="text-lg sm:text-xl md:text-2xl font-bold text-[#004271] font-mono"
        whileHover={{ scale: 1.1 }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
