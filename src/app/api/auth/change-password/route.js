import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../../../../models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const { newPassword, confirmPassword } = body;
        const token = req.headers.get('token');

        if (newPassword !== confirmPassword) {
            return NextResponse.json({ message: "Las contraseñas no coinciden" }, { status: 400 });
        }

        if (!token) {
            return NextResponse.json({ message: "Token no proporcionado" }, { status: 400 });
        }

        await mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Verifica que el token no haya expirado
        });

        if (!user) {
            return NextResponse.json({ message: "Token inválido o expirado" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Limpia el token después de usarlo
        user.resetPasswordExpires = undefined; // Limpia la expiración del token
        await user.save();

        return NextResponse.json({ message: "Contraseña actualizada con éxito" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
