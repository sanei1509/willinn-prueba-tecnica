import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Puedes personalizar el middleware aquí si es necesario
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Página de inicio de sesión
    },
  }
);

// Configura las rutas protegidas
export const config = {
  matcher: ["/dashboard/inicio", "/dashboard/usuarios"],
};