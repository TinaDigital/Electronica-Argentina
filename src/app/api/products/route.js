import { Product } from "../../../models/Product";
import mongoose from "mongoose";
import { uploadImage, deleteImage, updateImage } from '../../api/cloudinary';

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Recopilación de datos desde el formulario
        const data = {
            name: formData.get('name'),
            images: formData.getAll('images'),
            description: formData.get('description'),
            category: formData.get('category'),
            details: formData.get('detail'),
        };

        // Subida de imágenes a Cloudinary (si hay imágenes)
        if (data.images && data.images.length > 0) {
            const uploadPromises = data.images.map(image => uploadImage(image));
            data.images = await Promise.all(uploadPromises);
        }

        // Crear el nuevo documento del producto en la base de datos
        const productDoc = await Product.create(data);
        return new Response(JSON.stringify(productDoc), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al crear el producto', details: error.message }), { status: 500 });
    }
}

// Obtener productos o un producto específico por ID
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); // Obtención del id desde la URL
        const name = searchParams.get('name'); // Obtención del nombre desde la URL

        // Si se proporciona un id, obtener el producto específico
        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
            }
            return new Response(JSON.stringify(product), { status: 200 });
        }

        // Si se proporciona un nombre, obtener el producto específico por nombre
        if (name) {
            const product = await Product.findOne({ name });
            if (!product) {
                return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
            }
            return new Response(JSON.stringify(product), { status: 200 });
        }

        // Si no se proporciona ni un id ni un nombre, devolver todos los productos
        const products = await Product.find();
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al obtener productos', details: error.message }), { status: 500 });
    }
}

// Actualización de producto por ID
export async function PUT(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID del producto no proporcionado' }), { status: 400 });
        }

        const formData = await req.formData();
        const existingImageUrls = formData.getAll('existingImages'); // URLs de imágenes existentes
        const newImages = formData.getAll('images'); // Archivos de imágenes nuevos

        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            details: formData.get('detail'),
            images: existingImageUrls, // Comienza con las imágenes existentes
        };

        // Subir solo las imágenes nuevas a Cloudinary
        if (newImages && newImages.length > 0) {
            try {
                const uploadPromises = newImages.map(image => uploadImage(image));
                const uploadedImageUrls = await Promise.all(uploadPromises);
                data.images = [...data.images, ...uploadedImageUrls];
            } catch (uploadError) {
                console.error('Error durante la subida de imágenes:', uploadError);
                return new Response(JSON.stringify({ error: 'Error al subir imágenes', details: uploadError.message }), { status: 500 });
            }
        }

        // Obtener las imágenes antiguas del producto
        const oldProduct = await Product.findById(id).select('images');
        const oldImages = oldProduct.images;

        // Comparar y eliminar las imágenes antiguas que no están en las nuevas URLs
        const imagesToDelete = oldImages.filter(oldImageUrl => !data.images.includes(oldImageUrl));
        if (imagesToDelete.length > 0) {
            try {
                const deletePromises = imagesToDelete.map(imageUrl => {
                    const parts = imageUrl.split('/');
                    const publicId = parts.slice(-2).join('/').split('.')[0];
                    return deleteImage(publicId);
                });
                await Promise.all(deletePromises);
            } catch (deleteError) {
                console.error('Error durante la eliminación de imágenes:', deleteError);
                return new Response(JSON.stringify({ error: 'Error al eliminar imágenes', details: deleteError.message }), { status: 500 });
            }
        }

        // Actualización del producto
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProduct) {
            return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return new Response(JSON.stringify({ error: 'Error al actualizar el producto', details: error.message }), { status: 500 });
    }
}

// Eliminación de producto por ID
export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const _id = url.searchParams.get('_id'); // Obtener el _id del producto

        // Eliminación del producto en la base de datos
        const deletedProduct = await Product.findByIdAndDelete(_id);
        if (!deletedProduct) {
            return new Response(JSON.stringify({ error: 'Producto no encontrado' }), { status: 404 });
        }
        


        // Eliminar imágenes asociadas en Cloudinary
        const deletePromises = deletedProduct.images.map(imageUrl => {
            const parts = imageUrl.split('/');
            const publicId = parts.slice(-2).join('/').split('.')[0];
            return deleteImage(publicId);
        });
        await Promise.all(deletePromises);

        return new Response(JSON.stringify({ success: 'Producto eliminado' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al eliminar el producto', details: error.message }), { status: 500 });
    }
}
