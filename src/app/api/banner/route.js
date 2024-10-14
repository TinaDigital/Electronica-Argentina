import { Banner } from "../../../models/Banner";
import mongoose from "mongoose";
import { uploadImage, deleteImage } from "../cloudinary";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const banner = await Banner.findById('670b20bea0908c15a371ad4d');
        return new Response(JSON.stringify(banner), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al obtener el banner' }), { status: 500 });
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response(JSON.stringify({ error: 'Archivo no proporcionado' }), { status: 400 });
        }

        const uploadedImageUrl = await uploadImage(file);

        let banner = await Banner.findById('670b20bea0908c15a371ad4d');
        if (banner) {
            if (banner.image) {
                const parts = banner.image.split('/');
                const publicId = parts.slice(-2).join('/').split('.')[0];
                await deleteImage(publicId);
            }
            banner.image = uploadedImageUrl;
            await banner.save();
        } else {
            banner = new Banner({ _id: '670b20bea0908c15a371ad4d', image: uploadedImageUrl });
            await banner.save();
        }

        return new Response(JSON.stringify(banner), { status: 200 });

    } catch (error) {
        console.error('Error al actualizar el banner:', error);
        return new Response(JSON.stringify({ error: 'Error al actualizar el banner', details: error.message }), { status: 500 });
    }
}
