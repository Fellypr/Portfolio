import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/174464Fe'];
const AUTH_ROUTES = ['/login'];
const TOKEN_COOKIE_NAME = 'auth_session_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const hasValidToken = Boolean(token && token.trim().length > 0);

  // 1. Rota protegida acessada sem token -> redireciona para login com parâmetro redirectTo
  if (isProtectedRoute && !hasValidToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', encodeURI(pathname));

    const response = NextResponse.redirect(loginUrl);
    if (token) {
      response.cookies.delete(TOKEN_COOKIE_NAME);
    }
    return response;
  }

  // 2. Rota de autenticação acessada por usuário já autenticado -> redireciona para dashboard
  if (isAuthRoute && hasValidToken) {
    const dashboardUrl = new URL('/174464Fe', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/174464Fe/:path*',
    '/login',
  ],
};

