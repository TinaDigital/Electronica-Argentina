import {User} from "../../../../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
    const email = body.email;
    const user = await User.findOne({email});

    if (user?.email) {
      console.error("El email ya está registrado");
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), { status: 400 });
    }

    if (!pass?.length || pass.length < 5) {
      console.error('La contraseña debe tener al menos 5 caracteres');
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 5 caracteres' }), { status: 400 });
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    // Asegurarse de que los campos resetPasswordToken y resetPasswordExpires estén presentes
    body.resetPasswordToken = body.resetPasswordToken || "vacio";
    body.resetPasswordExpires = body.resetPasswordExpires || new Date(0);

    const createdUser = await User.create(body);
    return new Response(JSON.stringify(createdUser), { status: 201 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
