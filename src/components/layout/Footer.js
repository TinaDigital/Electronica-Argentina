import React from 'react';
import Image from 'next/image';
import logo from '../../../public/LOGO-TINA.png'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-2 flex flex-col md:flex-row justify-center items-center">
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <p className="text-[12px] mr-2 mb-2 md:mb-0">
          COPYRIGHT &copy; {new Date().getFullYear()} TINA DIGITAL
        </p>
        <div className='flex gap-x-3 justify-center items-center'>
          <p className='text-[12px]'>
            Diseño y Programación: 
          </p>
          <Image src={logo} alt="Logo Tina-Design" height={35} />
        </div>
      </div>
    </footer>
  );
};