import React from 'react';
import Image from 'next/image';
import logo from '../../../public/LOGO TINA MKT-07.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center sm:items-start">
          <Image 
            src={logo} 
            alt="Logo Tina-Design" 
            height={50}
            className="mb-4" 
          />
          <p className="text-sm text-center sm:text-left">
            COPYRIGHT &copy; {new Date().getFullYear()} TINA DIGITAL
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-bold mb-4">Contacto</h3>
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-sm">Email: contacto@tinadigital.com</p>
            <p className="text-sm">Teléfono: +54 11 1234 5678</p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-bold mb-4">Dirección</h3>
          <p className="text-sm text-center sm:text-left">
            Calle Falsa 123, Buenos Aires, Argentina
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-bold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Facebook
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};