'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Search, ChevronDown, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import banner01 from "../../../public/BANNERS WEB-15.jpg"
import banner02 from "../../../public/BANNERS WEB-19.jpg"
import banner03 from "../../../public/BANNERS WEB-20.jpg"

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const ProductSkeleton = () => (
  <div className="bg-white overflow-hidden">
    <div className="relative h-[160px] sm:h-64 lg:h-[300px] bg-gray-200 animate-pulse"></div>
    <div className="mt-2">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
);

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(26);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveBanner = () => {
    if (windowWidth < 768) {
      return banner03; // Mobile
    } else if (windowWidth < 1024) {
      return banner02; // Tablet  
    } else {
      return banner01; // Desktop
    }
  };

  const fetchProductsAndCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);
      const [productsData, categoriesData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json()
      ]);
      setProducts(productsData);
      const orderedCategories = categoriesData.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(orderedCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  useEffect(() => {
    const categoryParams = searchParams.get('categories');
    if (categoryParams) {
      setSelectedCategories(categoryParams.split(','));
    }
  }, [searchParams]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleProducts(prev => prev + 12);
      setLoadingMore(false);
    }, 800);
  };

  const filteredProducts = products.filter(product =>
    product.images.length > 0 &&
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
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Categoría desconocida';
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];

      const newSearchParams = new URLSearchParams(searchParams);
      if (updated.length > 0) {
        newSearchParams.set('categories', updated.join(','));
      } else {
        newSearchParams.delete('categories');
      }
      router.push(`?${newSearchParams.toString()}`, { scroll: false });

      return updated;
    });
  };

  const handleProductClick = (name) => {
    router.push(`/catalogo/${name}`);
  };

  return (
    <main className="min-h-screen  to-blue-100">
      {/* Banner Image */}
      <div className="w-full relative lg:aspect-[55/9] aspect-[16/9] sm:aspect-[25/9] md:aspect-[35/9] overflow-hidden">
        <Image
          src={getResponsiveBanner()}
          alt="Catálogo Banner"
          fill
          priority
          sizes="100vw"
          className='object-cover'
          quality={100}
        />
      </div>

      <div className="container mx-auto px-4 py-3">
        {/* Barra de búsqueda, filtros y ordenamiento */}
        <div className="mb-4 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between mb-2 md:mb-0 md:w-full">
            <div className="relative w-full md:w-64 mr-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pr-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="relative ml-2 md:ml-auto">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 flex items-center"
              >
                Ordenar <ChevronDown className="inline-block ml-1 w-4 h-4" />
              </button>
              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => { setSortOrder('asc'); setShowSortOptions(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">A-Z</button>
                    <button onClick={() => { setSortOrder('desc'); setShowSortOptions(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Z-A</button>
                    <button onClick={() => { setSortOrder('newest'); setShowSortOptions(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Más nuevos</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center justify-between mt-2 md:mt-0">
            <button
              className="mr-2 px-3 py-1 bg-gray-900 text-white rounded-md text-sm flex items-center"
              onClick={() => setShowMobileCategories(!showMobileCategories)}
            >
              <Filter className="inline-block mr-1 w-4 h-4" /> Filtros
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row">
          {/* Categorías móviles */}
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
                  <h2 className="font-bold text-lg mb-2">Categorías</h2>
                  <div className="flex flex-wrap">
                    {categories.map(category => (
                      <label key={category._id} className="flex items-center mr-4 mb-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categorías de escritorio */}
          <aside className="hidden md:block w-1/4 pr-4">
            <div className="sticky top-4">
              <h2 className="font-bold text-xl mb-4">Categorías</h2>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:px-2">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                : currentProducts.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product.name)}
                      className="bg-white overflow-hidden cursor-pointer"
                    >
                      <div className="relative h-[160px] sm:h-64 lg:h-[300px] bg-gray-100 flex items-center justify-center group">
                        {product.images.length > 1 && (
                          <>
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="group-hover:hidden object-contain"
                            />
                            <Image
                              src={product.images[1]}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="hidden group-hover:block object-contain"
                            />
                          </>
                        )}
                        {product.images.length === 1 && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                          />
                        )}
                      </div>
                      <div>
                        <h2 className="mb-3 sm:mb-0 text-sm sm:text-xl font-semibold text-gray-800">
                          {truncateText(product.name, 30)}
                        </h2>
                        <p className="hidden md:block text-xs sm:text-sm text-gray-600">
                          {truncateText(product.description, 100)}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
            
            {/* Botón Ver Más */}
            {currentProducts.length < sortedProducts.length && (
              <div className="w-full flex justify-center p-8">
                {loadingMore ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                ) : (
                  <div className="relative overflow-hidden">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-2 bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center group relative overflow-hidden hover:border-blue-900 hover:border-2"
                    >
                      <span className="relative z-10 group-hover:text-blue-900 transition-colors duration-300">Ver Más</span>
                      <div className="absolute inset-0 bg-white transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
