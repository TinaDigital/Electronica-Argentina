'use client'

import { useState, useEffect } from 'react'
import { Menu, X, User, ChevronRight, ShoppingCart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'; 
import Image from 'next/image'
import logo from "../../../public/Logo-electronica-argentina.jpg"
import Cart from './Cart'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'; // Asegúrate de que la ruta sea correcta

const navLinks = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/promociones', label: 'Promociones' },
  { href: '/novedades', label: 'Novedades' },
  { href: '/distribuidores', label: 'Distribuidores' },
]

const sideNavVariants = {
  hidden: { opacity: 0, x: '-100%' },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isAdminRoute = () => {
    return pathname.startsWith('/panel-admin');
  };

  const { data: session, status } = useSession();
  const userName = session?.user?.nombre?.split(' ')[0] || session?.user?.email?.split('@')[0];
  const [isOpen, setIsOpen] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, addToCart } = useContext(CartContext); // Usa el contexto
  
  useEffect(() => {
    setAdmin(session?.user?.admin || false);
  }, [session])

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  if (isAdminRoute()) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-[#0100a0]">
              <Image src={logo} alt="Logo Electronica Argentina" height={50} width={150} />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 px-3 py-1 rounded-md text-sm font-medium relative group"
                >
                  {label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#42A3FF] scale-x-0 transition-transform duration-200 group-hover:scale-x-100 origin-center"></span>
                </Link>
              ))}
              {admin && (
                <Link
                  href="/panel-admin"
                  className="text-gray-600 px-3 py-1 rounded-md text-sm font-medium relative group"
                >
                  Admin
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#CC42FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-center"></span>
                </Link>
              )}
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              {status === 'authenticated' ? (
                <>
                  <p className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Hola, {userName}
                  </p>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-[#0100a0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duración-300 ml-2"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/account"
                  className="text-gray-600 hover:text-white hover:bg-[#42A3FF] px-3 py-2 rounded-md text-sm font-medium transition-colors duración-300 flex items-center"
                >
                  Cuenta
                  <User className="ml-2" size={20} />
                </Link>
              )}
            </div>
            <div className="ml-4 relative">
              <button
                onClick={toggleCart}
                className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300"
              >
                <ShoppingCart size={24} />
              </button>
              <Cart isOpen={isCartOpen} onClose={toggleCart} />
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleCart}
              className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300 mr-2"
            >
              <ShoppingCart size={24} />
            </button>
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#0100a0] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0100a0]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white shadow-lg z-50 overflow-y-auto"
            variants={sideNavVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <div className="flex flex-col border-t border-gray-200">
              <div className="flex flex-col p-4 space-y-2">
                {status === 'authenticated' ? (
                  <div className="mb-4">
                    <div className="flex flex-col bg-gray-100 rounded-md p-4">
                      <p className="text-gray-600 text-base font-medium mb-2">
                        Hola, {userName}
                      </p>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setIsOpen(false);
                        }}
                        className="bg-[#0100a0] text-white py-2 px-4 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 w-full"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/account"
                    className="text-gray-600 hover:bg-gray-100 hover:text-[#0100a0] py-3 px-4 rounded-md text-base font-medium transition-colors duration-300 flex items-center justify-between border border-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <User size={20} />
                      Cuenta
                    </div>
                    <ChevronRight size={20} />
                  </Link>
                )}
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-gray-600 hover:bg-gray-100 hover:text-[#0100a0] py-3 px-4 rounded-md text-base font-medium transition-colors duration-300 flex items-center justify-between"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                    <ChevronRight size={20} />
                  </Link>
                ))}
                {admin && (
                  <Link
                    href="/panel-admin"
                    className="text-gray-600 hover:bg-violet-100 hover:text-violet-600 py-3 px-4 rounded-md text-base font-medium transition-colors duration-300 flex items-center justify-between"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                    <ChevronRight size={20} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </nav>
  )
}

export default Header
