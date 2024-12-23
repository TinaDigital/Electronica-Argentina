'use client'

import { useState, useEffect } from 'react'
import { Menu, X, User, ChevronRight, ShoppingCart, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from "../../../public/LOGO-ELECTRONICA ARGENTINA-02.png"
import Cart from './Cart'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Buscador from './Buscador'

const navLinks = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
]

const sideNavVariants = {
  hidden: { opacity: 0, x: '-100%' },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = () => pathname.startsWith('/panel-admin');
  const { data: session, status } = useSession();
  const userName = session?.user?.nombre?.split(' ')[0] || session?.user?.email?.split('@')[0];
  const [isOpen, setIsOpen] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cartItems } = useContext(CartContext);
  
  useEffect(() => {
    setAdmin(session?.user?.admin || false);
  }, [session])

  const toggleNavbar = () => setIsOpen(!isOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  if (isAdminRoute()) return null;

  const allNavLinks = admin ? [
    ...navLinks,
    { href: '/panel-admin', label: 'Admin' }
  ] : navLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#0100a0] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0100a0]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Left section with navigation links */}
          <div className="hidden lg:flex items-center space-x-4">
            {allNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 px-3 py-1 rounded-md text-sm font-medium relative group"
              >
                {label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#42A3FF] scale-x-0 transition-transform duration-200 group-hover:scale-x-100 origin-center"></span>
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="text-xl font-bold text-[#0100a0]">
              <Image src={logo} alt="Logo Electronica Argentina" height={50} width={150} />
            </Link>
          </div>

          {/* Right section with user menu and cart */}
          <div className="hidden lg:flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative w-full max-w-xs">
                <button 
                  onClick={toggleSearch}
                  className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300"
                >
                  <Search size={22} />
                </button>
              </div>
              {status === 'authenticated' ? (
                <>
                  <p className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Hola, {userName}
                  </p>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-[#0100a0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300 ml-2"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/account"
                  className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300"
                >
                  <User size={22} />
                </Link>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleCart}
                className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300 relative"
              >
                <ShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search and Cart */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={toggleSearch}
              className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300"
            >
              <Search size={22} />
            </button>
            <button
              onClick={toggleCart}
              className="text-gray-600 hover:text-[#0100a0] p-2 rounded-md transition-colors duration-300 relative"
            >
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Updated Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white shadow-lg z-50 overflow-y-auto"
            variants={sideNavVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {status === 'authenticated' ? (
                <div className="rounded-md font-bold flex justify-between w-full text-black py-2 px-4 rounded-md text-base font-medium transition-colors duration-300 flex items-center justify-end bg-gray-200 w-full">
                  <div className="flex items-center gap-2">
                      <span>Hola, {userName}</span>
                  </div>
                  <Link
                    href="/account"
                    className=""
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2 border-b border-black">
                      <span>Cerrar sesión</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="rounded-md font-bold w-full">
                  <Link
                    href="/account"
                    className="text-black py-2 rounded-md text-base font-medium transition-colors duration-300 flex items-center justify-center bg-gray-200 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-center w-full">
                      <User size={20} className="text-black" />
                    </div>
                  </Link>
                </div>
              )}
              {allNavLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-black font-bold hover:bg-gray-100 py-2 px-4 rounded-md text-base font-medium transition-colors duration-300 flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="border-l border-black pl-2">{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
      <Buscador isSearchOpen={isSearchOpen} closeSearch={toggleSearch} />
    </nav>
  )
}