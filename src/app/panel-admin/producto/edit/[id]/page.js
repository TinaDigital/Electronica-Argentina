'use client';

import React from "react";
import HeaderAdmin from "../../../../../components/layout/HeaderAdmin";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ArrowLeft, ChevronDown, X } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function EditarProducto({ params }) {
    const { id } = params;
    const router = useRouter();

    const [productName, setProductName] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDetail, setProductDetail] = useState('');
    const [categories, setCategories] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showDetails, setShowDetails] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    const sliderRef = React.useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        async function fetchProductAndCategories() {
            try {
                const [productResponse, categoriesResponse] = await Promise.all([
                    fetch(`/api/products?id=${id}`),
                    fetch('/api/categories')
                ]);
                
                if (!productResponse.ok || !categoriesResponse.ok) {
                    throw new Error('Error al cargar los datos');
                }

                const productData = await productResponse.json();
                const categoriesData = await categoriesResponse.json();

                setProductName(productData.name);
                setProductImages(productData.images);
                setProductDescription(productData.description);
                setProductCategory(productData.category);
                setProductDetail(productData.details);

                const sortedCategories = categoriesData.sort((a, b) => a.name.localeCompare(b.name));
                setCategories(sortedCategories);
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error al cargar los datos del producto');
            }
        }

        fetchProductAndCategories();
    }, [id]);

    async function handleProductSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('category', productCategory);
        formData.append('detail', productDetail);

        // Añadir URLs de imágenes existentes
        productImages.forEach((image) => {
            if (typeof image === 'string') {
                formData.append('existingImages', image);
            } else {
                formData.append('images', image);
            }
        });

        try {
            const response = await fetch(`/api/products?id=${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                toast.success('Producto actualizado');
                router.push('/panel-admin');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar el producto');
        }
    }

    function handleImageChange(event) {
        const files = Array.from(event.target.files);
        setProductImages(prevImages => [...prevImages, ...files]);
    }

    function removeImage(index) {
        setProductImages(prevImages => prevImages.filter((_, i) => i !== index));
        if (selectedImage >= index && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    }

    function toggleDetails(e) {
        e.preventDefault();
        setShowDetails(!showDetails);
    }

    const memoizedImages = useMemo(() => productImages.map((image, index) => (
        <div key={typeof image === 'string' ? image : URL.createObjectURL(image)} className="relative w-full h-[450px]">
            <Image
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt={`Product Image ${index + 1}`}
                layout="fill"
                objectFit="contain"
            />
        </div>
    )), [productImages]);

    const handleThumbnailClick = useCallback((index) => {
        setSelectedImage(index);
        sliderRef.current.slickGoTo(index);
    }, []);

    const memoizedThumbnails = useMemo(() => productImages.map((image, index) => (
        <div 
            key={typeof image === 'string' ? image : URL.createObjectURL(image)}
            className={`relative h-20 ${selectedImage === index ? 'border-b-2 border-black' : ''}`}
        >
            <Image
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt={`Product Image ${index + 1}`}
                layout="fill"
                objectFit="contain"
                onClick={() => handleThumbnailClick(index)}
            />
            <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
                <X size={16} />
            </button>
        </div>
    )), [productImages, selectedImage, handleThumbnailClick]);

    return (
        <main className="min-h-screen bg-gray-100">
            <HeaderAdmin />
            <div className="container mx-auto px-4 py-8 lg:mt-10">
                <button onClick={() => router.back()} className="mb-8 flex items-center text-blue-900 hover:text-blue-700">
                    <ArrowLeft size={24} className="mr-2" />
                    Volver
                </button>
                <Toaster />
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Producto</h1>
                        <form onSubmit={handleProductSubmit}>
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-1/2">
                                    <div className="relative w-full h-[450px] mb-4">
                                        {productImages.length > 1 ? (
                                            <Slider ref={sliderRef} {...settings}>
                                                {memoizedImages}
                                            </Slider>
                                        ) : productImages.length === 1 ? (
                                            <Image
                                                src={typeof productImages[0] === 'string' ? productImages[0] : URL.createObjectURL(productImages[0])}
                                                alt="Product Image"
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <p>No image uploaded</p>
                                            </div>
                                        )}
                                    </div>
                                    {productImages.length > 0 && (
                                        <div className="grid grid-cols-6 gap-2">
                                            {memoizedThumbnails}
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                </svg>
                                                <p className="text-xs text-gray-500">Añadir imagen</p>
                                            </div>
                                            <input type="file" multiple onChange={handleImageChange} className="hidden" />
                                        </label>
                                    </div>
                                </div>
                                <div className="lg:w-1/2">
                                    <h2 className="text-sm uppercase text-gray-500 mb-2">{categories.find(cat => cat._id === productCategory)?.name || 'Categoría'}</h2>
                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={ev => setProductName(ev.target.value)}
                                        placeholder="Nombre del Producto"
                                        className="text-3xl font-bold mb-4 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <textarea
                                        value={productDescription}
                                        onChange={ev => setProductDescription(ev.target.value)}
                                        placeholder="Descripción del Producto"
                                        className="text-lg mb-6 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        rows="4"
                                    />
                                    <div className="border-t py-4">
                                        <button 
                                            onClick={toggleDetails}
                                            className="flex justify-between items-center w-full text-left"
                                        >
                                            <span className="font-semibold">Características y Detalles</span>
                                            <ChevronDown className="w-5 h-5" />
                                        </button>
                                        {showDetails && (
                                            <div className="mt-4">
                                                <h3 className="text-sm font-semibold mb-2">Detalles del Producto</h3>
                                                <textarea
                                                    value={productDetail}
                                                    onChange={ev => setProductDetail(ev.target.value)}
                                                    className="text-lg w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    rows="4"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                        <select
                                            value={productCategory}
                                            onChange={ev => setProductCategory(ev.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map(category => (
                                                <option key={category._id} value={category._id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-8 flex justify-between">
                                        <button type="submit" className="w-1/2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 mr-2">
                                            Actualizar Producto
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => router.push('/panel-admin')} 
                                            className="w-1/2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duración-300 ml-2"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}