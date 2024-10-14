import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "../../../../models/User";
import NextAuth from "next-auth";
import authOptions from "../../../../libs/authOptions";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ email });

          if (!user) {
            console.error("Usuario no encontrado");
            throw new Error("Usuario no encontrado");
          }

          const passwordOk = bcrypt.compareSync(password, user.password);
          if (passwordOk) {
            return { email: user.email, nombre: user.nombre, admin: user.admin };
          } else {
            console.error("Contraseña incorrecta");
            throw new Error("Contraseña incorrecta");
          }
        } catch (error) {
          console.error("Error al autenticar:", error);
          throw new Error(error.message || "Error al autenticar");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.nombre = user.nombre; // Guarda el nombre en el token
        token.admin = user.admin; // Guarda el estado de admin en el token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.nombre) {
        session.user.nombre = token.nombre; // Incluye el nombre en la sesión
      }
      if (token?.admin !== undefined) {
        session.user.admin = token.admin; // Incluye el estado de admin en la sesión
      }
      return session;
    },
  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }