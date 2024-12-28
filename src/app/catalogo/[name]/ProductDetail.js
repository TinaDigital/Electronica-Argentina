'use client';

import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../../context/CartContext';
import Cart from '../../../components/layout/Cart';


const ProductSkeleton = () => (
  <div className="container mx-auto px-4 lg:mt-10">
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <div className="relative w-full h-[450px] bg-gray-200 animate-pulse"></div>
        <div className="grid grid-cols-6 gap-2 mt-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative h-20 bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-20 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
      </div>
    </div>
    <div className="mt-9 mb-9">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductDetail = ({ params }) => {
  const { name } = params;
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showCross, setShowCross] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const sliderRef = useRef(null);

  const fetchRecommendedProducts = useCallback(async (categoryId) => {
    try {
      const response = await fetch(`/api/products?category=${categoryId}&limit=3`);
      if (!response.ok) {
        throw new Error('Error al cargar productos recomendados.');
      }
      const data = await response.json();
      setRecommendedProducts(data.filter(product => product._id !== productInfo._id));
    } catch (err) {
      console.error('Error fetching recommended products:', err);
    }
  }, [productInfo]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!name) return;

      try {
        const response = await fetch(`/api/products?name=${name}`);
        if (!response.ok) {
          throw new Error('Error al cargar el producto.');
        }
        const data = await response.json();
        setProductInfo(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [name]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        categories.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(categories);
      });
    });
  }, []);

  useEffect(() => {
    if (productInfo) {
      const category = categories.find(cat => cat._id === productInfo.category);
      setCategoryName(category ? category.name : 'Categoría desconocida');
      fetchRecommendedProducts(productInfo.category);
    }
  }, [productInfo, categories, fetchRecommendedProducts]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSelectedImage(next),
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, Math.min(value, 999)));
    }
  };

  const increment = () => {
    setQuantity(prev => Math.min(prev + 1, 999));
  };

  const decrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    if (!productInfo) return;

    const newItem = {
      id: productInfo._id,
      name: productInfo.name,
      quantity: quantity,
      image: productInfo.images[0]
    };

    addToCart(newItem);
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 text-xl">{error}</p>
        <button 
          onClick={() => router.push('/')} 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Volver a la página principal
        </button>
      </div>
    );
  }

  if (!productInfo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Producto no encontrado.</p>
        <button 
          onClick={() => router.push('/')} 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Volver a la página principal
        </button>
      </div>
    );
  }

  const productImages = productInfo.images && productInfo.images.length > 0 ? productInfo.images : [];

  return (
    <>
    <main className="container mx-auto px-4 md:mt-10">
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={productImages[selectedImage]}
              alt={productInfo.name}
              fill
              style={{ objectFit: "contain" }}
              quality={100}
              priority
            />
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Imágenes del producto */}
        <div className="md:w-1/2">
          <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] rounded-lg overflow-hidden cursor-zoom-in" onClick={() => setIsZoomed(true)}>
            {productImages.length > 1 ? (
              <Slider ref={sliderRef} {...settings}>
                {productImages.map((image, index) => (
                  <div key={index} className="relative w-full h-[350px] md:h-[420px] lg:h-[500px] hover:scale-105 transition-transform duration-300">
                    <Image
                      src={image}
                      alt={`${productInfo.name} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "contain" }}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <Image
                src={productImages[0] || '/placeholder-image.jpg'}
                alt={productInfo.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "contain" }}
                className="hover:scale-105 transition-transform duration-300"
                priority
              />
            )}
          </div>
          {productImages.length > 0 && (
            <div className="grid grid-cols-6 gap-2">
              {productImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative h-20 cursor-pointer ${selectedImage === index ? 'border-b-2 border-black transition-all duration-100' : ''}`}
                  onClick={() => {
                    setSelectedImage(index);
                    sliderRef.current.slickGoTo(index);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${productInfo.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 16vw, (max-width: 1200px) 8vw, 5vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalles del producto */}
        <div className="md:w-1/2 space-y-8">
          <div>
            <h2 className="text-sm uppercase text-indigo-600 mb-3 font-semibold">{categoryName}</h2>
            <h1 className="text-4xl font-bold mb-6">{productInfo.name}</h1>
            <p className="text-xl mb-8 text-gray-700">{productInfo.description}</p>
          </div>

          {/* Características del producto */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Detalles del Producto</h3>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                {showDetails ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>
            {showDetails && (
              <div className="mt-2 bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {productInfo.details}
                </p>
              </div>
            )}
          </div>

          {/* Botón de agregar al carrito y selector de cantidad */}
          <div className="flex items-center mt-8">
            {/* Selector de cantidad */}
            <div className="flex items-center mr-6 bg-gray-100 rounded-full p-1">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center bg-transparent font-semibold text-lg focus:outline-none"
                min={1}
                max={9999}
              />
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {/* Botón de agregar al carrito */}
            <div className="relative overflow-hidden flex-1">
              <button
                onClick={() => {
                  handleAddToCart();
                  setIsCartOpen(true);
                }}
                className="w-full px-6 py-3 bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center group relative overflow-hidden hover:border-blue-900 hover:border-2"
              >
                <span className="relative z-10 group-hover:text-blue-900 transition-colors duration-300 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-3 group-hover:animate-[spin_0.5s_ease-in-out]" />
                  Agregar al carrito
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-active:scale-95"></div>
              </button>
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Productos recomendados */}
      <div className="mt-16 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">También te podría interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {recommendedProducts.length > 0 ? recommendedProducts.slice(0, 3).map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/catalogo/${product.name}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-56 bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                    className="p-4"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-indigo-600 mb-2">{categoryName}</p>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{product.description.substring(0, 100)}...</p>
                </div>
              </div>
            )) : (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-56 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
    </main>
    </>
  );
};

export default ProductDetail;