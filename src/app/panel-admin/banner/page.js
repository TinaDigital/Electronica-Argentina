'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import HeaderAdmin from '../../../components/layout/HeaderAdmin';

export default function BannerEdit() {
  const [bannerImage, setBannerImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentBanner();
  }, []);

  const fetchCurrentBanner = async () => {
    try {
      const response = await fetch('/api/banner');
      if (response.ok) {
        const data = await response.json();
        if (data && data.image) {
          setPreviewImage(data.image);
        }
      }
    } catch (error) {
      console.error('Error al obtener el banner actual:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setBannerImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      toast.error('Por favor, selecciona un archivo de imagen válido');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImage) {
      toast.error('Por favor, selecciona una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('file', bannerImage);

    try {
      const response = await fetch('/api/banner', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast.success('Banner actualizado con éxito');
        router.push('/panel-admin');
      } else {
        toast.error('Error al actualizar el banner');
      }
    } catch (error) {
      console.error('Error al actualizar el banner:', error);
      toast.error('Error al actualizar el banner');
    }
  };

  const handleCancel = () => {
    router.push('/panel-admin');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderAdmin />
      {/* Banner Image */}
      <div className="relative w-full h-52 md:h-80">
        {previewImage && (
          <Image
            src={previewImage}
            alt="Catálogo Banner"
            fill
            objectFit="cover"
            className="brightness-75"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Catálogo de Productos
          </h1>
        </div>
      </div>
      <Toaster />
      
      <div className="max-w-4xl mx-auto mt-12 mb-8 px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Gestión del Banner
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">Banner actual:</p>
            <div className="relative w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Banner Actual"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="banner-upload" 
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Seleccionar nuevo banner:
              </label>
              <div className="relative">
                <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <div className="bg-blue-100 text-blue-800 py-2 px-4 rounded-full inline-block cursor-pointer hover:bg-blue-200 transition duration-300 mt-4">
                      Seleccionar archivo
                    </div>
                  </div>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-300 text-sm font-semibold"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-300 text-sm font-semibold"
              >
                Actualizar Banner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
