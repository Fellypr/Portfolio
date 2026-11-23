import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'auth_session_token';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body?.token;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token inválido ou não fornecido' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: false, // Permite leitura client/server integrada
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 horas
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Falha ao processar sessão' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value || null;
  return NextResponse.json({
    authenticated: Boolean(token),
    token,
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

