import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('Middleware ejecutándose, sesión:', session);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Protege solo rutas específicas
export const config = {
  matcher: ['/dashboard/inicio', '/dashboard/usuarios', '/dashboard/usuariosDB'],
};