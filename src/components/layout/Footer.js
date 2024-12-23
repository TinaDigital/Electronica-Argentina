import React from 'react';
import Image from 'next/image';
import logo from '../../../public/LOGO TINA MKT-07.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 flex flex-col md:flex-row justify-around items-start">
      <div className="flex flex-col items-start mb-4 md:mb-0">
        <Image src={logo} alt="Logo Tina-Design" height={50} />
        <p className="text-[14px] mt-2">
          COPYRIGHT &copy; {new Date().getFullYear()} TINA DIGITAL
        </p>
      </div>
      <div className="flex flex-col items-start mb-4 md:mb-0">
        <h3 className="text-lg font-bold mb-2">Contacto</h3>
        <p className="text-[14px]">Email: contacto@tinadigital.com</p>
        <p className="text-[14px]">Teléfono: +54 11 1234 5678</p>
      </div>
      <div className="flex flex-col items-start mb-4 md:mb-0">
        <h3 className="text-lg font-bold mb-2">Dirección</h3>
        <p className="text-[14px]">Calle Falsa 123, Buenos Aires, Argentina</p>
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-bold mb-2">Síguenos</h3>
        <div className="flex gap-x-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[14px]">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[14px]">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[14px]">Instagram</a>
        </div>
      </div>
    </footer>
  );
};