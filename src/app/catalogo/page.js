'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Search, ChevronDown, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Suspense } from 'react'

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [bannerImage, setBannerImage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerTarget = useRef(null);

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

  const fetchBannerImage = useCallback(async () => {
    try {
      const response = await fetch('/api/banner');
      if (!response.ok) {
        throw new Error('Error al obtener el banner');
      }
      const data = await response.json();
      if (data && data.image) {
        setBannerImage(data.image);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    fetchProductsAndCategories();
    fetchBannerImage();
  }, [fetchProductsAndCategories, fetchBannerImage]);

  useEffect(() => {
    const categoryParams = searchParams.get('categories');
    if (categoryParams) {
      setSelectedCategories(categoryParams.split(','));
    }
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleProducts(prevVisible => prevVisible + 12);
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
    <Suspense fallback={<div>Cargando...</div>}>
    <main className="min-h-screen bg-white">
      <Head>
        <title>Catálogo | Electrónica Argentina</title>
      </Head>
      {/* Banner Image */}
      <div className="relative w-full h-52 md:h-80">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="Catálogo Banner"
            fill
            objectFit="cover"
            className="brightness-75"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white shadow-lg text-center">
            Catálogo de Productos
          </h1>
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
              className="w-full p-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
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
          <div className="md:hidden mb-8">
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
                  <h2 className="font-bold text-xl mb-4">Categorías</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product.name)}
              className="bg-white overflow-hidden cursor-pointer"
            >
              <div className="relative h-64 lg:h-[400px] bg-gray-100 flex items-center justify-center group">
                
                {product.images.length > 1 && (
                  <>
                  <Image
                  src={product.images[0]}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:hidden"
                  />
                  <Image
                    src={product.images[1]}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="hidden group-hover:block"
                  />
                  </>
                )}
                {product.images.length === 1 && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600">{getCategoryName(product.category)}</p>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Infinite Scroll Observer */}
        {currentProducts.length < sortedProducts.length && (
          <div ref={observerTarget} className="h-10 mt-4"></div>
          )}

          {/* Loading indicator */}
          {isLoading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        )}
        </div>
      </div>
    </main>
    </Suspense>
  );
}