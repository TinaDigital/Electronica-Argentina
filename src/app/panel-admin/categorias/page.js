'use client';

import {useEffect, useState} from "react";
import { Toaster, toast } from "react-hot-toast";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";
import { Edit, Trash2, Check, X, ArrowLeft, Search } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const router = useRouter();

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        categories.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar las categorías alfabéticamente
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName }; // Mover la creación de data fuera de la promesa
    const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        setCategoryName(''); // Limpiar el campo solo si la respuesta es correcta
        fetchCategories(); // Actualizar la lista de categorías
        toast.success('Categoria creada'); // Mostrar mensaje de éxito
    } else {
        toast.error('Error, lo siento...'); // Mostrar mensaje de error
    }
  }

  async function handleDeleteClick(_id) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Estás seguro que deseas eliminar esta categoría?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
      return;
    }

    const response = await fetch(`/api/categories`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }), // Enviar el ID en el cuerpo de la solicitud
    });

    if (response.ok) {
      toast.success('Categoria eliminada');
      fetchCategories(); // Actualizar la lista de categorías
    } else {
      toast.error('Error eliminando la categoría');
    }
  }

  async function handleEditClick(category) {
    setEditingCategoryId(category._id);
    setEditingCategoryName(category.name);
  }

  async function handleEditSubmit(_id) {
    const response = await fetch(`/api/categories`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, name: editingCategoryName }), // Enviar el ID y el nuevo nombre en el cuerpo de la solicitud
    });

    if (response.ok) {
      toast.success('Categoria actualizada');
      setEditingCategoryId(null);
      setEditingCategoryName('');
      fetchCategories(); // Actualizar la lista de categorías
    } else {
      toast.error('Error actualizando la categoría');
    }
  }

  function handleEditCancel() {
    setEditingCategoryId(null);
    setEditingCategoryName('');
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main >
      <HeaderAdmin />
      <Toaster />
      <button onClick={() => router.back()} className="text-white bg-blue-900 px-4 py-2 rounded-3xl ml-4 mt-4 hover:bg-blue-800 flex items-center text-lg">
          <ArrowLeft size={24} className="mr-2" />
          Volver
        </button>
      <section className="mt-8 max-w-xl mx-auto">
        <h1 className="text-4xl font-semibold text-blue-900">Categorias</h1>
        <form className="mt-4" onSubmit={handleCategorySubmit}>
          <div className="flex gap-2 items-end">
            <div className="flex-grow">
              <label className="block text-blue-900 text-lg">Nuevo nombre de categoría</label>
              <input type="text"
                     value={categoryName}
                     onChange={ev => setCategoryName(ev.target.value)}
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none text-lg"
              />
            </div>
            <button className="bg-blue-900 text-white px-4 py-2 rounded text-lg" type="submit">
                Crear
            </button>
          </div>
        </form>
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-blue-900 mb-3">Categorias existentes</h2>
            <div className="flex items-center">
              <Search size={24} className="mr-2 text-blue-900" />
              <input
                type="text"
                placeholder="Buscar categoría"
                value={searchTerm}
                onChange={ev => setSearchTerm(ev.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-4 px-4 border-b-2 border-gray-300 text-left text-blue-900">Nombre</th>
                  <th className="py-4 px-4 border-b-2 border-gray-300 text-left text-blue-900"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories?.length > 0 && filteredCategories.map((c, index) => (
                  <tr key={c._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="py-4 px-4 border-b border-gray-300">
                      {editingCategoryId === c._id ? (
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={ev => setEditingCategoryName(ev.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      ) : (
                        <span className="text-lg text-gray-700">{c.name}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 border-b border-gray-300 text-right">
                      <div className="flex gap-2 justify-end">
                        {editingCategoryId === c._id ? (
                          <>
                            <button type="button" onClick={() => handleEditSubmit(c._id)} className="bg-blue-900 text-white py-2 px-3 rounded">
                              <Check size={19} />
                            </button>
                            <button type="button" onClick={handleEditCancel} className="bg-blue-900 text-white py-2 px-3 rounded">
                              <X size={19} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button type="button" onClick={() => handleEditClick(c)} className="bg-blue-900 text-white py-2 px-3 rounded">
                              <Edit size={19} />
                            </button>
                            <button type="button" onClick={() => handleDeleteClick(c._id)} className="bg-red-600 text-white py-2 px-3 rounded">
                              <Trash2 size={19} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}