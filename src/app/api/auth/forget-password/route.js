import { NextResponse } from "next/server";
import { User } from "../../../../models/User";
import mongoose from "mongoose";
import { Resend } from 'resend';
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { email } = await req.json();
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }

        // Generar un token seguro
        const token = crypto.randomBytes(32).toString('hex');

        // Guardar el token en la base de datos con una expiración
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        const resetUrl = `${process.env.NEXTAUTH_URL}/account/change-password?token=${token}`;

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Restablecimiento de contraseña",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #0056b3;">Hola ${user.nombre},</h2>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz click en el siguiente enlace para restablecer tu contraseña:</p>
                    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #0056b3; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
                    <p>Si no solicitaste este restablecimiento, por favor ignora este correo.</p>
                </div>
            `
        });
        return NextResponse.json({ message: "Correo de restablecimiento enviado" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
