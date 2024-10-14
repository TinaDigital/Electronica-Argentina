'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'


const navLinks = [
  { href: '/panel-admin', label: 'Menu' },
  { href: '/panel-admin/productos', label: 'Productos' },
  { href: '/panel-admin/categorias', label: 'categorias' },
]

const mobileNavVariants = {
  hidden: { opacity: 0, y: '-100%' },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const HeaderAdmin = () => {
  const { data: session, status } = useSession();
  let userName = session?.user?.nombre || session?.user?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (session?.user?.admin) {
      // Aquí puedes agregar cualquier lógica adicional que necesites
      console.log("El usuario es administrador");
    }
  }, [session]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-purple-600">
              Electronica Argentina
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 px-3 py-1 text-sm font-medium relative group"
                >
                  {label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-600 scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            variants={mobileNavVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/login"
                className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default HeaderAdmin
