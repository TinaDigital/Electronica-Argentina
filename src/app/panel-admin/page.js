'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Search, ChevronDown, Filter, Edit, Trash2, Plus, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge';
import { Inter } from 'next/font/google';
import HeaderAdmin from '../../components/layout/HeaderAdmin';
import Swal from 'sweetalert2';
import { Toaster, toast } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] });

export default function Listado() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleProducts, setVisibleProducts] = useState(20)
  const [bannerImage, setBannerImage] = useState('/default-banner.jpg')
  const router = useRouter()
  const searchParams = useSearchParams()
  const observerTarget = useRef(null);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchProductsAndCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      const [productsRes, categoriesRes, bannerRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/banner')
      ])
      const [productsData, categoriesData, bannerData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        bannerRes.json()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
      if (bannerData && bannerData.image) {
        setBannerImage(bannerData.image)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProductsAndCategories()
  }, [fetchProductsAndCategories])

  useEffect(() => {
    const categoryParams = searchParams.get('categories')
    if (categoryParams) {
      setSelectedCategories(categoryParams.split(','))
    }
  }, [searchParams])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleProducts(prevVisible => prevVisible + 20);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategories.length || selectedCategories.includes(product.category))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    if (sortOrder === 'desc') return b.name.localeCompare(a.name);
    if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const currentProducts = sortedProducts.slice(0, visibleProducts);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId)
    return category ? category.name : 'Categoría desconocida'
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
      
      const newSearchParams = new URLSearchParams(searchParams)
      if (updated.length > 0) {
        newSearchParams.set('categories', updated.join(','))
      } else {
        newSearchParams.delete('categories')
      }
      router.push(`?${newSearchParams.toString()}`, { scroll: false })
      
      return updated
    })
  }

  async function handleDeleteClick(_id) {
    const product = products.find(p => p._id === _id);
    const result = await Swal.fire({
      title: 'Confirmación de Eliminación',
      html: `<p>¿Estás seguro que deseas eliminar el producto <strong>${product.name}</strong>?</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        htmlContainer: 'swal2-html-container-custom',
        confirmButton: 'swal2-confirm-button-custom',
        cancelButton: 'swal2-cancel-button-custom'
      }
    });

    if (!result.isConfirmed) {
      return;
    }

    const response = await fetch(`/api/products?_id=${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });

    if (response.ok) {
      toast.success('Producto eliminado');
      fetchProductsAndCategories();
    } else {
      toast.error('Error eliminando el producto');
    }
  }

  const handleEditClick = (_id) => {
    router.push(`/panel-admin/producto/edit/${_id}`);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <HeaderAdmin />
      <Toaster />
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={bannerImage}
          alt="Admin Panel Banner"
          fill
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mr-4">
            Admin-Panel
          </h1>
          <button
            onClick={() => router.push('/panel-admin/banner')}
            className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <Edit size={24} />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar and Sort */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-1/4 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative flex items-center">
            <span className="mr-4 text-gray-700">{`Total de productos: ${filteredProducts.length}`}</span>
            <div>
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
            >
              Ordenar por <ChevronDown className="inline-block ml-2" />
            </button>
            {showSortOptions && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => { setSortOrder('asc'); setShowSortOptions(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">A-Z</button>
                  <button onClick={() => { setSortOrder('desc'); setShowSortOptions(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Z-A</button>
                  <button onClick={() => { setSortOrder('newest'); setShowSortOptions(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Más nuevos</button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Mobile Categories Button */}
          <div className="md:hidden mb-4">
            <button
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-md"
              onClick={() => setShowMobileCategories(!showMobileCategories)}
            >
              <Filter className="inline-block mr-2" /> Filtros
            </button>
          </div>

          {/* Mobile Categories */}
          <AnimatePresence>
            {showMobileCategories && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mb-4 bg-white shadow-md rounded-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-xl">Categorías</h2>
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded-md flex items-center"
                      onClick={() => router.push('/panel-admin/categorias')}
                    >
                      <Edit className="mr-1" /> Editar
                    </button>
                  </div>
                  <div className="flex flex-col">
                    {categories.map(category => (
                      <label key={category._id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 "
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                        />
                        <span className="ml-2 text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Categories */}
          <aside className="hidden md:block w-1/4 pr-4">
            <div className="sticky top-4">
              <div className="flex-col items-center mb-4">
                <h2 className="font-bold text-2xl">Categorías</h2>
                <button
                  className="px-2 py-1 bg-gray-900 text-white rounded-md flex items-center mt-2 hover:bg-gray-800"
                  onClick={() => router.push('/panel-admin/categorias')}
                >
                  <Edit className="mr-1" /> Editar
                </button>
              </div>
              <div className="flex flex-col">
                {categories.map(category => (
                  <label key={category._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                    <span className="ml-2 text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                onClick={() => router.push('/panel-admin/producto/nuevo')} 
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border cursor-pointer hover:bg-gray-100 transition-colors duration-300 justify-center"
              >
                <div className="flex items-center justify-center h-40 text-gray-700">
                  <Plus size={48} />
                </div>
                <div className="text-center">
                  <h2 className={twMerge("text-lg font-semibold text-gray-900", inter.className)}>Añadir Producto</h2>
                </div>
              </div>
              {currentProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border">
                  <div className="relative h-52 sm:h-64">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h2 className={twMerge("text-lg font-semibold text-gray-900 mb-2", inter.className)}>{product.name}</h2>
                    <p className={twMerge("text-sm text-gray-600 mb-4", inter.className)}>{product.description}</p>
                    <p className={twMerge("text-xs text-gray-400", inter.className)}>{getCategoryName(product.category)}</p>
                  </div>
                  <div className='w-full bg-gray-300 text-white py-2 px-4 rounded transition-colors duration-300 text-center flex justify-around'> 
                    <button onClick={() => handleEditClick(product._id)} className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <Edit size={24} />
                    </button>
                    <button type="button" onClick={() => handleDeleteClick(product._id)} className='bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-colors duration-300'>
                      <Trash2 size={24}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {visibleProducts < filteredProducts.length && (
              <div ref={observerTarget} className="h-10 mt-4"></div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}