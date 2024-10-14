import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Función para subir una imagen a Cloudinary
export async function uploadImage(image) {
    const buffer = Buffer.from(await image.arrayBuffer());

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: 'products',
        }, (error, result) => {
            if (error) {
                console.error('Error al subir imagen:', error);
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });

        stream.end(buffer);
    });
}

// Función para eliminar una imagen de Cloudinary
export async function deleteImage(publicId) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.error('Error al eliminar imagen:', error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// Función para actualizar una imagen en Cloudinary (si es necesario)
export async function updateImage(image, existingUrl) {
    // Aquí podrías implementar lógica para actualizar una imagen si es necesario
    // Por ejemplo, podrías eliminar la imagen existente y subir una nueva
    // O simplemente retornar la URL existente si no hay cambios
    return existingUrl || await uploadImage(image);
}