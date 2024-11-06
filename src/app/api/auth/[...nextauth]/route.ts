import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Verificación de que las credenciales existen
        if (!credentials) return null;

        const { email, password } = credentials;

        // Simulación de autenticación (ejemplo)
        if (email === "usuarioAdmin@gmail.com" && password === "123456") {
          return { id: "1", name: "usuario admin", email: "usuarioAdmin@gmail.com" };
        }

        // Si la autenticación falla
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };