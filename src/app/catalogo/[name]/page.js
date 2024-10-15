'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, Minus, ShoppingCart } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../../context/CartContext';
import Cart from '../../../components/layout/Cart';

const ProductDetail = ({ params }) => {
  const { name } = params;
  const router = useRouter();
  const { addToCart } = useContext(CartContext); // Usa el contexto aquí
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
  const sliderRef = useRef(null);


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
  }, [productInfo, categories]);

  const fetchRecommendedProducts = async (categoryId) => {
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
  };

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
      price: productInfo.price,
      quantity: quantity,
      image: productInfo.images[0]
    };

    addToCart(newItem);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
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
    <main className="container mx-auto px-4 lg:mt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Imágenes del producto */}
        <div className="lg:w-1/2">
          <div className="relative w-full h-[450px]">
            {productImages.length > 1 ? (
              <Slider ref={sliderRef} {...settings}>
                {productImages.map((image, index) => (
                  <div key={index} className="relative w-full h-[450px]">
                    <Image
                      src={image}
                      alt={`${productInfo.name} - Image ${index + 1}`}
                      fill
                      objectFit="contain"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <Image
                src={productImages[0] || '/placeholder-image.jpg'}
                alt={productInfo.name}
                fill
                objectFit="contain"
              />
            )}
          </div>
          {productImages.length > 0 && (
            <div className="grid grid-cols-6 gap-2">
              {productImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative h-20 cursor-pointer ${selectedImage === index ? 'border-b-2 border-black' : ''}`}
                  onClick={() => {
                    setSelectedImage(index);
                    sliderRef.current.slickGoTo(index);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${productInfo.name} - Image ${index + 1}`}
                    fill
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalles del producto */}
        <div className="lg:w-1/2">
          <h2 className="text-sm uppercase text-indigo-500 mb-2">{categoryName}</h2>
          <h1 className="text-3xl font-bold mb-4">{productInfo.name}</h1>
          <p className="text-lg mb-6">{productInfo.description}</p>

          {/* Secciones expandibles */}
          <div className="border-t pt-4 pb-2">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-semibold">Características y Detalles</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            {showDetails && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Detalles del Producto</h3>
                <p className="text-lg whitespace-pre-wrap">{productInfo.details}</p>
              </div>
            )}
          </div>

          {/* Botón de agregar al carrito y selector de cantidad */}
          <div className="flex items-center mt-4">
            {/* Selector de cantidad */}
            <div className="flex items-center mr-4">
              <button
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 mx-2"
                min={1}
                max={9999}
              />
              <button
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Botón de agregar al carrito */}
            <button 
                  onClick={() => {
                    handleAddToCart();
                    setIsCartOpen(true);
                  }} 
                  className="ml-4 flex-1 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Productos recomendados */}
      <div className="mt-9 mb-9">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Productos recomendados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.slice(0, 3).map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/catalogo/${product.name}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-indigo-500">{categoryName}</p>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
    </main>
  );
};

export default ProductDetail;